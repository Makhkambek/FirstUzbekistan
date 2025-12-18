"use client";

import { motion } from "framer-motion";
import { Globe, Users, Trophy, Lightbulb, Calendar, Award } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function FGCPage() {
  return (
    <>
      {/* Hero Section */}
      <Section className="bg-gradient-to-br from-blue-500/10 via-transparent to-green-500/10">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="mb-4">14-18 лет</Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              FIRST Global Challenge
            </h1>
            <p className="mt-6 text-lg text-muted-foreground md:text-xl">
              Международная олимпиада по робототехнике, где команды из разных стран
              объединяются для решения глобальных проблем человечества.
            </p>
          </motion.div>
        </Container>
      </Section>

      {/* About */}
      <Section>
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-blue-500" />
                  О соревновании
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  FIRST Global Challenge — это ежегодная международная олимпиада по робототехнике,
                  которая объединяет более 190 стран мира на одной площадке.
                </p>
                <p>
                  Каждая страна выставляет одну национальную команду из 5 студентов (14-18 лет)
                  и минимум 2 наставников. Команды собирают роботов из единого набора деталей,
                  предоставленного организаторами.
                </p>
                <p>
                  Тема меняется ежегодно и посвящена глобальным проблемам: водные ресурсы,
                  океаны, энергетика, переработка отходов, изменение климата и другие.
                  Формат включает квалификационные матчи, плей-офф и церемонии награждения.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-500" />
                  Требования к команде
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Размер команды</h4>
                  <p className="text-muted-foreground">Ровно 5 студентов от страны</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Возраст</h4>
                  <p className="text-muted-foreground">14-18 лет на момент соревнований</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Наставники</h4>
                  <p className="text-muted-foreground">Минимум 2 взрослых наставника (18+ лет)</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Формат</h4>
                  <p className="text-muted-foreground">Национальная команда — одна от Узбекистана</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Highlights */}
      <Section className="bg-muted/30">
        <SectionHeader
          title="Особенности FGC"
          description="Что делает это соревнование уникальным"
        />
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Globe,
                title: "190+ стран",
                description: "Представители со всего мира собираются вместе"
              },
              {
                icon: Lightbulb,
                title: "Глобальные проблемы",
                description: "Решение реальных проблем человечества"
              },
              {
                icon: Trophy,
                title: "Олимпийский формат",
                description: "Торжественные церемонии открытия и закрытия"
              },
              {
                icon: Users,
                title: "Культурный обмен",
                description: "Знакомство с культурами разных стран"
              },
              {
                icon: Award,
                title: "Престиж",
                description: "Представление своей страны на мировом уровне"
              },
              {
                icon: Calendar,
                title: "Летний формат",
                description: "Соревнования проходят в августе-сентябре"
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <feature.icon className="h-10 w-10 text-blue-500 mb-4" />
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* How to Participate */}
      <Section>
        <SectionHeader
          title="Как участвовать"
          description="Путь к FIRST Global Challenge"
        />
        <Container>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                step: "1",
                title: "Подать заявку",
                description: "Заполните анкету на нашем сайте и присоединитесь к команде"
              },
              {
                step: "2",
                title: "Отбор в команду",
                description: "Пройдите отборочный процесс и станьте частью сборной Узбекистана"
              },
              {
                step: "3",
                title: "Подготовка",
                description: "Обучение, разработка робота и подготовка к соревнованиям"
              },
              {
                step: "4",
                title: "Соревнования",
                description: "Участие в международной олимпиаде и представление Узбекистана"
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="flex gap-4 items-start pt-6">
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                        <span className="text-xl font-bold text-blue-500">{item.step}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section className="bg-gradient-to-br from-blue-600 to-green-600 text-white">
        <Container>
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">
                Представьте Узбекистан на мировой арене!
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
                Узнайте, как собрать команду и представлять Узбекистан на
                международной олимпиаде FIRST Global Challenge.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-white/90"
                >
                  <Link href="/start-team">
                    Открыть свою команду
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  <Link href="/lessons">
                    Начать обучение
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>
    </>
  );
}
