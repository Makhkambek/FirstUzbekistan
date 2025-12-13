"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import { ImageIcon, AlertCircle, CheckCircle } from "lucide-react";
import type { Database } from "@/types/database";

type TeamMember = Database['public']['Tables']['team_members']['Row'];

const supabase = createClient();

export default function EditTeamMemberPage() {
    const router = useRouter();
    const params = useParams();
    const memberId = params.id as string;

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [imageError, setImageError] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        role: "programmer" as "captain" | "programmer" | "engineer" | "designer" | "mentor" | "coach",
        position: "",
        bio: "",
        image_url: "",
        github_url: "",
        linkedin_url: "",
        telegram_url: "",
        order: 0,
        is_active: true,
    });

    useEffect(() => {
        fetchMember();
    }, [memberId]);

    async function fetchMember() {
        const { data, error } = await supabase
            .from("team_members")
            .select("*")
            .eq("id", memberId)
            .single();

        if (error) {
            alert("Ошибка загрузки: " + error.message);
            router.push("/admin/team");
            return;
        }

        if (data) {
            setFormData({
                name: data.name,
                role: data.role,
                position: data.position || "",
                bio: data.bio,
                image_url: data.image_url || "",
                github_url: data.github_url || "",
                linkedin_url: data.linkedin_url || "",
                telegram_url: data.telegram_url || "",
                order: data.order,
                is_active: data.is_active,
            });
            if (data.image_url) {
                setImageLoaded(true);
            }
        }

        setFetching(false);
    }

    function normalizeImageUrl(url: string): string {
        if (!url) return "";

        let normalized = url.trim();

        // Imgur: преобразуем imgur.com/xxx в i.imgur.com/xxx.jpg
        if (normalized.includes("imgur.com") && !normalized.includes("i.imgur.com")) {
            const match = normalized.match(/imgur\.com\/(?:a\/)?([a-zA-Z0-9]+)/);
            if (match) {
                normalized = `https://i.imgur.com/${match[1]}.jpg`;
            }
        }

        // ImgBB: преобразуем ibb.co/xxx в прямую ссылку
        // Формат страницы: https://ibb.co/xq8FF2C8
        // Формат прямой ссылки: https://i.ibb.co/4gTW5mD3/photo.jpg
        if (normalized.includes("ibb.co/") && !normalized.includes("i.ibb.co/")) {
            // К сожалению, ImgBB не позволяет автоматически преобразовать
            // Показываем предупреждение пользователю
            console.warn("ImgBB: используйте Direct Link вместо ссылки на страницу");
        }

        return normalized;
    }

    function handleImageUrlChange(url: string) {
        setImageError(false);
        setImageLoaded(false);

        const normalizedUrl = normalizeImageUrl(url);
        setFormData((prev) => ({ ...prev, image_url: normalizedUrl }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        const dataToUpdate = {
            ...formData,
            position: formData.position || null,
            image_url: formData.image_url || null,
            github_url: formData.github_url || null,
            linkedin_url: formData.linkedin_url || null,
            telegram_url: formData.telegram_url || null,
        };

        const { error } = await supabase
            .from("team_members")
            .update(dataToUpdate)
            .eq("id", memberId);

        if (error) {
            alert("Ошибка: " + error.message);
            setLoading(false);
        } else {
            router.push("/admin/team");
        }
    }

    if (fetching) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Редактировать участника</h1>
                <p className="text-muted-foreground mt-2">
                    Измените данные члена команды
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                <Card>
                    <CardHeader>
                        <CardTitle>Данные участника</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Photo URL */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Фотография (URL)</label>
                            <input
                                type="url"
                                value={formData.image_url}
                                onChange={(e) => handleImageUrlChange(e.target.value)}
                                className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                                placeholder="https://i.imgur.com/xxxxx.jpg"
                            />

                            {formData.image_url && (
                                <div className="mt-3">
                                    <div className="flex items-center gap-2 mb-2">
                                        <p className="text-sm text-muted-foreground">Превью:</p>
                                        {imageLoaded && (
                                            <span className="flex items-center gap-1 text-sm text-green-600">
                                                <CheckCircle className="h-4 w-4" />
                                                Изображение загружено
                                            </span>
                                        )}
                                        {imageError && (
                                            <span className="flex items-center gap-1 text-sm text-red-500">
                                                <AlertCircle className="h-4 w-4" />
                                                Ошибка загрузки
                                            </span>
                                        )}
                                    </div>

                                    <div className="relative h-32 w-32">
                                        {!imageLoaded && !imageError && (
                                            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-muted border-4 border-border">
                                                <ImageIcon className="h-8 w-8 text-muted-foreground animate-pulse" />
                                            </div>
                                        )}
                                        {imageError && (
                                            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-red-50 border-4 border-red-200">
                                                <AlertCircle className="h-8 w-8 text-red-400" />
                                            </div>
                                        )}
                                        <img
                                            src={formData.image_url}
                                            alt="Preview"
                                            className={`h-32 w-32 rounded-full object-cover border-4 border-border ${imageLoaded ? "opacity-100" : "opacity-0"
                                                } ${imageError ? "hidden" : ""}`}
                                            onLoad={() => {
                                                setImageLoaded(true);
                                                setImageError(false);
                                            }}
                                            onError={() => {
                                                setImageError(true);
                                                setImageLoaded(false);
                                            }}
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="mt-3 p-3 bg-muted/50 rounded-lg text-xs space-y-2">
                                <p className="font-medium">Как получить правильную ссылку:</p>
                                <div className="space-y-1 text-muted-foreground">
                                    <p><strong>Imgur:</strong></p>
                                    <ol className="list-decimal list-inside pl-2 space-y-1">
                                        <li>Загрузите фото на <a href="https://imgur.com/upload" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">imgur.com/upload</a></li>
                                        <li>Нажмите правой кнопкой на изображение</li>
                                        <li>Выберите "Копировать адрес изображения"</li>
                                    </ol>
                                    <p className="mt-2"><strong>ImgBB:</strong></p>
                                    <ol className="list-decimal list-inside pl-2 space-y-1">
                                        <li>Загрузите фото на <a href="https://imgbb.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">imgbb.com</a></li>
                                        <li>После загрузки скопируйте "Direct link"</li>
                                    </ol>
                                </div>
                            </div>
                        </div>

                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Имя</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                                className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                                required
                            />
                        </div>

                        {/* Role */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Роль в команде</label>
                            <select
                                value={formData.role}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        role: e.target.value as typeof formData.role,
                                    }))
                                }
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

                        {/* Position */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Должность / Специализация</label>
                            <input
                                type="text"
                                value={formData.position}
                                onChange={(e) => setFormData((prev) => ({ ...prev, position: e.target.value }))}
                                className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                                placeholder="Full Stack Developer / AI Specialist"
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                                Например: "Full Stack Developer / Computer Engineer" или "Project Manager / AI Product Specialist"
                            </p>
                        </div>

                        {/* Bio */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Биография</label>
                            <textarea
                                value={formData.bio}
                                onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))}
                                className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                                rows={4}
                                required
                            />
                        </div>

                        {/* Social Links */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">GitHub</label>
                                <input
                                    type="url"
                                    value={formData.github_url}
                                    onChange={(e) =>
                                        setFormData((prev) => ({ ...prev, github_url: e.target.value }))
                                    }
                                    className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                                    placeholder="https://github.com/username"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">LinkedIn</label>
                                <input
                                    type="url"
                                    value={formData.linkedin_url}
                                    onChange={(e) =>
                                        setFormData((prev) => ({ ...prev, linkedin_url: e.target.value }))
                                    }
                                    className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                                    placeholder="https://linkedin.com/in/username"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Telegram</label>
                                <input
                                    type="url"
                                    value={formData.telegram_url}
                                    onChange={(e) =>
                                        setFormData((prev) => ({ ...prev, telegram_url: e.target.value }))
                                    }
                                    className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                                    placeholder="https://t.me/username"
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
                            <Button type="submit" disabled={loading || (formData.image_url !== "" && imageError)}>
                                {loading ? "Сохранение..." : "Сохранить"}
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