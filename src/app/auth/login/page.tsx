"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";

export default function AuthLoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [remainingAttempts, setRemainingAttempts] = useState<number | null>(null);
    const [blockedUntil, setBlockedUntil] = useState<Date | null>(null);

    // Проверяем, не залогинен ли уже
    useEffect(() => {
        const isAuthenticated = Cookies.get("admin-authenticated") === "true";
        if (isAuthenticated) {
            router.push("/admin");
        }
    }, [router]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setRemainingAttempts(null);
        setBlockedUntil(null);
        setLoading(true);

        try {
            const response = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                router.push("/admin");
                router.refresh();
            } else if (response.status === 429) {
                // Rate limit exceeded
                setError(data.message || "Слишком много попыток входа");
                if (data.blockedUntil) {
                    setBlockedUntil(new Date(data.blockedUntil));
                }
            } else {
                setError(data.error || "Неверный логин или пароль");
                if (data.remainingAttempts !== undefined) {
                    setRemainingAttempts(data.remainingAttempts);
                }
            }
        } catch (err) {
            setError("Ошибка подключения");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/30">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl text-center">Админ-панель</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium mb-2">
                                Логин
                            </label>
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium mb-2">
                                Пароль
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                                required
                            />
                        </div>
                        {error && (
                            <div className="space-y-2">
                                <p className="text-sm text-red-500">{error}</p>
                                {remainingAttempts !== null && remainingAttempts > 0 && (
                                    <p className="text-xs text-muted-foreground">
                                        Осталось попыток: {remainingAttempts}
                                    </p>
                                )}
                                {blockedUntil && (
                                    <p className="text-xs text-orange-500 font-medium">
                                        ⚠️ Попытки входа заблокированы на 30 минут
                                    </p>
                                )}
                            </div>
                        )}
                        <Button type="submit" className="w-full" disabled={loading || blockedUntil !== null}>
                            {loading ? "Вход..." : blockedUntil ? "Заблокировано" : "Войти"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}