"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/admin/data-table";
import { createClient } from "@/lib/supabase/client";
import { getRoleLabel } from "@/lib/utils";
import type { Database } from "@/types/database";

type TeamMember = Database['public']['Tables']['team_members']['Row'];

const supabase = createClient();

export default function AdminTeamPage() {
    const [members, setMembers] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMembers();
    }, []);

    async function fetchMembers() {
        const { data } = await supabase
            .from("team_members")
            .select("*")
            .order("order", { ascending: true });
        setMembers(data || []);
        setLoading(false);
    }

    async function handleDelete(member: TeamMember) {
        if (!confirm(`Удалить участника "${member.name}"?`)) return;

        const { error } = await supabase
            .from("team_members")
            .delete()
            .eq("id", member.id);

        if (error) {
            alert("Ошибка при удалении: " + error.message);
        } else {
            fetchMembers();
        }
    }

    const columns = [
        {
            key: "name",
            label: "Имя",
            render: (item: TeamMember) => (
                <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground line-clamp-1">{item.bio}</p>
                </div>
            ),
        },
        {
            key: "role",
            label: "Роль",
            render: (item: TeamMember) => (
                <Badge variant="outline">{getRoleLabel(item.role)}</Badge>
            ),
        },
        {
            key: "is_active",
            label: "Статус",
            render: (item: TeamMember) => (
                <Badge variant={item.is_active ? "success" : "secondary"}>
                    {item.is_active ? "Активен" : "Скрыт"}
                </Badge>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Команда</h1>
                <p className="text-muted-foreground mt-2">
                    Управление участниками команды
                </p>
            </div>

            <DataTable
                title="Участники"
                data={members}
                columns={columns}
                onDelete={handleDelete}
                newHref="/admin/team/new"
                loading={loading}
                emptyMessage="Нет участников"
            />
        </div>
    );
}