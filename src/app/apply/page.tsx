"use client";

import { motion } from "framer-motion";
import { Calendar, Users, CheckCircle, ExternalLink, Clock, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { siteSettings } from "@/lib/data";
import { formatDate, isPast } from "@/lib/utils";

const requirements = [
    "Возраст от 14 до 18 лет",
    "Интерес к робототехнике и технологиям",
    "Готовность учиться и работать в команде",
    "Возможность посещать тренировки 2-3 раза в неделю",
    "Базовые знания математики и физики (желательно)",
];

const process = [
    {
        step: "1",
        title: "Заполните форму",
        description: "Расскажите о себе и своём опыте",
    },
    {
        step: "2",
        title: "Собеседование",
        description: "Короткая встреча с капитаном команды",
    },
    {
        step: "3",
        title: "Пробный период",
        description: "2 недели участия в тренировках",
    },
    {
        step: "4",
        title: "Вступление",
        description: "Официальное присоединение к команде",
    },
];

export default function ApplyPage() {
    const isDeadlinePassed = siteSettings.application_deadline
        ? isPast(siteSettings.application_deadline)
        : false;
    const isOpen = siteSettings.application_open && !isDeadlinePassed;

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
                            variant={isOpen ? "success" : "danger"}
                            className="mb-4 text-sm"
                        >
                            {isOpen ? "✅ Набор открыт" : "❌ Набор закрыт"}
                        </Badge>
                        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                            Присоединиться к команде
                        </h1>
                        <p className="mt-6 text-lg text-muted-foreground">
                            Станьте частью FIRST Uzbekistan и начните свой путь в робототехнике
                        </p>
                    </motion.div>
                </Container>
            </Section>

            {/* Status & Application */}
            <Section>
                <Container size="sm">
                    <div className="grid gap-8 md:grid-cols-2">
                        {/* Status Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <Card>
                                <CardContent className="p-6">
                                    <h2 className="text-xl font-semibold mb-4">Статус набора</h2>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`h-3 w-3 rounded-full ${isOpen ? "bg-green-500" : "bg-red-500"}`} />
                                            <span>{isOpen ? "Приём заявок открыт" : "Приём заявок закрыт"}</span>
                                        </div>
                                        {siteSettings.application_deadline && (
                                            <div className="flex items-center gap-3 text-muted-foreground">
                                                <Calendar className="h-5 w-5" />
                                                <span>Дедлайн: {formatDate(siteSettings.application_deadline)}</span>
                                            </div>
                                        )}
                                        {siteSettings.spots_remaining !== null && (
                                            <div className="flex items-center gap-3 text-muted-foreground">
                                                <Users className="h-5 w-5" />
                                                <span>Осталось мест: {siteSettings.spots_remaining}</span>
                                            </div>
                                        )}
                                    </div>
                                    {isOpen ? (
                                        <Button asChild className="w-full mt-6" size="lg">
                                            <a
                                                href={siteSettings.application_form_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Подать заявку
                                                <ExternalLink className="ml-2 h-4 w-4" />
                                            </a>
                                        </Button>
                                    ) : (
                                        <div className="mt-6 p-4 rounded-lg bg-muted text-center">
                                            <p className="text-sm text-muted-foreground">
                                                Набор временно закрыт. Следите за объявлениями!
                                            </p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Requirements Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <Card>
                                <CardContent className="p-6">
                                    <h2 className="text-xl font-semibold mb-4">Требования</h2>
                                    <ul className="space-y-3">
                                        {requirements.map((req, index) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                                                <span className="text-muted-foreground">{req}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </Container>
            </Section>

            {/* Process */}
            <Section className="bg-muted/30">
                <Container size="sm">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl font-bold sm:text-3xl">Процесс отбора</h2>
                        <p className="mt-2 text-muted-foreground">
                            4 простых шага до вступления в команду
                        </p>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {process.map((item, index) => (
                            <motion.div
                                key={item.step}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card>
                                    <CardContent className="p-6 text-center">
                                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-ftc-red text-xl font-bold text-white">
                                            {item.step}
                                        </div>
                                        <h3 className="font-semibold mb-2">{item.title}</h3>
                                        <p className="text-sm text-muted-foreground">
                                            {item.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* FAQ */}
            <Section>
                <Container size="sm">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-4">Есть вопросы?</h2>
                        <p className="text-muted-foreground mb-8">
                            Свяжитесь с нами любым удобным способом
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Button asChild variant="outline">
                                <a href="mailto:teshabayevmakhkambek@gmail.com">
                                    <Mail className="mr-2 h-4 w-4" />
                                    Email
                                </a>
                            </Button>
                            <Button asChild variant="outline">
                                <a href="https://t.me/firstuzbekistan" target="_blank" rel="noopener noreferrer">
                                    <Send className="mr-2 h-4 w-4" />
                                    Telegram
                                </a>
                            </Button>
                        </div>
                    </div>
                </Container>
            </Section>
        </>
    );
}