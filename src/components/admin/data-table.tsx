"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { Pencil, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Column<T> {
    key: keyof T | string;
    label: string;
    render?: (item: T) => ReactNode;
}

interface DataTableProps<T> {
    title: string;
    data: T[];
    columns: Column<T>[];
    onEdit?: (item: T) => void;
    onDelete?: (item: T) => void;
    editHref?: (item: T) => string;
    newHref?: string;
    loading?: boolean;
    emptyMessage?: string;
}

export function DataTable<T extends { id: string }>({
    title,
    data,
    columns,
    onEdit,
    onDelete,
    editHref,
    newHref,
    loading = false,
    emptyMessage = "Нет данных",
}: DataTableProps<T>) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{title}</CardTitle>
                {newHref && (
                    <Button asChild>
                        <Link href={newHref}>
                            <Plus className="mr-2 h-4 w-4" />
                            Добавить
                        </Link>
                    </Button>
                )}
            </CardHeader>
            <CardContent>
                {loading ? (
                    <div className="text-center py-8 text-muted-foreground">Загрузка...</div>
                ) : data.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">{emptyMessage}</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-border">
                                    {columns.map((column) => (
                                        <th
                                            key={String(column.key)}
                                            className="text-left p-4 font-medium text-muted-foreground"
                                        >
                                            {column.label}
                                        </th>
                                    ))}
                                    {(onEdit || onDelete || editHref) && (
                                        <th className="text-right p-4 font-medium text-muted-foreground">
                                            Действия
                                        </th>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item) => (
                                    <tr key={item.id} className="border-b border-border hover:bg-accent/50">
                                        {columns.map((column) => (
                                            <td key={String(column.key)} className="p-4">
                                                {column.render
                                                    ? column.render(item)
                                                    : String(item[column.key as keyof T] || "-")}
                                            </td>
                                        ))}
                                        {(onEdit || onDelete || editHref) && (
                                            <td className="p-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    {editHref && (
                                                        <Button asChild variant="outline" size="sm">
                                                            <Link href={editHref(item)}>
                                                                <Pencil className="h-4 w-4" />
                                                            </Link>
                                                        </Button>
                                                    )}
                                                    {onEdit && (
                                                        <Button
                                                            onClick={() => onEdit(item)}
                                                            variant="outline"
                                                            size="sm"
                                                        >
                                                            <Pencil className="h-4 w-4" />
                                                        </Button>
                                                    )}
                                                    {onDelete && (
                                                        <Button
                                                            onClick={() => onDelete(item)}
                                                            variant="outline"
                                                            size="sm"
                                                            className="text-red-500 hover:text-red-600"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    )}
                                                </div>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}