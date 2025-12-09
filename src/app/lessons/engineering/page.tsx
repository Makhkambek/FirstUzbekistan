"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Wrench } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LessonCard } from "@/components/features/lesson-card";
import { getSubcategoriesByCategory, getLessonsBySubcategory } from "@/lib/supabase-data";
import type { Database } from "@/types/database";

type Subcategory = Database['public']['Tables']['subcategories']['Row'];
type Lesson = Database['public']['Tables']['lessons']['Row'];

export default function EngineeringPage() {
    const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
    const [lessonsBySubcategory, setLessonsBySubcategory] = useState<Record<string, Lesson[]>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const subcats = await getSubcategoriesByCategory('engineering');
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
            <Section className="bg-gradient-to-br from-engineering-500/10 to-engineering-600/5 py-16 md:py-24">
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
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-engineering-500 text-white">
                            <Wrench className="h-8 w-8" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                                Инженерия
                            </h1>
                            <p className="mt-1 text-muted-foreground">
                                CAD моделирование, механика и прототипирование
                            </p>
                        </div>
                    </motion.div>
                </Container>
            </Section>

            {/* Subcategories */}
            {loading ? (
                <Section>
                    <div className="text-center text-muted-foreground">Загрузка...</div>
                </Section>
            ) : (
                subcategories.map((subcategory, subIndex) => {
                    const lessons = lessonsBySubcategory[subcategory.id] || [];

                    return (
                        <Section key={subcategory.id} className={subIndex % 2 === 1 ? "bg-muted/30" : ""}>
                            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8">
                                <div>
                                    <Badge variant="engineering" className="mb-2">
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
                        </Section>
                    );
                })
            )}
        </>
    );
}