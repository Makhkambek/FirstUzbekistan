"use client";

import { use, useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { LessonForm } from "@/components/admin/lesson-form";
import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/types/database";

type Lesson = Database['public']['Tables']['lessons']['Row'];

const supabase = createClient();

interface PageProps {
    params: Promise<{ id: string }>;
}

export default function EditLessonPage({ params }: PageProps) {
    const { id } = use(params);
    const [lesson, setLesson] = useState<Lesson | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchLesson() {
            const { data, error } = await supabase
                .from("lessons")
                .select("*")
                .eq("id", id)
                .single();

            if (error || !data) {
                notFound();
            }

            setLesson(data);
            setLoading(false);
        }
        fetchLesson();
    }, [id]);

    if (loading) {
        return (
            <div className="text-center py-12 text-muted-foreground">
                Загрузка...
            </div>
        );
    }

    if (!lesson) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Редактировать урок</h1>
                <p className="text-muted-foreground mt-2">
                    Изменение: {lesson.title}
                </p>
            </div>

            <LessonForm lesson={lesson} mode="edit" />
        </div>
    );
}