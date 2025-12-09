"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export default function NewSponsorPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        logo_url: "",
        website_url: "",
        tier: "silver" as "platinum" | "gold" | "silver" | "bronze" | "partner",
        description: "",
        order: 0,
        is_active: true,
    });

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase.from("sponsors").insert([formData]);

        if (error) {
            alert("Ошибка: " + error.message);
            setLoading(false);
        } else {
            router.push("/admin/sponsors");
        }
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Новый спонсор</h1>
                <p className="text-muted-foreground mt-2">
                    Добавьте нового спонсора или партнёра
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                <Card>
                    <CardHeader>
                        <CardTitle>Данные спонсора</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Название</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                                required
                            />
                        </div>

                        {/* Website URL */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Сайт</label>
                            <input
                                type="url"
                                value={formData.website_url}
                                onChange={(e) => setFormData(prev => ({ ...prev, website_url: e.target.value }))}
                                className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                                placeholder="https://example.com"
                                required
                            />
                        </div>

                        {/* Logo URL */}
                        <div>
                            <label className="block text-sm font-medium mb-2">URL логотипа</label>
                            <input
                                type="url"
                                value={formData.logo_url}
                                onChange={(e) => setFormData(prev => ({ ...prev, logo_url: e.target.value }))}
                                className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                                placeholder="https://example.com/logo.png"
                                required
                            />
                        </div>

                        {/* Tier */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Уровень</label>
                            <select
                                value={formData.tier}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    tier: e.target.value as typeof formData.tier
                                }))}
                                className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                            >
                                <option value="platinum">Платиновый</option>
                                <option value="gold">Золотой</option>
                                <option value="silver">Серебряный</option>
                                <option value="bronze">Бронзовый</option>
                                <option value="partner">Партнёр</option>
                            </select>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Описание</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                                rows={2}
                                placeholder="Краткое описание спонсора..."
                            />
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
                                onClick={() => router.push("/admin/sponsors")}
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