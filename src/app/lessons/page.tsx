"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Wrench, Code, ArrowRight, BookOpen } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LessonCard } from "@/components/features/lesson-card";
import { getSubcategoriesByCategory, getPopularLessons } from "@/lib/data";

const categories = [
    {
        id: "engineering",
        title: "Инженерия",
        description: "CAD моделирование, механика, прототипирование и конструирование роботов",
        icon: Wrench,
        href: "/lessons/engineering",
        color: "engineering",
        gradient: "from-engineering-500 to-engineering-600",
    },
    {
        id: "programming",
        title: "Программирование",
        description: "FTC SDK, TeleOp управление, автономные системы и датчики",
        icon: Code,
        href: "/lessons/programming",
        color: "programming",
        gradient: "from-programming-500 to-programming-600",
    },
];

export default function LessonsPage() {
    const popularLessons = getPopularLessons(6);

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
                            Бесплатные образовательные материалы по робототехнике для участников
                            FIRST Tech Challenge
                        </p>
                    </motion.div>
                </Container>
            </Section>

            {/* Categories */}
            <Section>
                <SectionHeader title="Направления обучения" />
                <div className="grid gap-6 md:grid-cols-2">
                    {categories.map((category, index) => {
                        const subcategories = getSubcategoriesByCategory(category.id as "engineering" | "programming");

                        return (
                            <motion.div
                                key={category.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link href={category.href}>
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
                                                        {subcategories.length} подраздела
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
                                                {subcategories.map((sub) => (
                                                    <div key={sub.id} className="flex items-center gap-2 text-sm">
                                                        <div className={`h-1.5 w-1.5 rounded-full bg-${category.color}-500`} />
                                                        {sub.title}
                                                    </div>
                                                ))}
                                            </div>

                                            <div className={`flex items-center text-sm font-medium text-${category.color}-500`}>
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
            </Section>

            {/* Popular Lessons */}
            <Section className="bg-muted/30">
                <SectionHeader
                    title="Популярные уроки"
                    description="Самые просматриваемые материалы"
                />
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {popularLessons.map((lesson, index) => (
                        <LessonCard key={lesson.id} lesson={lesson} index={index} />
                    ))}
                </div>
            </Section>
        </>
    );
}