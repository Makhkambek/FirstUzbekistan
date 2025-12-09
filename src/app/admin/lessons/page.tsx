"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/admin/data-table";
import { createClient } from "@/lib/supabase/client";
import { getDifficultyLabel, formatNumber } from "@/lib/utils";
import type { Database } from "@/types/database";

type Lesson = Database['public']['Tables']['lessons']['Row'];

const supabase = createClient();

export default function AdminLessonsPage() {
    const router = useRouter();
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLessons();
    }, []);

    async function fetchLessons() {
        const { data } = await supabase
            .from("lessons")
            .select("*")
            .order("created_at", { ascending: false });
        setLessons(data || []);
        setLoading(false);
    }

    async function handleDelete(lesson: Lesson) {
        if (!confirm(`Удалить урок "${lesson.title}"?`)) return;

        const { error } = await supabase
            .from("lessons")
            .delete()
            .eq("id", lesson.id);

        if (error) {
            alert("Ошибка при удалении: " + error.message);
        } else {
            fetchLessons();
        }
    }

    const columns = [
        {
            key: "title",
            label: "Название",
            render: (lesson: Lesson) => (
                <div>
                    <p className="font-medium">{lesson.title}</p>
                    <p className="text-sm text-muted-foreground">{lesson.slug}</p>
                </div>
            ),
        },
        {
            key: "category",
            label: "Категория",
            render: (lesson: Lesson) => (
                <Badge variant={lesson.category === "engineering" ? "engineering" : "programming"}>
                    {lesson.category === "engineering" ? "Инженерия" : "Программирование"}
                </Badge>
            ),
        },
        {
            key: "difficulty",
            label: "Сложность",
            render: (lesson: Lesson) => getDifficultyLabel(lesson.difficulty),
        },
        {
            key: "views",
            label: "Просмотры",
            render: (lesson: Lesson) => formatNumber(lesson.views),
        },
        {
            key: "status",
            label: "Статус",
            render: (lesson: Lesson) => (
                <Badge variant={lesson.status === "published" ? "success" : "warning"}>
                    {lesson.status === "published" ? "Опубликован" : "Черновик"}
                </Badge>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Управление уроками</h1>
                <p className="text-muted-foreground mt-2">
                    Добавление, редактирование и удаление видеоуроков
                </p>
            </div>

            <DataTable
                title="Все уроки"
                data={lessons}
                columns={columns}
                editHref={(lesson) => `/admin/lessons/${lesson.id}/edit`}
                onDelete={handleDelete}
                newHref="/admin/lessons/new"
                loading={loading}
                emptyMessage="Уроки не найдены. Создайте первый урок!"
            />
        </div>
    );
}