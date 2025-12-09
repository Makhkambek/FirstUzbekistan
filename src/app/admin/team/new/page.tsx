"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export default function NewTeamMemberPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        role: "programmer" as "captain" | "programmer" | "engineer" | "designer" | "mentor" | "coach",
        bio: "",
        image_url: "",
        github_url: "",
        linkedin_url: "",
        telegram_url: "",
        order: 0,
        is_active: true,
    });

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase.from("team_members").insert([formData]);

        if (error) {
            alert("Ошибка: " + error.message);
            setLoading(false);
        } else {
            router.push("/admin/team");
        }
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Новый участник</h1>
                <p className="text-muted-foreground mt-2">
                    Добавьте нового участника команды
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                <Card>
                    <CardHeader>
                        <CardTitle>Данные участника</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Имя</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                                required
                            />
                        </div>

                        {/* Role */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Роль</label>
                            <select
                                value={formData.role}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    role: e.target.value as typeof formData.role
                                }))}
                                className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                            >
                                <option value="captain">Капитан</option>
                                <option value="programmer">Программист</option>
                                <option value="engineer">Инженер</option>
                                <option value="designer">Дизайнер</option>
                                <option value="mentor">Ментор</option>
                                <option value="coach">Тренер</option>
                            </select>
                        </div>

                        {/* Bio */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Описание</label>
                            <textarea
                                value={formData.bio}
                                onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                                className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                                rows={3}
                                required
                            />
                        </div>

                        {/* Social Links */}
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">GitHub</label>
                                <input
                                    type="url"
                                    value={formData.github_url}
                                    onChange={(e) => setFormData(prev => ({ ...prev, github_url: e.target.value }))}
                                    className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                                    placeholder="https://github.com/..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">LinkedIn</label>
                                <input
                                    type="url"
                                    value={formData.linkedin_url}
                                    onChange={(e) => setFormData(prev => ({ ...prev, linkedin_url: e.target.value }))}
                                    className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                                    placeholder="https://linkedin.com/in/..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Telegram</label>
                                <input
                                    type="url"
                                    value={formData.telegram_url}
                                    onChange={(e) => setFormData(prev => ({ ...prev, telegram_url: e.target.value }))}
                                    className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                                    placeholder="https://t.me/..."
                                />
                            </div>
                        </div>

                        {/* Order & Status */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Порядок</label>
                                <input
                                    type="number"
                                    value={formData.order || 0}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        order: e.target.value ? parseInt(e.target.value) : 0
                                    }))}
                                    className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                                    min="0"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Активен</label>
                                <select
                                    value={formData.is_active ? "true" : "false"}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        is_active: e.target.value === "true"
                                    }))}
                                    className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                                >
                                    <option value="true">Да</option>
                                    <option value="false">Нет</option>
                                </select>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-4 pt-4">
                            <Button type="submit" disabled={loading}>
                                {loading ? "Сохранение..." : "Создать"}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.push("/admin/team")}
                            >
                                Отмена
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </div>
    );
}