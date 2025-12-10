"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export const dynamic = 'force-dynamic';

export default function NewLessonPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        description: "",
        video_url: "",
        thumbnail_url: "",
        category: "engineering" as "engineering" | "programming",
        subcategory_id: "",
        duration: "",
        difficulty: "beginner" as "beginner" | "intermediate" | "advanced",
        order: 0,
        status: "published" as "draft" | "published",
    });

    // Auto-generate slug from title
    const handleTitleChange = (title: string) => {
        setFormData((prev) => ({
            ...prev,
            title,
            slug: title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-|-$/g, ""),
        }));
    };

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        const dataToSave = {
            ...formData,
            thumbnail_url: formData.thumbnail_url || null,
        };

        const { error } = await supabase.from("lessons").insert([dataToSave]);

        if (error) {
            alert("Ошибка: " + error.message);
            setLoading(false);
        } else {
            router.push("/admin/lessons");
        }
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Новый урок</h1>
                <p className="text-muted-foreground mt-2">
                    Добавьте новый видеоурок
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                <Card>
                    <CardHeader>
                        <CardTitle>Данные урока</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Название</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => handleTitleChange(e.target.value)}
                                className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                                placeholder="Введение в CAD моделирование"
                                required
                            />
                        </div>

                        {/* Slug */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Slug (URL)</label>
                            <input
                                type="text"
                                value={formData.slug}
                                onChange={(e) =>
                                    setFormData((prev) => ({ ...prev, slug: e.target.value }))
                                }
                                className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                                placeholder="vvedenie-v-cad"
                                required
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                                Автоматически генерируется из названия
                            </p>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Описание</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) =>
                                    setFormData((prev) => ({ ...prev, description: e.target.value }))
                                }
                                className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                                rows={3}
                                required
                            />
                        </div>

                        {/* Video URL */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Ссылка на YouTube видео
                            </label>
                            <input
                                type="url"
                                value={formData.video_url}
                                onChange={(e) =>
                                    setFormData((prev) => ({ ...prev, video_url: e.target.value }))
                                }
                                className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                                placeholder="https://www.youtube.com/watch?v=..."
                                required
                            />
                        </div>

                        {/* Thumbnail URL */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Ссылка на обложку (thumbnail)
                            </label>
                            <input
                                type="url"
                                value={formData.thumbnail_url}
                                onChange={(e) =>
                                    setFormData((prev) => ({ ...prev, thumbnail_url: e.target.value }))
                                }
                                className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                                placeholder="https://example.com/thumbnail.jpg"
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                                Рекомендуется 1280x720px. Можно использовать imgur.com или imgbb.com для загрузки
                            </p>
                        </div>

                        {/* Category & Difficulty */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Категория</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            category: e.target.value as "engineering" | "programming",
                                        }))
                                    }
                                    className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                                >
                                    <option value="engineering">Инженерия</option>
                                    <option value="programming">Программирование</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Сложность</label>
                                <select
                                    value={formData.difficulty}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            difficulty: e.target.value as
                                                | "beginner"
                                                | "intermediate"
                                                | "advanced",
                                        }))
                                    }
                                    className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                                >
                                    <option value="beginner">Начальный</option>
                                    <option value="intermediate">Средний</option>
                                    <option value="advanced">Продвинутый</option>
                                </select>
                            </div>
                        </div>

                        {/* Duration */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Длительность</label>
                            <input
                                type="text"
                                value={formData.duration}
                                onChange={(e) =>
                                    setFormData((prev) => ({ ...prev, duration: e.target.value }))
                                }
                                className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                                placeholder="15:30"
                                required
                            />
                        </div>

                        {/* Subcategory ID (временно как текстовое поле) */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Subcategory ID (скопируй из Supabase)
                            </label>
                            <input
                                type="text"
                                value={formData.subcategory_id}
                                onChange={(e) =>
                                    setFormData((prev) => ({ ...prev, subcategory_id: e.target.value }))
                                }
                                className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                                placeholder="uuid из таблицы subcategories"
                                required
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
                                <label className="block text-sm font-medium mb-2">Статус</label>
                                <select
                                    value={formData.status}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            status: e.target.value as "draft" | "published",
                                        }))
                                    }
                                    className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                                >
                                    <option value="published">Опубликован</option>
                                    <option value="draft">Черновик</option>
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
                                onClick={() => router.push("/admin/lessons")}
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