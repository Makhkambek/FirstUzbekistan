"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Video, Bell, Users, Heart, TrendingUp, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalLessons: 0,
        publishedLessons: 0,
        totalViews: 0,
        activeAnnouncements: 0,
        teamMembers: 0,
        sponsors: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            const [lessons, announcements, team, sponsors] = await Promise.all([
                supabase.from("lessons").select("views, status"),
                supabase.from("announcements").select("is_active"),
                supabase.from("team_members").select("is_active"),
                supabase.from("sponsors").select("is_active"),
            ]);

            const totalViews = lessons.data?.reduce((sum, lesson) => sum + (lesson.views || 0), 0) || 0;
            const publishedCount = lessons.data?.filter(l => l.status === "published").length || 0;

            setStats({
                totalLessons: lessons.data?.length || 0,
                publishedLessons: publishedCount,
                totalViews,
                activeAnnouncements: announcements.data?.filter(a => a.is_active).length || 0,
                teamMembers: team.data?.filter(t => t.is_active).length || 0,
                sponsors: sponsors.data?.filter(s => s.is_active).length || 0,
            });
            setLoading(false);
        }
        fetchStats();
    }, []);

    const cards = [
        {
            title: "Всего уроков",
            value: stats.totalLessons,
            description: `${stats.publishedLessons} опубликовано`,
            icon: Video,
            color: "text-blue-500",
        },
        {
            title: "Просмотры",
            value: stats.totalViews.toLocaleString(),
            description: "Всего просмотров",
            icon: Eye,
            color: "text-green-500",
        },
        {
            title: "Объявления",
            value: stats.activeAnnouncements,
            description: "Активных объявлений",
            icon: Bell,
            color: "text-yellow-500",
        },
        {
            title: "Команда",
            value: stats.teamMembers,
            description: "Активных участников",
            icon: Users,
            color: "text-purple-500",
        },
        {
            title: "Спонсоры",
            value: stats.sponsors,
            description: "Активных спонсоров",
            icon: Heart,
            color: "text-red-500",
        },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground mt-2">
                    Обзор статистики FIRST Uzbekistan CMS
                </p>
            </div>

            {/* Stats Grid */}
            {loading ? (
                <div className="text-center text-muted-foreground">Загрузка...</div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {cards.map((card, index) => (
                        <motion.div
                            key={card.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium text-muted-foreground">
                                        {card.title}
                                    </CardTitle>
                                    <card.icon className={`h-5 w-5 ${card.color}`} />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold">{card.value}</div>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {card.description}
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Quick Actions */}
            <Card>
                <CardHeader>
                    <CardTitle>Быстрые действия</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <a
                            href="/admin/lessons"
                            className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-accent transition-colors"
                        >
                            <Video className="h-5 w-5 text-ftc-red" />
                            <div>
                                <p className="font-medium">Управление уроками</p>
                                <p className="text-sm text-muted-foreground">
                                    Добавить или редактировать
                                </p>
                            </div>
                        </a>
                        <a
                            href="/admin/announcements"
                            className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-accent transition-colors"
                        >
                            <Bell className="h-5 w-5 text-ftc-red" />
                            <div>
                                <p className="font-medium">Объявления</p>
                                <p className="text-sm text-muted-foreground">
                                    Управление новостями
                                </p>
                            </div>
                        </a>
                        <a
                            href="/admin/settings"
                            className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-accent transition-colors"
                        >
                            <TrendingUp className="h-5 w-5 text-ftc-red" />
                            <div>
                                <p className="font-medium">Настройки набора</p>
                                <p className="text-sm text-muted-foreground">
                                    Статус заявок
                                </p>
                            </div>
                        </a>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}