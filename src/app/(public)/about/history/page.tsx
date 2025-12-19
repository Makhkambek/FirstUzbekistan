"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";

const timeline = [
    {
        year: "2022",
        title: "Основание команды",
        description: "Группа энтузиастов из разных школ Ташкента объединилась, чтобы создать первую FTC команду в Узбекистане. Началась активная подготовка к первому сезону.",
    },
    {
        year: "2023",
        title: "Первые соревнования",
        description: "Участие в региональных соревнованиях FIRST Tech Challenge. Несмотря на новичковый статус, команда показала отличные результаты и получила награду за инновационный дизайн.",
    },
    {
        year: "2024",
        title: "Расширение команды",
        description: "Запуск образовательной платформы с бесплатными видеоуроками. Привлечение новых участников и создание структурированной программы обучения.",
    },
    {
        year: "2025",
        title: "Международный уровень",
        description: "Подготовка к международным соревнованиям и развитие партнёрств с университетами. Планы по созданию FTC сообщества в Центральной Азии.",
    },
];

export default function HistoryPage() {
    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, []);

    return (
        <>
            <Section className="bg-muted/30 py-16 md:py-24">
                <Container size="sm">
                    <Link
                        href="/about"
                        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        О команде
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <Badge className="mb-4">
                            <Calendar className="mr-1 h-3 w-3" />
                            История
                        </Badge>
                        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                            История команды
                        </h1>
                        <p className="mt-6 text-lg text-muted-foreground">
                            Путь FIRST Uzbekistan от идеи до международной команды
                        </p>
                    </motion.div>
                </Container>
            </Section>

            <Section>
                <Container size="sm">
                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border md:left-1/2" />

                        {/* Timeline items */}
                        <div className="space-y-12">
                            {timeline.map((item, index) => (
                                <motion.div
                                    key={item.year}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.2 }}
                                    className={`relative flex items-center ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                        }`}
                                >
                                    {/* Dot */}
                                    <div className="absolute left-4 h-4 w-4 rounded-full border-4 border-background bg-ftc-red md:left-1/2 md:-translate-x-1/2 z-10" />

                                    {/* Content */}
                                    <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                                        }`}>
                                        <div className="rounded-xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
                                            <span className="inline-block text-sm font-semibold text-ftc-red bg-ftc-red/10 px-3 py-1 rounded-full mb-3">
                                                {item.year}
                                            </span>
                                            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                                            <p className="text-muted-foreground">{item.description}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Future */}
            <Section className="bg-gradient-to-br from-ftc-red/10 to-ftc-blue/10">
                <Container size="sm">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <h2 className="text-2xl font-bold sm:text-3xl mb-4">
                            Наше будущее
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Мы продолжаем развиваться, привлекать новых участников и делиться
                            знаниями. Наша цель — создать сильное сообщество робототехников
                            в Центральной Азии и вдохновить тысячи молодых людей на изучение STEM.
                        </p>
                    </motion.div>
                </Container>
            </Section>
        </>
    );
}