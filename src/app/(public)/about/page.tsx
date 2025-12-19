"use client";

import { useEffect, useLayoutEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Users, History, Heart, Trophy, Target, Rocket } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BentoGrid, BentoItem } from "@/components/features/bento-grid";

const aboutLinks = [
    {
        title: "История команды",
        description: "Узнайте, как всё начиналось и куда мы движемся",
        href: "/about/history",
        icon: History,
    },
    {
        title: "Наша команда",
        description: "Познакомьтесь с участниками FIRST Uzbekistan",
        href: "/about/team",
        icon: Users,
    },
    {
        title: "Спонсоры",
        description: "Компании и организации, поддерживающие нас",
        href: "/about/sponsors",
        icon: Heart,
    },
];

const values = [
    {
        title: "Инновации",
        description: "Мы создаём уникальные инженерные решения и не боимся экспериментировать.",
        icon: Rocket,
    },
    {
        title: "Командная работа",
        description: "Успех достигается только совместными усилиями всей команды.",
        icon: Users,
    },
    {
        title: "Профессионализм",
        description: "Мы стремимся к высочайшему качеству в каждой детали.",
        icon: Target,
    },
    {
        title: "Gracious Professionalism",
        description: "Основной принцип FIRST — уважение к соперникам и честная игра.",
        icon: Trophy,
    },
];

export default function AboutPage() {
    // Scroll to top when component mounts - useLayoutEffect runs before paint
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    }, []);

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
                        <Badge className="mb-4">О нас</Badge>
                        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                            О команде
                        </h1>
                        <p className="mt-6 text-lg text-muted-foreground">
                            FIRST Uzbekistan — это команда энтузиастов, объединённых страстью
                            к робототехнике и инновациям. Мы представляем Узбекистан на
                            международных соревнованиях FIRST Tech Challenge.
                        </p>
                    </motion.div>
                </Container>
            </Section>

            {/* Quick Links */}
            <Section>
                <div className="grid gap-6 md:grid-cols-3">
                    {aboutLinks.map((item, index) => (
                        <motion.div
                            key={item.href}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link href={item.href}>
                                <Card className="group h-full hover:shadow-lg hover:border-ftc-red/50 transition-all duration-300">
                                    <CardContent className="p-6">
                                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-ftc-red/10 text-ftc-red group-hover:bg-ftc-red group-hover:text-white transition-colors">
                                            <item.icon className="h-6 w-6" />
                                        </div>
                                        <h3 className="font-semibold group-hover:text-ftc-red transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="mt-2 text-sm text-muted-foreground">
                                            {item.description}
                                        </p>
                                        <div className="mt-4 flex items-center text-sm text-ftc-red">
                                            Подробнее
                                            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </Section>

            {/* Mission */}
            <Section className="bg-gradient-to-br from-ftc-red/10 via-transparent to-ftc-blue/10">
                <SectionHeader
                    title="Наша миссия"
                    description="Что движет нами каждый день"
                />
                <div className="mx-auto max-w-3xl">
                    <Card className="border-2">
                        <CardContent className="p-8 text-center">
                            <p className="text-lg leading-relaxed">
                                Мы стремимся <strong className="text-ftc-red">вдохновлять молодёжь Узбекистана</strong> на
                                изучение науки, технологий, инженерии и математики (STEM) через
                                практический опыт в робототехнике. Наша цель — воспитать следующее
                                поколение <strong className="text-ftc-blue">инженеров, изобретателей и лидеров</strong>,
                                которые будут решать глобальные вызовы будущего.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </Section>

            {/* Values */}
            <Section>
                <SectionHeader
                    title="Наши ценности"
                    description="Принципы, которыми мы руководствуемся"
                />
                <BentoGrid>
                    {values.map((value, index) => (
                        <BentoItem key={value.title} {...value} index={index} />
                    ))}
                </BentoGrid>
            </Section>

            {/* Stats */}
            <Section className="bg-muted/30">
                <div className="grid gap-8 md:grid-cols-4 text-center">
                    {[
                        { label: "Лет опыта", value: "3+" },
                        { label: "Участников", value: "15+" },
                        { label: "Видеоуроков", value: "12" },
                        { label: "Соревнований", value: "5" },
                    ].map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="text-4xl font-bold text-ftc-red mb-2">
                                {stat.value}
                            </div>
                            <div className="text-sm text-muted-foreground">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Section>
        </>
    );
}