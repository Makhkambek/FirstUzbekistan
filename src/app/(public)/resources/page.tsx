"use client";

import { Suspense, useEffect, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Package, FileCode, BookOpen, ArrowRight, Blocks, Trophy } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Program = 'ftc' | 'fll';

// FTC Resources
const ftcResourceCategories = [
    // Engineering Resources
    {
        id: "cads",
        title: "CAD Модели",
        description: "Готовые 3D модели механизмов: intake, lift, drivetrain и других деталей робота",
        icon: Package,
        href: "/resources/cads?program=ftc",
        gradient: "from-orange-500 to-orange-600",
        category: "engineering",
    },
    {
        id: "tools",
        title: "Инженерные калькуляторы",
        description: "Gear ratio, belt/chain length, распределение веса и другие расчетные инструменты",
        icon: () => (
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
        ),
        href: "/resources/tools?program=ftc",
        gradient: "from-blue-500 to-blue-600",
        category: "engineering",
    },
    {
        id: "guides",
        title: "Технические гайды",
        description: "Build guides, выбор материалов, инструкции по сборке и best practices",
        icon: () => (
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
        ),
        href: "/resources/guides?program=ftc",
        gradient: "from-green-500 to-green-600",
        category: "engineering",
    },

    // Programming Resources
    {
        id: "code",
        title: "Шаблоны кода",
        description: "TeleOp, Autonomous режимы и базовые структуры проектов для FTC SDK",
        icon: FileCode,
        href: "/resources/code?program=ftc",
        gradient: "from-purple-500 to-purple-600",
        category: "programming",
    },
    {
        id: "ml",
        title: "ML & Computer Vision",
        description: "Наша ML модель для PedroPathing, AprilTag детекция и TensorFlow для FTC",
        icon: () => (
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
        ),
        href: "/resources/ml?program=ftc",
        gradient: "from-pink-500 to-pink-600",
        category: "programming",
    },
    {
        id: "libraries",
        title: "Библиотеки и утилиты",
        description: "RoadRunner, PID контроллеры и проверенные библиотеки FTC сообщества",
        icon: () => (
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
        ),
        href: "/resources/libraries?program=ftc",
        gradient: "from-indigo-500 to-indigo-600",
        category: "programming",
    },
];

