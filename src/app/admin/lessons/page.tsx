"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/admin/data-table";
import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/types/database";
import { cn } from "@/lib/utils";

type Lesson = Database['public']['Tables']['lessons']['Row'];
type Program = 'ftc' | 'fll' | 'all';

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

const programLabels: Record<string, string> = {
    ftc: "FTC",
    fll: "FLL",
};

export default function AdminLessonsPage() {
    const [selectedProgram, setSelectedProgram] = useState<Program>('all');
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [allLessons, setAllLessons] = useState<Lesson[]>([]);
    const [ftcCount, setFtcCount] = useState(0);
    const [fllCount, setFllCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAllLessons();
    }, []);

    useEffect(() => {
        filterLessons();
    }, [selectedProgram, allLessons]);

    async function fetchAllLessons() {
        setLoading(true);

        // Fetch all lessons
        const { data: allData } = await supabase
            .from("lessons")
            .select("*")
            .order("category")
            .order("order");

        setAllLessons(allData || []);

        // Try to get counts by program
        const { data: ftcData, error: ftcError } = await supabase
            .from("lessons")
            .select("id")
            .eq('program', 'ftc');

        const { data: fllData, error: fllError } = await supabase
            .from("lessons")
            .select("id")
            .eq('program', 'fll');

        // If program field doesn't exist yet (before migration)
        if (ftcError || fllError) {
            console.log('Program field not found, using defaults');
            // Before migration: all are FTC, none are FLL
            setFtcCount(allData?.length || 0);
            setFllCount(0);
        } else {
            // After migration: use actual counts
            setFtcCount(ftcData?.length || 0);
            setFllCount(fllData?.length || 0);
        }

        setLoading(false);
    }

    function filterLessons() {
        if (selectedProgram === 'all') {
            setLessons(allLessons);
            return;
        }

        // Filter locally based on program or treat all as FTC if program field doesn't exist
        const filtered = allLessons.filter(lesson => {
            // If lesson has program field, use it
            if (lesson.program) {
                return lesson.program === selectedProgram;
            }
            // If no program field (before migration), treat as FTC
            return selectedProgram === 'ftc';
        });

        setLessons(filtered);
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
            fetchAllLessons();
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
            key: "program",
            label: "Программа",
            render: (item: Lesson) => {
                // Handle case where program field doesn't exist yet (before migration)
                const program = item.program || 'ftc';
                return (
                    <Badge variant={program === "ftc" ? "destructive" : "default"}>
                        {programLabels[program as 'ftc' | 'fll']}
                    </Badge>
                );
            },
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

            {/* Filter Tabs */}
            <div className="flex gap-2">
                <Button
                    variant={selectedProgram === 'all' ? 'default' : 'outline'}
                    onClick={() => setSelectedProgram('all')}
                >
                    Все ({allLessons.length})
                </Button>
                <Button
                    variant={selectedProgram === 'ftc' ? 'default' : 'outline'}
                    onClick={() => setSelectedProgram('ftc')}
                    className={cn(selectedProgram === 'ftc' && "bg-ftc-red hover:bg-ftc-red/90")}
                >
                    FTC ({ftcCount})
                </Button>
                <Button
                    variant={selectedProgram === 'fll' ? 'default' : 'outline'}
                    onClick={() => setSelectedProgram('fll')}
                    className={cn(selectedProgram === 'fll' && "bg-yellow-500 hover:bg-yellow-500/90")}
                >
                    FLL ({fllCount})
                </Button>
            </div>

            <DataTable
                title={selectedProgram === 'all' ? 'Все уроки' : `Уроки ${programLabels[selectedProgram]}`}
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