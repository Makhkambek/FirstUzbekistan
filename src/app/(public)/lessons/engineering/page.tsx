"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Wrench, ArrowRight, Package, Blocks, Trophy } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LessonCard } from "@/components/features/lesson-card";
import { getSubcategoriesByCategory, getLessonsBySubcategory } from "@/lib/supabase-data";
import type { Database } from "@/types/database";
import { cn } from "@/lib/utils";

type Subcategory = Database['public']['Tables']['subcategories']['Row'];
type Lesson = Database['public']['Tables']['lessons']['Row'];
type Program = 'ftc' | 'fll';

export default function EngineeringPage() {
    const searchParams = useSearchParams();
    const program = (searchParams.get('program') as Program) || 'ftc';

    const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
    const [lessonsBySubcategory, setLessonsBySubcategory] = useState<Record<string, Lesson[]>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const subcats = await getSubcategoriesByCategory('engineering', program);
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
    }, [program]);

    return (
        <>
            {/* Hero */}
            <Section className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 py-16 md:py-24">
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
                    >
                        <Badge
                            className={cn(
                                "mb-4",
                                program === 'ftc'
                                    ? "bg-ftc-red hover:bg-ftc-red text-white"
                                    : "bg-yellow-500 hover:bg-yellow-500 text-white"
                            )}
                        >
                            {program === 'ftc' ? (
                                "FIRST Tech Challenge"
                            ) : (
                                <>
                                    <Blocks className="mr-1 h-3 w-3" />
                                    FIRST LEGO League
                                </>
                            )}
                        </Badge>

                        <div className="flex items-center gap-4">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-500 text-white">
                                <Wrench className="h-8 w-8" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                                    Инженерия
                                </h1>
                                <p className="mt-1 text-muted-foreground">
                                    {program === 'ftc'
                                        ? "CAD моделирование, механика и прототипирование"
                                        : "LEGO конструирование, механика и датчики"
                                    }
                                </p>
                            </div>
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
                                            <Badge variant="outline" className="mb-2 border-orange-500 text-orange-600">
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
                    <Section className="bg-gradient-to-br from-orange-500/5 to-orange-600/10 border-t">
                        <Container>
                            {/* Section Header */}
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                                    Ресурсы для инженеров
                                </h2>
                                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                    {program === 'ftc'
                                        ? "CAD модели, инструменты и технические гайды для создания робота"
                                        : "LEGO модели, строительные инструкции и гайды для FLL робота"
                                    }
                                </p>
                            </div>

                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
                                {program === 'ftc' ? (
                                    <>
                                        {/* FTC Resources */}
                                        {/* 1. CAD Models Card */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                        >
                                            <Link href={`/resources/cads?program=${program}`}>
                                                <Card className="group h-full hover:shadow-lg transition-all duration-300 hover:border-orange-500/50">
                                                    <CardContent className="p-6 text-center">
                                                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange-100 dark:bg-orange-900/30 text-orange-600 mx-auto mb-4">
                                                            <Package className="h-7 w-7" />
                                                        </div>
                                                        <h3 className="font-semibold mb-2">CAD Модели</h3>
                                                        <p className="text-sm text-muted-foreground mb-4">
                                                            Готовые 3D модели: intake, lift, drivetrain и другие механизмы
                                                        </p>
                                                        <span className="inline-flex items-center text-sm font-medium text-orange-600">
                                                            Смотреть все
                                                            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                                        </span>
                                                    </CardContent>
                                                </Card>
                                            </Link>
                                        </motion.div>

                                        {/* 2. Tools & Calculators Card */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.1 }}
                                        >
                                            <Link href={`/resources/tools?program=${program}`}>
                                                <Card className="group h-full hover:shadow-lg transition-all duration-300 hover:border-blue-500/50">
                                                    <CardContent className="p-6 text-center">
                                                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 mx-auto mb-4">
                                                            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                            </svg>
                                                        </div>
                                                        <h3 className="font-semibold mb-2">Калькуляторы</h3>
                                                        <p className="text-sm text-muted-foreground mb-4">
                                                            Gear ratio, belt/chain length, вес и другие инструменты расчета
                                                        </p>
                                                        <span className="inline-flex items-center text-sm font-medium text-blue-600">
                                                            Перейти
                                                            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                                        </span>
                                                    </CardContent>
                                                </Card>
                                            </Link>
                                        </motion.div>

                                        {/* 3. Technical Guides Card */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            <Link href={`/resources/guides?program=${program}`}>
                                                <Card className="group h-full hover:shadow-lg transition-all duration-300 hover:border-green-500/50">
                                                    <CardContent className="p-6 text-center">
                                                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-100 dark:bg-green-900/30 text-green-600 mx-auto mb-4">
                                                            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                            </svg>
                                                        </div>
                                                        <h3 className="font-semibold mb-2">Технические гайды</h3>
                                                        <p className="text-sm text-muted-foreground mb-4">
                                                            Build guides, выбор материалов, сборочные инструкции
                                                        </p>
                                                        <span className="inline-flex items-center text-sm font-medium text-green-600">
                                                            Читать
                                                            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                                        </span>
                                                    </CardContent>
                                                </Card>
                                            </Link>
                                        </motion.div>
                                    </>
                                ) : (
                                    <>
                                        {/* FLL Resources */}
                                        {/* 1. SPIKE Prime Set */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                        >
                                            <Link href={`/resources/cads?program=${program}`}>
                                                <Card className="group h-full hover:shadow-lg transition-all duration-300 hover:border-yellow-500/50">
                                                    <CardContent className="p-6 text-center">
                                                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 mx-auto mb-4">
                                                            <Blocks className="h-7 w-7" />
                                                        </div>
                                                        <h3 className="font-semibold mb-2">SPIKE Prime Набор</h3>
                                                        <p className="text-sm text-muted-foreground mb-4">
                                                            Официальные инструкции и модели LEGO Education SPIKE Prime
                                                        </p>
                                                        <span className="inline-flex items-center text-sm font-medium text-yellow-600">
                                                            Смотреть все
                                                            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                                        </span>
                                                    </CardContent>
                                                </Card>
                                            </Link>
                                        </motion.div>

                                        {/* 2. Building Instructions */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.1 }}
                                        >
                                            <Link href={`/resources/guides?program=${program}`}>
                                                <Card className="group h-full hover:shadow-lg transition-all duration-300 hover:border-blue-500/50">
                                                    <CardContent className="p-6 text-center">
                                                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 mx-auto mb-4">
                                                            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                                            </svg>
                                                        </div>
                                                        <h3 className="font-semibold mb-2">Инструкции по сборке</h3>
                                                        <p className="text-sm text-muted-foreground mb-4">
                                                            Примеры роботов и навесного оборудования для FLL Challenge
                                                        </p>
                                                        <span className="inline-flex items-center text-sm font-medium text-blue-600">
                                                            Читать
                                                            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                                        </span>
                                                    </CardContent>
                                                </Card>
                                            </Link>
                                        </motion.div>

                                        {/* 3. Game Guide */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            <Link href={`/resources/guides?program=${program}`}>
                                                <Card className="group h-full hover:shadow-lg transition-all duration-300 hover:border-green-500/50">
                                                    <CardContent className="p-6 text-center">
                                                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-100 dark:bg-green-900/30 text-green-600 mx-auto mb-4">
                                                            <Trophy className="h-7 w-7" />
                                                        </div>
                                                        <h3 className="font-semibold mb-2">Игровые гайды</h3>
                                                        <p className="text-sm text-muted-foreground mb-4">
                                                            Правила, стратегии и решения миссий FLL Challenge
                                                        </p>
                                                        <span className="inline-flex items-center text-sm font-medium text-green-600">
                                                            Изучить
                                                            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                                        </span>
                                                    </CardContent>
                                                </Card>
                                            </Link>
                                        </motion.div>
                                    </>
                                )}
                            </div>

                            <div className="text-center">
                                <Button asChild variant="outline" size="lg">
                                    <Link href={`/resources?program=${program}`}>
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