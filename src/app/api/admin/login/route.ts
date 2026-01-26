import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { loginRateLimiter } from "@/lib/rate-limiter";
import { logLoginAttempt, getClientIp } from "@/lib/auth-logger";

export async function POST(request: Request) {
    const ip = getClientIp(request);
    const userAgent = request.headers.get("user-agent") || "unknown";

    try {
        const { username, password } = await request.json();

        // Проверка rate limit
        const rateLimitCheck = loginRateLimiter.check(ip);

        if (!rateLimitCheck.allowed) {
            await logLoginAttempt(
                username || "unknown",
                ip,
                userAgent,
                "blocked",
                `Too many attempts. Blocked until ${rateLimitCheck.blockedUntil?.toLocaleTimeString('ru-RU')}`
            );

            return NextResponse.json(
                {
                    error: "Слишком много попыток входа",
                    blockedUntil: rateLimitCheck.blockedUntil,
                    message: `Доступ заблокирован до ${rateLimitCheck.blockedUntil?.toLocaleTimeString('ru-RU', {
                        hour: '2-digit',
                        minute: '2-digit',
                    })}`,
                },
                { status: 429 }
            );
        }

        const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
        const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            // Успешный вход - сбрасываем счетчик
            loginRateLimiter.reset(ip);

            await logLoginAttempt(username, ip, userAgent, "success");

            const cookieStore = await cookies();
            cookieStore.set("admin-authenticated", "true", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 60 * 60 * 24 * 7, // 7 days
            });

            return NextResponse.json({ success: true });
        }

        // Неудачная попытка - записываем
        loginRateLimiter.recordAttempt(ip);
        const remainingCheck = loginRateLimiter.check(ip);

        await logLoginAttempt(
            username,
            ip,
            userAgent,
            "failed",
            `Invalid credentials. ${remainingCheck.remainingAttempts} attempts remaining`
        );

        return NextResponse.json(
            {
                error: "Неверный логин или пароль",
                remainingAttempts: remainingCheck.remainingAttempts,
            },
            { status: 401 }
        );
    } catch (error) {
        await logLoginAttempt(
            "unknown",
            ip,
            userAgent,
            "failed",
            `Server error: ${error}`
        );

        return NextResponse.json(
            { error: "Ошибка сервера" },
            { status: 500 }
        );
    }
}