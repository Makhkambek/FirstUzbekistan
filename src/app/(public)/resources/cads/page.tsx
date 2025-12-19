"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Wrench, Calendar, Blocks } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ResourceCard } from "@/components/features/resource-card";
import { getResourcesByCategory, getAvailableYearsForCategory } from "@/lib/supabase-data";
import type { Database } from "@/types/database";
import { cn } from "@/lib/utils";

type Resource = Database['public']['Tables']['resources']['Row'];
type Program = 'ftc' | 'fll';

function CadsResourcesPageContent() {
    const searchParams = useSearchParams();
    const program = (searchParams.get('program') as Program) || 'ftc';

    const [resources, setResources] = useState<Resource[]>([]);
    const [years, setYears] = useState<number[]>([]);
    const [selectedYear, setSelectedYear] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    // Scroll to top when component mounts or program changes
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [program]);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const [resourcesData, yearsData] = await Promise.all([
                getResourcesByCategory('cad', selectedYear || undefined, program),
                getAvailableYearsForCategory('cad'),
            ]);
            console.log('CAD Resources loaded:', resourcesData.length);
            setResources(resourcesData);
            setYears(yearsData);
            setLoading(false);
        }
        fetchData();
    }, [selectedYear, program]);

    return (
        <>
            {/* Hero */}
            <Section className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 py-16 md:py-24">
                <Container>
                    <Link
                        href="/resources"
                        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Все ресурсы
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Badge
                            className={cn(
                                "mb-4",
                                program === 'ftc'
                                    ? "bg-ftc-red hover:bg-ftc-red text-white"
                                    : "bg-yellow-500 hover:bg-yellow-500 text-white"
                            )}
                        >
                            {program === 'ftc' ? (
                                "FIRST Tech Challenge"
                            ) : (
                                <>
                                    <Blocks className="mr-1 h-3 w-3" />
                                    FIRST LEGO League
                                </>
                            )}
                        </Badge>

                        <div className="flex items-center gap-4">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-500 text-white">
                                <Wrench className="h-8 w-8" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                                    CAD Модели
                                </h1>
                                <p className="mt-1 text-muted-foreground">
                                    {program === 'ftc'
                                        ? "3D модели для вашего FTC робота"
                                        : "LEGO модели и строительные инструкции для FLL"
                                    }
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </Container>
            </Section>

            {/* Filters */}
            <Section className="py-8 border-b border-border">
                <Container>
                    <div className="flex items-center gap-4 flex-wrap">
                        <span className="text-sm font-medium flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            Год:
                        </span>
                        <Button
                            variant={selectedYear === null ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedYear(null)}
                        >
                            Все
                        </Button>
                        {years.map((year) => (
                            <Button
                                key={year}
                                variant={selectedYear === year ? "default" : "outline"}
                                size="sm"
                                onClick={() => setSelectedYear(year)}
                            >
                                {year}
                            </Button>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* Resources Grid */}
            <Section>
                <Container>
                    {loading ? (
                        <div className="text-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-4"></div>
                            <p className="text-muted-foreground">Загрузка...</p>
                        </div>
                    ) : resources.length === 0 ? (
                        <div className="text-center py-12">
                            <Wrench className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-lg font-medium mb-2">Ресурсы не найдены</h3>
                            <p className="text-muted-foreground">
                                {selectedYear
                                    ? `Нет CAD моделей за ${selectedYear} год`
                                    : "CAD модели пока не добавлены"}
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {resources.map((resource, index) => (
                                <ResourceCard key={resource.id} resource={resource} index={index} />
                            ))}
                        </div>
                    )}
                </Container>
            </Section>
        </>
    );
}

export default function CadsResourcesPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Загрузка...</div>}>
            <CadsResourcesPageContent />
        </Suspense>
    );
}