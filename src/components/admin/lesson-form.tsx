"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import { slugify, getYouTubeThumbnail } from "@/lib/utils";
import type { Database } from "@/types/database";

type Lesson = Database['public']['Tables']['lessons']['Row'];
type Subcategory = Database['public']['Tables']['subcategories']['Row'];

const supabase = createClient();

interface LessonFormProps {
    lesson?: Lesson;
    mode: "create" | "edit";
}

export function LessonForm({ lesson, mode }: LessonFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [subcategories, setSubcategories] = useState<Subcategory[]>([]);

    const [formData, setFormData] = useState({
        title: lesson?.title || "",
        slug: lesson?.slug || "",
        description: lesson?.description || "",
        video_url: lesson?.video_url || "",
        thumbnail_url: lesson?.thumbnail_url || "",
        category: lesson?.category || "engineering" as "engineering" | "programming",
        subcategory_id: lesson?.subcategory_id || "",
        duration: lesson?.duration || "",
        difficulty: lesson?.difficulty || "beginner" as "beginner" | "intermediate" | "advanced",
        order: lesson?.order || 0,
        status: lesson?.status || "draft" as "draft" | "published",
    });

    useEffect(() => {
        fetchSubcategories();
    }, [formData.category]);

    async function fetchSubcategories() {
        const { data } = await supabase
            .from("subcategories")
            .select("*")
            .eq("category", formData.category)
            .order("order");
        setSubcategories(data || []);
        if (data && data.length > 0 && !formData.subcategory_id) {
            setFormData(prev => ({ ...prev, subcategory_id: data[0].id }));
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        console.log('Form data before save:', formData);

        const dataToSave = {
            ...formData,
            thumbnail_url: formData.thumbnail_url || getYouTubeThumbnail(formData.video_url),
        };

        console.log('Data to save:', dataToSave);

        if (mode === "create") {
            const { data, error } = await supabase.from("lessons").insert([dataToSave]);
            console.log('Insert result:', { data, error });

            if (error) {
                console.error('Insert error:', error);
                alert("Ошибка при создании: " + error.message);
                setLoading(false);
            } else {
                console.log('Success! Redirecting...');
                router.push("/admin/lessons");
                router.refresh();
            }
        } else {
            const { data, error } = await supabase
                .from("lessons")
                .update(dataToSave)
                .eq("id", lesson!.id);

            console.log('Update result:', { data, error });

            if (error) {
                console.error('Update error:', error);
                alert("Ошибка при обновлении: " + error.message);
                setLoading(false);
            } else {
                console.log('Success! Redirecting...');
                router.push("/admin/lessons");
                router.refresh();
            }
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Card>
                <CardHeader>
                    <CardTitle>{mode === "create" ? "Новый урок" : "Редактировать урок"}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Название</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => {
                                const title = e.target.value;
                                setFormData(prev => ({
                                    ...prev,
                                    title,
                                    slug: mode === "create" ? slugify(title) : prev.slug,
                                }));
                            }}
                            className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                            required
                        />
                    </div>

                    {/* Slug */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Slug (URL)</label>
                        <input
                            type="text"
                            value={formData.slug}
                            onChange={(e) => setFormData(prev => ({ ...prev, slug: slugify(e.target.value) }))}
                            className="w-full px-4 py-2 border border-border rounded-lg bg-background font-mono"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Описание</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                            className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                            rows={3}
                            required
                        />
                    </div>

                    {/* Video URL */}
                    <div>
                        <label className="block text-sm font-medium mb-2">YouTube URL</label>
                        <input
                            type="url"
                            value={formData.video_url}
                            onChange={(e) => setFormData(prev => ({ ...prev, video_url: e.target.value }))}
                            className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                            placeholder="https://www.youtube.com/watch?v=..."
                            required
                        />
                    </div>

                    {/* Category & Subcategory */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Категория</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    category: e.target.value as "engineering" | "programming",
                                    subcategory_id: "",
                                }))}
                                className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                            >
                                <option value="engineering">Инженерия</option>
                                <option value="programming">Программирование</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Подкатегория</label>
                            <select
                                value={formData.subcategory_id}
                                onChange={(e) => setFormData(prev => ({ ...prev, subcategory_id: e.target.value }))}
                                className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                                required
                            >
                                <option value="">Выберите...</option>
                                {subcategories.map(sub => (
                                    <option key={sub.id} value={sub.id}>{sub.title}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Duration & Difficulty */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Длительность</label>
                            <input
                                type="text"
                                value={formData.duration}
                                onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                                className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                                placeholder="15:30"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Сложность</label>
                            <select
                                value={formData.difficulty}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    difficulty: e.target.value as "beginner" | "intermediate" | "advanced"
                                }))}
                                className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                            >
                                <option value="beginner">Начинающий</option>
                                <option value="intermediate">Средний</option>
                                <option value="advanced">Продвинутый</option>
                            </select>
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
                            <label className="block text-sm font-medium mb-2">Статус</label>
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    status: e.target.value as "draft" | "published"
                                }))}
                                className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                            >
                                <option value="draft">Черновик</option>
                                <option value="published">Опубликован</option>
                            </select>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4 pt-4">
                        <Button type="submit" disabled={loading}>
                            {loading ? "Сохранение..." : mode === "create" ? "Создать урок" : "Сохранить"}
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
    );
}