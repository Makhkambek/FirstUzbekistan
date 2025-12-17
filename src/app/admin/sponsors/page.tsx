"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/admin/data-table";
import { createClient } from "@/lib/supabase/client";
import { getTierLabel } from "@/lib/utils";
import type { Database } from "@/types/database";

type Sponsor = Database['public']['Tables']['sponsors']['Row'];

const supabase = createClient();

export default function AdminSponsorsPage() {
    const [sponsors, setSponsors] = useState<Sponsor[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSponsors();
    }, []);

    async function fetchSponsors() {
        const { data } = await supabase
            .from("sponsors")
            .select("*")
            .order("order", { ascending: true });
        setSponsors(data || []);
        setLoading(false);
    }

    async function handleDelete(sponsor: Sponsor) {
        if (!confirm(`Удалить спонсора "${sponsor.name}"?`)) return;

        const { error } = await supabase
            .from("sponsors")
            .delete()
            .eq("id", sponsor.id);

        if (error) {
            alert("Ошибка при удалении: " + error.message);
        } else {
            fetchSponsors();
        }
    }

    const columns = [
        {
            key: "name",
            label: "Название",
            render: (item: Sponsor) => (
                <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground line-clamp-1">{item.description}</p>
                </div>
            ),
        },
        {
            key: "tier",
            label: "Уровень",
            render: (item: Sponsor) => (
                <Badge variant="outline">{getTierLabel(item.tier)}</Badge>
            ),
        },
        {
            key: "is_active",
            label: "Статус",
            render: (item: Sponsor) => (
                <Badge variant={item.is_active ? "success" : "secondary"}>
                    {item.is_active ? "Активен" : "Скрыт"}
                </Badge>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Спонсоры</h1>
                <p className="text-muted-foreground mt-2">
                    Управление спонсорами и партнёрами
                </p>
            </div>

            <DataTable
                title="Все спонсоры"
                data={sponsors}
                columns={columns}
                onDelete={handleDelete}
                editHref={(sponsor) => `/admin/sponsors/${sponsor.id}`}
                newHref="/admin/sponsors/new"
                loading={loading}
                emptyMessage="Нет спонсоров"
            />
        </div>
    );
}