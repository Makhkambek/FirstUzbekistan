"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export default function NewAnnouncementPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        type: "info" as "info" | "warning" | "success" | "event",
        link_text: "",
        link_url: "",
        is_active: true,
        order: 0,
    });

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase.from("announcements").insert([formData]);

        if (error) {
            alert("Ошибка: " + error.message);
            setLoading(false);
        } else {
            router.push("/admin/announcements");
        }
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Новое объявление</h1>
                <p className="text-muted-foreground mt-2">
                    Добавьте новое объявление на главную страницу
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                <Card>
                    <CardHeader>
                        <CardTitle>Данные объявления</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Заголовок</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                                placeholder="🚀 Новое объявление!"
                                required
                            />
                        </div>

                        {/* Content */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Содержание</label>
                            <textarea
                                value={formData.content}
                                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                                className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                                rows={3}
                                required
                            />
                        </div>

                        {/* Type */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Тип</label>
                            <select
                                value={formData.type}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    type: e.target.value as "info" | "warning" | "success" | "event"
                                }))}
                                className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                            >
                                <option value="info">Информация</option>
                                <option value="success">Успех</option>
                                <option value="warning">Важно</option>
                                <option value="event">Событие</option>
                            </select>
                        </div>

                        {/* Link */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Текст ссылки</label>
                                <input
                                    type="text"
                                    value={formData.link_text}
                                    onChange={(e) => setFormData(prev => ({ ...prev, link_text: e.target.value }))}
                                    className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                                    placeholder="Подробнее"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">URL ссылки</label>
                                <input
                                    type="text"
                                    value={formData.link_url}
                                    onChange={(e) => setFormData(prev => ({ ...prev, link_url: e.target.value }))}
                                    className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                                    placeholder="/apply"
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
                                <label className="block text-sm font-medium mb-2">Активно</label>
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
                                onClick={() => router.push("/admin/announcements")}
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