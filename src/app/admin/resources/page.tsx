"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/admin/data-table";
import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/types/database";

type Resource = Database['public']['Tables']['resources']['Row'];

const supabase = createClient();

const categoryLabels: Record<string, string> = {
    cad: "CAD",
    code: "Code",
    drawing: "Drawing",
    other: "Other",
};

const typeLabels: Record<string, string> = {
    engineering: "Инженерия",
    programming: "Программирование",
};

export default function AdminResourcesPage() {
    const [resources, setResources] = useState<Resource[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchResources();
    }, []);

    async function fetchResources() {
        const { data } = await supabase
            .from("resources")
            .select("*")
            .order("type")
            .order("year", { ascending: false })
            .order("order");
        setResources(data || []);
        setLoading(false);
    }

    async function handleDelete(resource: Resource) {
        if (!confirm(`Удалить ресурс "${resource.title}"?`)) return;

        const { error } = await supabase
            .from("resources")
            .delete()
            .eq("id", resource.id);

        if (error) {
            alert("Ошибка при удалении: " + error.message);
        } else {
            fetchResources();
        }
    }

    const columns = [
        {
            key: "title",
            label: "Название",
            render: (item: Resource) => (
                <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground line-clamp-1">{item.description}</p>
                </div>
            ),
        },
        {
            key: "type",
            label: "Тип",
            render: (item: Resource) => (
                <Badge variant={item.type === "engineering" ? "outline" : "secondary"}>
                    {typeLabels[item.type]}
                </Badge>
            ),
        },
        {
            key: "category",
            label: "Категория",
            render: (item: Resource) => (
                <Badge variant="outline">{categoryLabels[item.category]}</Badge>
            ),
        },
        {
            key: "year",
            label: "Год",
        },
        {
            key: "is_active",
            label: "Статус",
            render: (item: Resource) => (
                <Badge variant={item.is_active ? "default" : "secondary"}>
                    {item.is_active ? "Активен" : "Скрыт"}
                </Badge>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Ресурсы</h1>
                <p className="text-muted-foreground mt-2">
                    Управление CAD моделями и примерами кода
                </p>
            </div>

            <DataTable
                title="Все ресурсы"
                data={resources}
                columns={columns}
                onDelete={handleDelete}
                editHref={(resource) => `/admin/resources/${resource.id}/edit`}
                newHref="/admin/resources/new"
                loading={loading}
                emptyMessage="Нет ресурсов"
            />
        </div>
    );
}