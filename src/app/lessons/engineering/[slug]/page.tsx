"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Eye, Calendar, PlayCircle, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LessonCard } from "@/components/features/lesson-card";
import {
    getLessonBySlug,
    getLessonsBySubcategory,
    getSubcategoryBySlug,
    lessons
} from "@/lib/data";
import { formatNumber, formatDate, getDifficultyLabel, getYouTubeId } from "@/lib/utils";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default function EngineeringLessonPage({ params }: PageProps) {
    const { slug } = use(params);
    const lesson = getLessonBySlug(slug);

    if (!lesson || lesson.category !== "engineering") {
        notFound();
    }

    const subcategory = lessons.find(l => l.id === lesson.subcategory_id);
    const relatedLessons = getLessonsBySubcategory(lesson.subcategory_id)
        .filter(l => l.id !== lesson.id)
        .slice(0, 3);

    const videoId = getYouTubeId(lesson.video_url);

    const difficultyColors = {
        beginner: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
        intermediate: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
        advanced: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    };

    return (
        <>
            {/* Breadcrumbs */}
            <Section className="py-6 border-b border-border">
                <Container>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Link href="/lessons" className="hover:text-foreground">
                            Уроки
                        </Link>
                        <ChevronRight className="h-4 w-4" />
                        <Link href="/lessons/engineering" className="hover:text-foreground">
                            Инженерия
                        </Link>
                        <ChevronRight className="h-4 w-4" />
                        <span className="text-foreground">{lesson.title}</span>
                    </div>
                </Container>
            </Section>

            {/* Video & Info */}
            <Section className="py-12">
                <Container size="lg">
                    <div className="grid gap-8 lg:grid-cols-3">
                        {/* Video */}
                        <div className="lg:col-span-2">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                {/* Video Player */}
                                <div className="relative aspect-video overflow-hidden rounded-xl bg-black">
                                    {videoId ? (
                                        <iframe
                                            src={`https://www.youtube.com/embed/${videoId}`}
                                            title={lesson.title}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            className="h-full w-full"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center">
                                            <PlayCircle className="h-16 w-16 text-white/50" />
                                        </div>
                                    )}
                                </div>

                                {/* Title & Badges */}
                                <div className="mt-6">
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        <Badge variant="engineering">Инженерия</Badge>
                                        <Badge className={difficultyColors[lesson.difficulty]}>
                                            {getDifficultyLabel(lesson.difficulty)}
                                        </Badge>
                                    </div>
                                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                                        {lesson.title}
                                    </h1>

                                    {/* Meta */}
                                    <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                            <Eye className="h-4 w-4" />
                                            {formatNumber(lesson.views)} просмотров
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="h-4 w-4" />
                                            {lesson.duration}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Calendar className="h-4 w-4" />
                                            {formatDate(lesson.created_at)}
                                        </span>
                                    </div>
                                </div>

                                {/* Description */}
                                <Card className="mt-6">
                                    <CardContent className="p-6">
                                        <h2 className="text-lg font-semibold mb-3">О видео</h2>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {lesson.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-6"
                            >
                                {/* Quick Actions */}
                                <Card>
                                    <CardContent className="p-6">
                                        <h3 className="font-semibold mb-4">Действия</h3>
                                        <div className="space-y-3">
                                            <Button asChild variant="outline" className="w-full justify-start">
                                                <Link href="/lessons/engineering">
                                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                                    Все уроки инженерии
                                                </Link>
                                            </Button>
                                            <Button asChild variant="outline" className="w-full justify-start">
                                                <a
                                                    href={lesson.video_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    Открыть на YouTube
                                                </a>
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Related Lessons */}
                                {relatedLessons.length > 0 && (
                                    <Card>
                                        <CardContent className="p-6">
                                            <h3 className="font-semibold mb-4">Похожие уроки</h3>
                                            <div className="space-y-3">
                                                {relatedLessons.map((related) => (
                                                    <Link
                                                        key={related.id}
                                                        href={`/lessons/engineering/${related.slug}`}
                                                        className="block group"
                                                    >
                                                        <div className="flex gap-3 p-3 rounded-lg hover:bg-accent transition-colors">
                                                            <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded bg-muted">
                                                                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-engineering-500/20 to-engineering-600/20">
                                                                    <PlayCircle className="h-6 w-6 text-muted-foreground/50" />
                                                                </div>
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="font-medium text-sm line-clamp-2 group-hover:text-engineering-500 transition-colors">
                                                                    {related.title}
                                                                </p>
                                                                <p className="text-xs text-muted-foreground mt-1">
                                                                    {related.duration}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}
                            </motion.div>
                        </div>
                    </div>
                </Container>
            </Section>
        </>
    );
}