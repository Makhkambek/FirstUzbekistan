"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, Eye, Play } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Database } from "@/types/database";

type Lesson = Database['public']['Tables']['lessons']['Row'];

interface LessonCardProps {
    lesson: Lesson;
    index?: number;
}

const difficultyColors = {
    beginner: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    intermediate: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    advanced: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const difficultyLabels = {
    beginner: "Начальный",
    intermediate: "Средний",
    advanced: "Продвинутый",
};

export function LessonCard({ lesson, index = 0 }: LessonCardProps) {
    const lessonUrl = `/lessons/${lesson.category}/${lesson.slug}`;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
        >
            <Link href={lessonUrl}>
                <Card className="group h-full overflow-hidden hover:shadow-lg transition-all duration-300">
                    {/* Thumbnail */}
                    <div className="relative aspect-video overflow-hidden bg-muted">
                        {lesson.thumbnail_url ? (
                            <>
                                <img
                                    src={lesson.thumbnail_url}
                                    alt={lesson.title}
                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                {/* Play overlay */}
                                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="bg-ftc-red rounded-full p-4">
                                        <Play className="h-8 w-8 text-white fill-white" />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex h-full items-center justify-center bg-gradient-to-br from-muted to-muted/50">
                                <Play className="h-12 w-12 text-muted-foreground" />
                            </div>
                        )}
                        <div className="absolute top-3 right-3">
                            <Badge className={difficultyColors[lesson.difficulty]}>
                                {difficultyLabels[lesson.difficulty]}
                            </Badge>
                        </div>
                    </div>

                    <CardContent className="p-5">
                        {/* Title */}
                        <h3 className="font-semibold text-lg mb-2 group-hover:text-ftc-red transition-colors line-clamp-2">
                            {lesson.title}
                        </h3>

                        {/* Description */}
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                            {lesson.description}
                        </p>

                        {/* Meta */}
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {lesson.duration}
                            </span>
                            <span className="flex items-center gap-1">
                                <Eye className="h-3 w-3" />
                                {lesson.views} просмотров
                            </span>
                        </div>
                    </CardContent>
                </Card>
            </Link>
        </motion.div>
    );
}