// FLL Resources
const fllResourceCategories = [
    // Engineering Resources
    {
        id: "spike-prime",
        title: "SPIKE Prime Набор",
        description: "Официальные инструкции и модели LEGO Education SPIKE Prime",
        icon: Blocks,
        href: "/resources/cads?program=fll",
        gradient: "from-yellow-500 to-yellow-600",
        category: "engineering",
    },
    {
        id: "building",
        title: "Инструкции по сборке",
        description: "Примеры роботов и навесного оборудования для FLL Challenge",
        icon: () => (
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
        ),
        href: "/resources/guides?program=fll",
        gradient: "from-blue-500 to-blue-600",
        category: "engineering",
    },
    {
        id: "game-guides",
        title: "Игровые гайды",
        description: "Правила, стратегии и решения миссий FLL Challenge",
        icon: Trophy,
        href: "/resources/guides?program=fll",
        gradient: "from-green-500 to-green-600",
        category: "engineering",
    },

    // Programming Resources
    {
        id: "spike-tutorials",
        title: "SPIKE App Туториалы",
        description: "Официальные уроки блочного программирования SPIKE Prime",
        icon: Blocks,
        href: "/resources/code?program=fll",
        gradient: "from-yellow-500 to-yellow-600",
        category: "programming",
    },
    {
        id: "python-spike",
        title: "Python для SPIKE",
        description: "Продвинутое программирование SPIKE Prime на Python",
        icon: FileCode,
        href: "/resources/code?program=fll",
        gradient: "from-blue-500 to-blue-600",
        category: "programming",
    },
    {
        id: "sensors",
        title: "Работа с датчиками",
        description: "Гайды по использованию датчиков SPIKE Prime",
        icon: () => (
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
        href: "/resources/code?program=fll",
        gradient: "from-green-500 to-green-600",
        category: "programming",
    },
];

function ResourcesPageContent() {
    const searchParams = useSearchParams();
    const program = (searchParams.get('program') as Program) || 'ftc';

    const resourceCategories = program === 'ftc' ? ftcResourceCategories : fllResourceCategories;
    const engineeringResources = resourceCategories.filter(r => r.category === "engineering");
    const programmingResources = resourceCategories.filter(r => r.category === "programming");

    // Scroll to top when component mounts or program changes - useLayoutEffect runs before paint
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    }, [program]);

    return (
        <>
            {/* Hero */}
            <Section className="bg-muted/30 py-16 md:py-24">
                <Container size="sm">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
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
                                <>
                                    <BookOpen className="mr-1 h-3 w-3" />
                                    FIRST Tech Challenge
                                </>
                            ) : (
                                <>
                                    <Blocks className="mr-1 h-3 w-3" />
                                    FIRST LEGO League
                                </>
                            )}
                        </Badge>

                        {/* Program Toggle */}
                        <div className="flex items-center justify-center gap-2 mb-6">
                            <Link href="/resources?program=ftc">
                                <Button
                                    variant={program === 'ftc' ? 'default' : 'outline'}
                                    className={cn(
                                        program === 'ftc' && "bg-ftc-red hover:bg-ftc-red/90"
                                    )}
                                >
                                    FTC
                                </Button>
                            </Link>
                            <Link href="/resources?program=fll">
                                <Button
                                    variant={program === 'fll' ? 'default' : 'outline'}
                                    className={cn(
                                        program === 'fll' && "bg-yellow-500 hover:bg-yellow-500/90"
                                    )}
                                >
                                    FLL
                                </Button>
                            </Link>
                        </div>

                        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                            Ресурсы
                        </h1>
                        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                            {program === 'ftc'
                                ? "CAD модели, инструменты, шаблоны кода и библиотеки для создания FTC робота"
                                : "SPIKE Prime модели, туториалы и гайды для FLL робота"
                            }
                        </p>
                    </motion.div>
                </Container>
            </Section>

            {/* Engineering Resources */}
            <Section>
                <Container>
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-2">Инженерия</h2>
                        <p className="text-muted-foreground">
                            {program === 'ftc'
                                ? "Ресурсы для проектирования и сборки робота"
                                : "LEGO модели и инструкции для конструирования робота"
                            }
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        {engineeringResources.map((resource, index) => (
                            <motion.div
                                key={resource.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link href={resource.href}>
                                    <Card className="group h-full hover:shadow-lg transition-all duration-300 overflow-hidden">
                                        <div className={`bg-gradient-to-r ${resource.gradient} p-6 text-white`}>
                                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 mb-3">
                                                <resource.icon />
                                            </div>
                                            <h3 className="text-lg font-semibold">{resource.title}</h3>
                                        </div>

                                        <CardContent className="p-5">
                                            <p className="text-sm text-muted-foreground mb-4">
                                                {resource.description}
                                            </p>
                                            <span className="inline-flex items-center text-sm font-medium text-orange-600">
                                                Перейти
                                                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                            </span>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* Programming Resources */}
            <Section className="bg-muted/30">
                <Container>
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-2">Программирование</h2>
                        <p className="text-muted-foreground">
                            {program === 'ftc'
                                ? "Код, ML модели и библиотеки для управления роботом"
                                : "Блочное программирование, Python и работа с датчиками SPIKE Prime"
                            }
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        {programmingResources.map((resource, index) => (
                            <motion.div
                                key={resource.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link href={resource.href}>
                                    <Card className="group h-full hover:shadow-lg transition-all duration-300 overflow-hidden">
                                        <div className={`bg-gradient-to-r ${resource.gradient} p-6 text-white`}>
                                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 mb-3">
                                                <resource.icon />
                                            </div>
                                            <h3 className="text-lg font-semibold">{resource.title}</h3>
                                        </div>

                                        <CardContent className="p-5">
                                            <p className="text-sm text-muted-foreground mb-4">
                                                {resource.description}
                                            </p>
                                            <span className="inline-flex items-center text-sm font-medium text-purple-600">
                                                Перейти
                                                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                            </span>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </Container>
            </Section>
        </>
    );
}

export default function ResourcesPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Загрузка...</div>}>
            <ResourcesPageContent />
        </Suspense>
    );
}