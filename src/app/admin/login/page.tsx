"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Mail, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Cookies from "js-cookie";

export default function AdminLoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const from = searchParams.get("from") || "/admin";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        // Простая проверка (в продакшене используйте Supabase Auth)
        const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "admin@firstuzbekistan.uz";
        const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123";

        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            // Успешный вход
            Cookies.set("admin-authenticated", "true", { expires: 7 }); // 7 дней
            router.push(from);
        } else {
            setError("Неверный email или пароль");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-ftc-red/10 via-background to-ftc-blue/10 p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="text-center mb-8">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-ftc-red mb-4">
                        <Lock className="h-8 w-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold">Админ-панель</h1>
                    <p className="text-muted-foreground mt-2">FIRST Uzbekistan CMS</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Вход в систему</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin} className="space-y-4">
                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-2">
                                    Email
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ftc-red"
                                        placeholder="admin@firstuzbekistan.uz"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium mb-2">
                                    Пароль
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                    <input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ftc-red"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Error */}
                            {error && (
                                <div className="flex items-center gap-2 p-3 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400">
                                    <AlertCircle className="h-5 w-5" />
                                    <span className="text-sm">{error}</span>
                                </div>
                            )}

                            {/* Submit */}
                            <Button type="submit" className="w-full" size="lg" disabled={loading}>
                                {loading ? "Вход..." : "Войти"}
                            </Button>
                        </form>

                        <div className="mt-6 text-center text-sm text-muted-foreground">
                            <p>Тестовые данные:</p>
                            <p className="font-mono mt-1">admin@firstuzbekistan.uz</p>
                            <p className="font-mono">admin123</p>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}