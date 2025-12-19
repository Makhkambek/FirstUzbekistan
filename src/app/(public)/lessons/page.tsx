"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Wrench, Code, ArrowRight, BookOpen, Blocks } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LessonCard } from "@/components/features/lesson-card";
import { getPopularLessons, getSubcategoriesByCategory } from "@/lib/supabase-data";
import type { Database } from "@/types/database";
import { cn } from "@/lib/utils";

type Lesson = Database['public']['Tables']['lessons']['Row'];
type Subcategory = Database['public']['Tables']['subcategories']['Row'];
type Program = 'ftc' | 'fll';

const categories = [
    {
        id: "engineering" as const,
        title: "Инженерия",
        description: "CAD моделирование, механика, прототипирование и конструирование роботов",
        icon: Wrench,
        href: "/lessons/engineering",
        color: "engineering",
        gradient: "from-orange-500 to-orange-600",
    },
    {
        id: "programming" as const,
        title: "Программирование",
        description: "SDK, TeleOp управление, автономные системы и датчики",
        icon: Code,
        href: "/lessons/programming",
        color: "programming",
        gradient: "from-purple-500 to-purple-600",
    },
];

function LessonsPageContent() {
    const searchParams = useSearchParams();
    const programFromUrl = (searchParams.get('program') as Program) || 'ftc';
    const [selectedProgram, setSelectedProgram] = useState<Program>(programFromUrl);
    const [popularLessons, setPopularLessons] = useState<Lesson[]>([]);
    const [subcategories, setSubcategories] = useState<Record<string, Subcategory[]>>({});
    const [loading, setLoading] = useState(true);

    // Scroll to top when component mounts or program changes from URL
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
        setSelectedProgram(programFromUrl);
    }, [programFromUrl]);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const [lessons, engineeringSubcats, programmingSubcats] = await Promise.all([
                getPopularLessons(6, selectedProgram),
                getSubcategoriesByCategory('engineering', selectedProgram),
                getSubcategoriesByCategory('programming', selectedProgram),
            ]);

            setPopularLessons(lessons);
            setSubcategories({
                engineering: engineeringSubcats,
                programming: programmingSubcats,
            });
            setLoading(false);
        }
        fetchData();
    }, [selectedProgram]);

    return (
        <>
            {/* Hero */}
            <Section className="bg-muted/30 py-16 md:py-24">
                <Container size="sm">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <Badge className="mb-4">
                            <BookOpen className="mr-1 h-3 w-3" />
                            Обучение
                        </Badge>
                        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                            Видеоуроки
                        </h1>
                        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                            Бесплатные образовательные материалы по робототехнике для участников FIRST
                        </p>

                        {/* Program Tabs */}
                        <div className="mt-8 flex justify-center gap-2">
                            <button
                                onClick={() => setSelectedProgram('ftc')}
                                className={cn(
                                    "px-6 py-3 rounded-lg font-medium transition-all",
                                    selectedProgram === 'ftc'
                                        ? "bg-ftc-red text-white shadow-lg"
                                        : "bg-background text-muted-foreground hover:bg-muted"
                                )}
                            >
                                FIRST Tech Challenge
                            </button>
                            <button
                                onClick={() => setSelectedProgram('fll')}
                                className={cn(
                                    "px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2",
                                    selectedProgram === 'fll'
                                        ? "bg-yellow-500 text-white shadow-lg"
                                        : "bg-background text-muted-foreground hover:bg-muted"
                                )}
                            >
                                <Blocks className="h-4 w-4" />
                                FIRST LEGO League
                            </button>
                        </div>
                    </motion.div>
                </Container>
            </Section>

            {/* Categories */}
            <Section>
                <Container>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                            Направления обучения
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Выберите интересующую вас область
                        </p>
                    </div>

                    {loading ? (
                        <div className="text-center text-muted-foreground">Загрузка...</div>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2">
                            {categories.map((category, index) => {
                                const categorySubcats = subcategories[category.id] || [];

                                return (
                                    <motion.div
                                        key={category.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Link href={`${category.href}?program=${selectedProgram}`} scroll={true}>
                                            <Card className="group h-full hover:shadow-lg transition-all duration-300 overflow-hidden">
                                                {/* Header with gradient */}
                                                <div className={`bg-gradient-to-r ${category.gradient} p-6 text-white`}>
                                                    <div className="flex items-center gap-4">
                                                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20">
                                                            <category.icon className="h-7 w-7" />
                                                        </div>
                                                        <div>
                                                            <h3 className="text-xl font-semibold">{category.title}</h3>
                                                            <p className="text-white/80 text-sm mt-1">
                                                                {categorySubcats.length} подраздела
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <CardContent className="p-6">
                                                    <p className="text-muted-foreground mb-4">
                                                        {category.description}
                                                    </p>

                                                    {/* Subcategories */}
                                                    <div className="space-y-2 mb-4">
                                                        {categorySubcats.map((sub) => (
                                                            <div key={sub.id} className="flex items-center gap-2 text-sm">
                                                                <div className={`h-1.5 w-1.5 rounded-full ${category.id === 'engineering' ? 'bg-orange-500' : 'bg-purple-500'}`} />
                                                                {sub.title}
                                                            </div>
                                                        ))}
                                                    </div>

                                                    <div className={`flex items-center text-sm font-medium ${category.id === 'engineering' ? 'text-orange-500' : 'text-purple-500'}`}>
                                                        Смотреть уроки
                                                        <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </Container>
            </Section>

            {/* Popular Lessons */}
            <Section className="bg-muted/30">
                <Container>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                            Популярные уроки
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Самые просматриваемые материалы
                        </p>
                    </div>

                    {loading ? (
                        <div className="text-center text-muted-foreground">Загрузка...</div>
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {popularLessons.map((lesson, index) => (
                                <LessonCard key={lesson.id} lesson={lesson} index={index} />
                            ))}
                        </div>
                    )}
                </Container>
            </Section>
        </>
    );
}

export default function LessonsPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Загрузка...</div>}>
            <LessonsPageContent />
        </Suspense>
    );
}