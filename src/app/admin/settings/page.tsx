"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/types/database";

type SiteSettings = Database['public']['Tables']['site_settings']['Row'];

const supabase = createClient();

export default function AdminSettingsPage() {
    const router = useRouter();
    const [settings, setSettings] = useState<SiteSettings | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchSettings();
    }, []);

    async function fetchSettings() {
        const { data, error } = await supabase
            .from("site_settings")
            .select("*")
            .limit(1)
            .single();

        console.log('Fetched settings:', data, error);
        setSettings(data);
        setLoading(false);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!settings) return;

        setSaving(true);

        const updateData = {
            application_open: settings.application_open,
            application_deadline: settings.application_deadline,
            application_form_url: settings.application_form_url,
            spots_remaining: settings.spots_remaining,
        };

        console.log('Saving settings:', updateData);

        const { data, error } = await supabase
            .from("site_settings")
            .update(updateData)
            .eq("id", settings.id)
            .select()
            .single();

        console.log('Save result:', data, error);

        if (error) {
            alert("Ошибка: " + error.message);
        } else {
            alert("Настройки сохранены!");
            // Обновляем локальное состояние
            if (data) {
                setSettings(data);
            }
            router.refresh();
        }
        setSaving(false);
    }

    if (loading) {
        return <div className="text-center py-12 text-muted-foreground">Загрузка...</div>;
    }

    if (!settings) {
        return <div className="text-center py-12 text-muted-foreground">Настройки не найдены</div>;
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Настройки</h1>
                <p className="text-muted-foreground mt-2">
                    Управление статусом набора и общими настройками
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                            Статус набора
                            <Badge variant={settings.application_open ? "success" : "danger"}>
                                {settings.application_open ? "Открыт" : "Закрыт"}
                            </Badge>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* Application Open */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Набор открыт</label>
                            <select
                                value={settings.application_open ? "true" : "false"}
                                onChange={(e) => {
                                    const newValue = e.target.value === "true";
                                    console.log('Changing application_open to:', newValue);
                                    setSettings(prev => prev ? ({
                                        ...prev,
                                        application_open: newValue
                                    }) : null);
                                }}
                                className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                            >
                                <option value="true">Да - принимаем заявки</option>
                                <option value="false">Нет - набор закрыт</option>
                            </select>
                        </div>

                        {/* Deadline */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Дедлайн</label>
                            <input
                                type="date"
                                value={settings.application_deadline?.split('T')[0] || ""}
                                onChange={(e) => setSettings(prev => prev ? ({
                                    ...prev,
                                    application_deadline: e.target.value || null
                                }) : null)}
                                className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                            />
                        </div>

                        {/* Form URL */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Ссылка на Google Form</label>
                            <input
                                type="url"
                                value={settings.application_form_url}
                                onChange={(e) => setSettings(prev => prev ? ({
                                    ...prev,
                                    application_form_url: e.target.value
                                }) : null)}
                                className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                                required
                            />
                        </div>

                        {/* Spots Remaining */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Осталось мест</label>
                            <input
                                type="number"
                                value={settings.spots_remaining || 0}
                                onChange={(e) => setSettings(prev => prev ? ({
                                    ...prev,
                                    spots_remaining: e.target.value ? parseInt(e.target.value) : null
                                }) : null)}
                                className="w-full px-4 py-2 border border-border rounded-lg bg-background"
                                min="0"
                            />
                        </div>

                        {/* Save */}
                        <div className="pt-4">
                            <Button type="submit" disabled={saving}>
                                {saving ? "Сохранение..." : "Сохранить настройки"}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </div>
    );
}