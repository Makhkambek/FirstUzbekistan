"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/admin/data-table";
import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/types/database";

type Announcement = Database['public']['Tables']['announcements']['Row'];

const supabase = createClient();

export const dynamic = 'force-dynamic';

const typeLabels: Record<string, string> = {
    info: "Инфо",
    warning: "Внимание",
    success: "Успех",
    event: "Событие",
};

export default function AdminAnnouncementsPage() {
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    async function fetchAnnouncements() {
        const { data } = await supabase
            .from("announcements")
            .select("*")
            .order("order");
        setAnnouncements(data || []);
        setLoading(false);
    }

    async function handleDelete(announcement: Announcement) {
        if (!confirm(`Удалить объявление "${announcement.title}"?`)) return;

        const { error } = await supabase
            .from("announcements")
            .delete()
            .eq("id", announcement.id);

        if (error) {
            alert("Ошибка при удалении: " + error.message);
        } else {
            fetchAnnouncements();
        }
    }

    const columns = [
        {
            key: "title",
            label: "Заголовок",
            render: (item: Announcement) => (
                <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground line-clamp-1">{item.content}</p>
                </div>
            ),
        },
        {
            key: "type",
            label: "Тип",
            render: (item: Announcement) => (
                <Badge variant="outline">{typeLabels[item.type]}</Badge>
            ),
        },
        {
            key: "is_active",
            label: "Статус",
            render: (item: Announcement) => (
                <Badge variant={item.is_active ? "default" : "secondary"}>
                    {item.is_active ? "Активно" : "Скрыто"}
                </Badge>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Объявления</h1>
                <p className="text-muted-foreground mt-2">
                    Управление объявлениями на главной странице
                </p>
            </div>

            <DataTable
                title="Все объявления"
                data={announcements}
                columns={columns}
                onDelete={handleDelete}
                editHref={(announcement) => `/admin/announcements/${announcement.id}/edit`}
                newHref="/admin/announcements/new"
                loading={loading}
                emptyMessage="Нет объявлений"
            />
        </div>
    );
}