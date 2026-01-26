import { createClient } from "@/lib/supabase/server";
import { Container } from "@/components/ui/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type LoginAttempt = {
    id: string;
    username: string;
    ip_address: string;
    user_agent: string;
    status: "success" | "failed" | "blocked";
    reason: string | null;
    attempted_at: string;
};

async function getLoginAttempts(): Promise<LoginAttempt[]> {
    try {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("admin_login_attempts")
            .select("*")
            .order("attempted_at", { ascending: false })
            .limit(100);

        if (error) {
            console.error("Error fetching login attempts:", error);
            return [];
        }

        return data || [];
    } catch (error) {
        console.error("Failed to fetch login attempts:", error);
        return [];
    }
}

export default async function SecurityPage() {
    const attempts = await getLoginAttempts();

    const stats = {
        total: attempts.length,
        success: attempts.filter((a) => a.status === "success").length,
        failed: attempts.filter((a) => a.status === "failed").length,
        blocked: attempts.filter((a) => a.status === "blocked").length,
    };

    return (
        <Container>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">Безопасность</h1>
                    <p className="text-muted-foreground mt-2">
                        Мониторинг попыток входа в административную панель
                    </p>
                </div>

                {/* Статистика */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Всего попыток
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-green-600">
                                Успешных
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">
                                {stats.success}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-red-600">
                                Неудачных
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-600">
                                {stats.failed}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-orange-600">
                                Заблокированных
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-orange-600">
                                {stats.blocked}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Таблица попыток */}
                <Card>
                    <CardHeader>
                        <CardTitle>Последние попытки входа</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {attempts.length === 0 ? (
                            <p className="text-sm text-muted-foreground text-center py-8">
                                Пока нет записей о попытках входа
                            </p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-left py-3 px-4 font-medium">
                                                Дата и время
                                            </th>
                                            <th className="text-left py-3 px-4 font-medium">
                                                Статус
                                            </th>
                                            <th className="text-left py-3 px-4 font-medium">
                                                Пользователь
                                            </th>
                                            <th className="text-left py-3 px-4 font-medium">
                                                IP адрес
                                            </th>
                                            <th className="text-left py-3 px-4 font-medium">
                                                Причина
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {attempts.map((attempt) => (
                                            <tr
                                                key={attempt.id}
                                                className="border-b hover:bg-muted/50 transition-colors"
                                            >
                                                <td className="py-3 px-4">
                                                    {new Date(
                                                        attempt.attempted_at
                                                    ).toLocaleString("ru-RU")}
                                                </td>
                                                <td className="py-3 px-4">
                                                    <Badge
                                                        variant={
                                                            attempt.status === "success"
                                                                ? "default"
                                                                : attempt.status === "blocked"
                                                                ? "destructive"
                                                                : "secondary"
                                                        }
                                                    >
                                                        {attempt.status === "success"
                                                            ? "✅ Успешно"
                                                            : attempt.status === "blocked"
                                                            ? "🚫 Заблокировано"
                                                            : "❌ Неудачно"}
                                                    </Badge>
                                                </td>
                                                <td className="py-3 px-4 font-mono text-xs">
                                                    {attempt.username}
                                                </td>
                                                <td className="py-3 px-4 font-mono text-xs">
                                                    {attempt.ip_address}
                                                </td>
                                                <td className="py-3 px-4 text-xs text-muted-foreground">
                                                    {attempt.reason || "-"}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Информация о защите */}
                <Card>
                    <CardHeader>
                        <CardTitle>Настройки защиты</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                        <div className="flex items-start gap-3">
                            <div className="text-green-600">✅</div>
                            <div>
                                <strong>Rate Limiting:</strong> Максимум 5 попыток входа
                                за 15 минут
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="text-green-600">✅</div>
                            <div>
                                <strong>Автоблокировка:</strong> IP блокируется на 30
                                минут после превышения лимита
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="text-green-600">✅</div>
                            <div>
                                <strong>Логирование:</strong> Все попытки входа
                                записываются в базу данных
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="text-green-600">✅</div>
                            <div>
                                <strong>HttpOnly Cookie:</strong> Защита от XSS атак
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="text-green-600">✅</div>
                            <div>
                                <strong>Secure Cookie:</strong> Только HTTPS в production
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </Container>
    );
}
