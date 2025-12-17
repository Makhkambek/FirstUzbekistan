"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export default function NewResourcePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "cad" as "cad" | "code" | "drawing" | "other",
        type: "engineering" as "engineering" | "programming",
        year: new Date().getFullYear(),
        file_url: "",
        preview_url: "",
        tags: "",
        order: 0,
        is_active: true,
    });

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        const tagsArray = formData.tags
            .split(",")
            .map((tag) => tag.trim().toLowerCase())
            .filter((tag) => tag.length > 0);

        const dataToSave = {
            ...formData,
            tags: tagsArray,
            preview_url: formData.preview_url || undefined,
        };

        const { error } = await supabase.from("resources").insert([dataToSave]);

        if (error) {
            alert("Ошибка: " + error.message);
            setLoading(false);
        } else {
            router.push("/admin/resources");
        }
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Новый ресурс</h1>
                <p className="text-muted-foreground mt-2">
                    Добавьте CAD модель или пример кода
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                <Card>
                    <CardHeader>
                        <CardTitle>Данные ресурса</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Название</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                                className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                                placeholder="Intake Mechanism V2"
                                required
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Описание</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                                className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                                rows={3}
                                required
                            />
                        </div>

                        {/* Type & Category */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Раздел</label>
                                <select
                                    value={formData.type}
                                    onChange={(e) => {
                                        const newType = e.target.value as "engineering" | "programming";
                                        setFormData((prev) => ({
                                            ...prev,
                                            type: newType,
                                            // Автоматически устанавливаем подходящую категорию
                                            category: newType === "engineering" ? "cad" : "code",
                                        }));
                                    }}
                                    className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                                >
                                    <option value="engineering">Инженерия</option>
                                    <option value="programming">Программирование</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Категория</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            category: e.target.value as "cad" | "code" | "drawing" | "other",
                                        }))
                                    }
                                    className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                                >
                                    {formData.type === "engineering" ? (
                                        <>
                                            <option value="cad">CAD Model</option>
                                            <option value="drawing">Drawing</option>
                                            <option value="other">Other</option>
                                        </>
                                    ) : (
                                        <>
                                            <option value="code">Code</option>
                                            <option value="other">Other</option>
                                        </>
                                    )}
                                </select>
                            </div>
                        </div>

                        {/* Year */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Год</label>
                            <select
                                value={formData.year}
                                onChange={(e) =>
                                    setFormData((prev) => ({ ...prev, year: parseInt(e.target.value) }))
                                }
                                className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                            >
                                {[2025, 2024, 2023, 2022].map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* File URL */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Ссылка на файл (Google Drive / GitHub)
                            </label>
                            <input
                                type="url"
                                value={formData.file_url}
                                onChange={(e) => setFormData((prev) => ({ ...prev, file_url: e.target.value }))}
                                className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                                placeholder="https://drive.google.com/..."
                                required
                            />
                        </div>

                        {/* Preview URL */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Превью (URL картинки, опционально)
                            </label>
                            <input
                                type="url"
                                value={formData.preview_url}
                                onChange={(e) => setFormData((prev) => ({ ...prev, preview_url: e.target.value }))}
                                className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                                placeholder="https://example.com/preview.png"
                            />
                        </div>

                        {/* Tags */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Теги (через запятую)
                            </label>
                            <input
                                type="text"
                                value={formData.tags}
                                onChange={(e) => setFormData((prev) => ({ ...prev, tags: e.target.value }))}
                                className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                                placeholder="intake, gobilda, itd"
                            />
                        </div>

                        {/* Order & Status */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Порядок</label>
                                <input
                                    type="number"
                                    value={formData.order || 0}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            order: e.target.value ? parseInt(e.target.value) : 0,
                                        }))
                                    }
                                    className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                                    min="0"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Активен</label>
                                <select
                                    value={formData.is_active ? "true" : "false"}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            is_active: e.target.value === "true",
                                        }))
                                    }
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
                                onClick={() => router.push("/admin/resources")}
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