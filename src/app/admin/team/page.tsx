"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import { getRoleLabel, getInitials } from "@/lib/utils";
import { Plus, Pencil, Trash2, GripVertical } from "lucide-react";
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

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Команда</h1>
                    <p className="text-muted-foreground mt-2">
                        Управление участниками команды ({members.length})
                    </p>
                </div>
                <Button asChild>
                    <Link href="/admin/team/new">
                        <Plus className="mr-2 h-4 w-4" />
                        Добавить
                    </Link>
                </Button>
            </div>

            {/* Content */}
            {loading ? (
                <div className="text-center py-12 text-muted-foreground">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                    Загрузка...
                </div>
            ) : members.length === 0 ? (
                <Card>
                    <CardContent className="text-center py-12">
                        <p className="text-muted-foreground mb-4">Нет участников</p>
                        <Button asChild>
                            <Link href="/admin/team/new">
                                <Plus className="mr-2 h-4 w-4" />
                                Добавить первого участника
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {members.map((member) => (
                        <Card
                            key={member.id}
                            className={`relative overflow-hidden transition-all hover:shadow-lg ${!member.is_active ? 'opacity-60' : ''
                                }`}
                        >
                            {/* Order badge */}
                            <div className="absolute top-3 left-3 flex items-center gap-1 text-xs text-muted-foreground bg-background/80 backdrop-blur px-2 py-1 rounded">
                                <GripVertical className="h-3 w-3" />
                                #{member.order}
                            </div>

                            {/* Status badge */}
                            <div className="absolute top-3 right-3">
                                <Badge variant={member.is_active ? "success" : "secondary"} className="text-xs">
                                    {member.is_active ? "Активен" : "Скрыт"}
                                </Badge>
                            </div>

                            <CardContent className="pt-12 pb-6">
                                {/* Avatar */}
                                <div className="flex justify-center mb-4">
                                    <div className="h-24 w-24 rounded-full overflow-hidden bg-muted ring-4 ring-border shadow-lg">
                                        {member.image_url ? (
                                            <img
                                                src={member.image_url}
                                                alt={member.name}
                                                className="h-full w-full object-cover"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.style.display = 'none';
                                                    if (target.nextElementSibling) {
                                                        (target.nextElementSibling as HTMLElement).style.display = 'flex';
                                                    }
                                                }}
                                            />
                                        ) : null}
                                        <div
                                            className={`h-full w-full items-center justify-center bg-gradient-to-br from-ftc-red to-ftc-blue text-white text-2xl font-bold ${member.image_url ? 'hidden' : 'flex'}`}
                                        >
                                            {getInitials(member.name)}
                                        </div>
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="text-center space-y-2">
                                    <Badge variant="outline" className="mb-1">
                                        {getRoleLabel(member.role)}
                                    </Badge>
                                    <h3 className="font-semibold text-lg">{member.name}</h3>
                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                        {member.bio}
                                    </p>
                                </div>

                                {/* Actions */}
                                <div className="flex justify-center gap-2 mt-6">
                                    <Button asChild variant="outline" size="sm">
                                        <Link href={`/admin/team/${member.id}`}>
                                            <Pencil className="h-4 w-4 mr-1" />
                                            Изменить
                                        </Link>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleDelete(member)}
                                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}