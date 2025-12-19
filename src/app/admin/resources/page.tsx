"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/admin/data-table";
import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/types/database";
import { cn } from "@/lib/utils";

type Resource = Database['public']['Tables']['resources']['Row'];
type Program = 'ftc' | 'fll' | 'all';

const supabase = createClient();

export const dynamic = 'force-dynamic';

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

const programLabels: Record<string, string> = {
    ftc: "FTC",
    fll: "FLL",
};

export default function AdminResourcesPage() {
    const [selectedProgram, setSelectedProgram] = useState<Program>('all');
    const [resources, setResources] = useState<Resource[]>([]);
    const [allResources, setAllResources] = useState<Resource[]>([]);
    const [ftcCount, setFtcCount] = useState(0);
    const [fllCount, setFllCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAllResources();
    }, []);

    useEffect(() => {
        filterResources();
    }, [selectedProgram, allResources]);

    async function fetchAllResources() {
        setLoading(true);

        // Fetch all resources
        const { data: allData } = await supabase
            .from("resources")
            .select("*")
            .order("type")
            .order("year", { ascending: false })
            .order("order");

        setAllResources(allData || []);

        // Get counts by program
        const { data: ftcData } = await supabase
            .from("resources")
            .select("id")
            .eq('program', 'ftc');

        const { data: fllData } = await supabase
            .from("resources")
            .select("id")
            .eq('program', 'fll');

        setFtcCount(ftcData?.length || 0);
        setFllCount(fllData?.length || 0);

        setLoading(false);
    }

    function filterResources() {
        if (selectedProgram === 'all') {
            setResources(allResources);
            return;
        }

        const filtered = allResources.filter(resource =>
            resource.program === selectedProgram
        );
        setResources(filtered);
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
            fetchAllResources();
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
            key: "program",
            label: "Программа",
            render: (item: Resource) => (
                <Badge variant={item.program === "ftc" ? "destructive" : "default"}>
                    {programLabels[item.program as 'ftc' | 'fll']}
                </Badge>
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

            {/* Filter Tabs */}
            <div className="flex gap-2">
                <Button
                    variant={selectedProgram === 'all' ? 'default' : 'outline'}
                    onClick={() => setSelectedProgram('all')}
                >
                    Все ({allResources.length})
                </Button>
                <Button
                    variant={selectedProgram === 'ftc' ? 'default' : 'outline'}
                    onClick={() => setSelectedProgram('ftc')}
                    className={cn(selectedProgram === 'ftc' && "bg-ftc-red hover:bg-ftc-red/90")}
                >
                    FTC ({ftcCount})
                </Button>
                <Button
                    variant={selectedProgram === 'fll' ? 'default' : 'outline'}
                    onClick={() => setSelectedProgram('fll')}
                    className={cn(selectedProgram === 'fll' && "bg-yellow-500 hover:bg-yellow-500/90")}
                >
                    FLL ({fllCount})
                </Button>
            </div>

            <DataTable
                title={selectedProgram === 'all' ? 'Все ресурсы' : `Ресурсы ${programLabels[selectedProgram]}`}
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