"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Play, Clock, Eye } from "lucide-react";
import { cn, formatNumber, getDifficultyLabel, getYouTubeThumbnail } from "@/lib/utils";
import { Lesson } from "@/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface LessonCardProps {
    lesson: Lesson;
    index?: number;
}

export function LessonCard({ lesson, index = 0 }: LessonCardProps) {
    const thumbnail = lesson.thumbnail_url || getYouTubeThumbnail(lesson.video_url);
    const categoryVariant = lesson.category === "engineering" ? "engineering" : "programming";

    const difficultyColors = {
        beginner: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
        intermediate: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
        advanced: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
        >
            <Link href={`/lessons/${lesson.category}/${lesson.slug}`}>
                <Card className="group overflow-hidden hover:shadow-lg hover:border-border/80 transition-all duration-300">
                    {/* Thumbnail */}
                    <div className="relative aspect-video overflow-hidden bg-muted">
                        {thumbnail ? (
                            <img
                                src={thumbnail}
                                alt={lesson.title}
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                        ) : (
                            <div className={cn(
                                "h-full w-full flex items-center justify-center",
                                lesson.category === "engineering"
                                    ? "bg-gradient-to-br from-engineering-500/20 to-engineering-600/20"
                                    : "bg-gradient-to-br from-programming-500/20 to-programming-600/20"
                            )}>
                                <Play className="h-12 w-12 text-muted-foreground/50" />
                            </div>
                        )}

                        {/* Play overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                            <div className={cn(
                                "rounded-full p-4",
                                lesson.category === "engineering" ? "bg-engineering-500" : "bg-programming-500"
                            )}>
                                <Play className="h-6 w-6 text-white" fill="white" />
                            </div>
                        </div>

                        {/* Duration badge */}
                        <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded bg-black/80 px-2 py-1 text-xs text-white">
                            <Clock className="h-3 w-3" />
                            {lesson.duration}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                        {/* Badges */}
                        <div className="mb-2 flex flex-wrap gap-2">
                            <Badge variant={categoryVariant}>
                                {lesson.category === "engineering" ? "Инженерия" : "Программирование"}
                            </Badge>
                            <Badge className={difficultyColors[lesson.difficulty]}>
                                {getDifficultyLabel(lesson.difficulty)}
                            </Badge>
                        </div>

                        {/* Title */}
                        <h3 className="font-semibold line-clamp-2 group-hover:text-ftc-red transition-colors">
                            {lesson.title}
                        </h3>

                        {/* Description */}
                        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                            {lesson.description}
                        </p>

                        {/* Stats */}
                        <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                                <Eye className="h-3 w-3" />
                                {formatNumber(lesson.views)} просмотров
                            </span>
                        </div>
                    </div>
                </Card>
            </Link>
        </motion.div>
    );
}