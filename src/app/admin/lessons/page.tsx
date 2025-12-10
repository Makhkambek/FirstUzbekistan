"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/admin/data-table";
import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/types/database";

type Lesson = Database['public']['Tables']['lessons']['Row'];

const supabase = createClient();

export const dynamic = 'force-dynamic';

const categoryLabels: Record<string, string> = {
    engineering: "Инженерия",
    programming: "Программирование",
};

const difficultyLabels: Record<string, string> = {
    beginner: "Начальный",
    intermediate: "Средний",
    advanced: "Продвинутый",
};

export default function AdminLessonsPage() {
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLessons();
    }, []);

    async function fetchLessons() {
        const { data } = await supabase
            .from("lessons")
            .select("*")
            .order("category")
            .order("order");
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
            render: (item: Lesson) => (
                <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground line-clamp-1">{item.description}</p>
                </div>
            ),
        },
        {
            key: "category",
            label: "Категория",
            render: (item: Lesson) => (
                <Badge variant={item.category === "engineering" ? "outline" : "secondary"}>
                    {categoryLabels[item.category]}
                </Badge>
            ),
        },
        {
            key: "difficulty",
            label: "Сложность",
            render: (item: Lesson) => (
                <Badge variant="outline">{difficultyLabels[item.difficulty]}</Badge>
            ),
        },
        {
            key: "views",
            label: "Просмотры",
        },
        {
            key: "status",
            label: "Статус",
            render: (item: Lesson) => (
                <Badge variant={item.status === "published" ? "default" : "secondary"}>
                    {item.status === "published" ? "Опубликован" : "Черновик"}
                </Badge>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Уроки</h1>
                <p className="text-muted-foreground mt-2">
                    Управление видеоуроками по инженерии и программированию
                </p>
            </div>

            <DataTable
                title="Все уроки"
                data={lessons}
                columns={columns}
                onDelete={handleDelete}
                editHref={(lesson) => `/admin/lessons/${lesson.id}/edit`}
                newHref="/admin/lessons/new"
                loading={loading}
                emptyMessage="Нет уроков"
            />
        </div>
    );
}