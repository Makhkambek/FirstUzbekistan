"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Code, Calendar, Blocks } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ResourceCard } from "@/components/features/resource-card";
import { getResourcesByCategory, getAvailableYears } from "@/lib/supabase-data";
import type { Database } from "@/types/database";
import { cn } from "@/lib/utils";

type Resource = Database['public']['Tables']['resources']['Row'];
type Program = 'ftc' | 'fll';

function CodeResourcesPageContent() {
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
            const [resourcesData, yearsData] = await Promise.all([
                getResourcesByCategory('code', selectedYear || undefined, program),
                getAvailableYears('programming'),
            ]);
            setResources(resourcesData);
            setYears(yearsData);
            setLoading(false);
        }
        fetchData();
    }, [selectedYear, program]);

    return (
        <>
            {/* Hero */}
            <Section className="bg-gradient-to-br from-programming-500/10 to-programming-600/5 py-16 md:py-24">
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
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-programming-500 text-white">
                                <Code className="h-8 w-8" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                                    Код и шаблоны
                                </h1>
                                <p className="mt-1 text-muted-foreground">
                                    {program === 'ftc'
                                        ? "Примеры кода и шаблоны для FTC SDK"
                                        : "Примеры блочного программирования для SPIKE Prime"
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
                {loading ? (
                    <div className="text-center text-muted-foreground">Загрузка...</div>
                ) : resources.length === 0 ? (
                    <div className="text-center text-muted-foreground">
                        Ресурсы не найдены
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {resources.map((resource, index) => (
                            <ResourceCard key={resource.id} resource={resource} index={index} />
                        ))}
                    </div>
                )}
            </Section>
        </>
    );
}

export default function CodeResourcesPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Загрузка...</div>}>
            <CodeResourcesPageContent />
        </Suspense>
    );
}