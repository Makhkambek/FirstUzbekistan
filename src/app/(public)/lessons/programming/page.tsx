"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Code, ArrowRight, FileCode } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LessonCard } from "@/components/features/lesson-card";
import { getSubcategoriesByCategory, getLessonsBySubcategory } from "@/lib/supabase-data";
import type { Database } from "@/types/database";

type Subcategory = Database['public']['Tables']['subcategories']['Row'];
type Lesson = Database['public']['Tables']['lessons']['Row'];

export default function ProgrammingPage() {
    const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
    const [lessonsBySubcategory, setLessonsBySubcategory] = useState<Record<string, Lesson[]>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const subcats = await getSubcategoriesByCategory('programming');
            setSubcategories(subcats);

            // Fetch lessons for each subcategory
            const lessonsData: Record<string, Lesson[]> = {};
            for (const subcat of subcats) {
                const lessons = await getLessonsBySubcategory(subcat.id);
                lessonsData[subcat.id] = lessons;
            }
            setLessonsBySubcategory(lessonsData);
            setLoading(false);
        }
        fetchData();
    }, []);

    return (
        <>
            {/* Hero */}
            <Section className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 py-16 md:py-24">
                <Container>
                    <Link
                        href="/lessons"
                        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Все уроки
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-4"
                    >
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-500 text-white">
                            <Code className="h-8 w-8" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                                Программирование
                            </h1>
                            <p className="mt-1 text-muted-foreground">
                                FTC SDK, TeleOp управление и автономные системы
                            </p>
                        </div>
                    </motion.div>
                </Container>
            </Section>

            {/* Subcategories */}
            {loading ? (
                <Section>
                    <Container>
                        <div className="text-center text-muted-foreground">Загрузка...</div>
                    </Container>
                </Section>
            ) : (
                <>
                    {subcategories.map((subcategory, subIndex) => {
                        const lessons = lessonsBySubcategory[subcategory.id] || [];

                        return (
                            <Section key={subcategory.id} className={subIndex % 2 === 1 ? "bg-muted/30" : ""}>
                                <Container>
                                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8">
                                        <div>
                                            <Badge variant="outline" className="mb-2 border-purple-500 text-purple-600">
                                                Раздел {subIndex + 1}
                                            </Badge>
                                            <h2 className="text-2xl font-bold sm:text-3xl">
                                                {subcategory.title}
                                            </h2>
                                            <p className="mt-2 text-muted-foreground max-w-2xl">
                                                {subcategory.description}
                                            </p>
                                        </div>
                                    </div>

                                    {lessons.length > 0 ? (
                                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                            {lessons.map((lesson, index) => (
                                                <LessonCard key={lesson.id} lesson={lesson} index={index} />
                                            ))}
                                        </div>
                                    ) : (
                                        <Card>
                                            <CardContent className="py-12 text-center">
                                                <p className="text-muted-foreground">
                                                    Уроки скоро появятся...
                                                </p>
                                            </CardContent>
                                        </Card>
                                    )}
                                </Container>
                            </Section>
                        );
                    })}

                    {/* Resources Section */}
                    <Section className="bg-gradient-to-br from-purple-500/5 to-purple-600/10 border-t">
                        <Container>
                            {/* Section Header */}
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                                    Ресурсы для программистов
                                </h2>
                                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                    Шаблоны кода, ML модели и полезные библиотеки для FTC
                                </p>
                            </div>

                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
                                {/* 1. Code Templates Card */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                >
                                    <Link href="/resources/code">
                                        <Card className="group h-full hover:shadow-lg transition-all duration-300 hover:border-purple-500/50">
                                            <CardContent className="p-6 text-center">
                                                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 mx-auto mb-4">
                                                    <FileCode className="h-7 w-7" />
                                                </div>
                                                <h3 className="font-semibold mb-2">Шаблоны кода</h3>
                                                <p className="text-sm text-muted-foreground mb-4">
                                                    Готовые TeleOp, Autonomous режимы и базовые структуры
                                                </p>
                                                <span className="inline-flex items-center text-sm font-medium text-purple-600">
                                                    Смотреть все
                                                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                                </span>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                </motion.div>

                                {/* 2. ML & Computer Vision Card */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <Link href="/resources/ml">
                                        <Card className="group h-full hover:shadow-lg transition-all duration-300 hover:border-pink-500/50">
                                            <CardContent className="p-6 text-center">
                                                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-pink-100 dark:bg-pink-900/30 text-pink-600 mx-auto mb-4">
                                                    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                                    </svg>
                                                </div>
                                                <h3 className="font-semibold mb-2">ML & Computer Vision</h3>
                                                <p className="text-sm text-muted-foreground mb-4">
                                                    Наша ML модель для PedroPathing, AprilTag детекция и TensorFlow
                                                </p>
                                                <span className="inline-flex items-center text-sm font-medium text-pink-600">
                                                    Попробовать
                                                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                                </span>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                </motion.div>

                                {/* 3. Libraries & Utils Card */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <Link href="/resources/libraries">
                                        <Card className="group h-full hover:shadow-lg transition-all duration-300 hover:border-indigo-500/50">
                                            <CardContent className="p-6 text-center">
                                                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 mx-auto mb-4">
                                                    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                                    </svg>
                                                </div>
                                                <h3 className="font-semibold mb-2">Библиотеки</h3>
                                                <p className="text-sm text-muted-foreground mb-4">
                                                    RoadRunner, PID контроллеры и проверенные библиотеки сообщества
                                                </p>
                                                <span className="inline-flex items-center text-sm font-medium text-indigo-600">
                                                    Изучить
                                                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                                </span>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                </motion.div>
                            </div>

                            <div className="text-center">
                                <Button asChild variant="outline" size="lg">
                                    <Link href="/resources">
                                        Все ресурсы
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>
                        </Container>
                    </Section>
                </>
            )}
        </>
    );
}