"use client";

import { motion } from "framer-motion";
import { Blocks, Users, Trophy, Rocket, Calendar, Star } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function FLLPage() {
  return (
    <>
      {/* Hero Section */}
      <Section className="bg-gradient-to-br from-yellow-500/10 via-transparent to-orange-500/10">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="mb-4">4-16 лет (3 категории)</Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              FIRST LEGO League
            </h1>
            <p className="mt-6 text-lg text-muted-foreground md:text-xl">
              Международная образовательная программа по робототехнике для детей и подростков,
              использующая наборы LEGO Education для развития STEM-навыков через практическое обучение.
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
                  <Blocks className="h-5 w-5 text-yellow-500" />
                  О соревновании
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  FIRST LEGO League состоит из трёх возрастных дивизионов, каждый из которых
                  развивает STEM-навыки через практическое обучение с роботами LEGO.
                </p>
                <p>
                  <strong>FLL Discover</strong> (4-6 лет): Введение в STEM и робототехнику через игровое обучение.
                </p>
                <p>
                  <strong>FLL Explore</strong> (6-10 лет): Командная работа над проектом и создание
                  простой модели с механизацией.
                </p>
                <p>
                  <strong>FLL Challenge</strong> (9-16 лет): Соревновательный формат с роботом,
                  выполняющим миссии на игровом поле, плюс исследовательский проект и презентация.
                  Используются наборы LEGO Education SPIKE Prime или Mindstorms EV3.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-orange-500" />
                  Требования к команде
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Размер команды (Challenge)</h4>
                  <p className="text-muted-foreground">2-10 участников, рекомендуется 6-10</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Возраст (Challenge)</h4>
                  <p className="text-muted-foreground">9-16 лет (4-8 классы на начало сезона)</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Наставники</h4>
                  <p className="text-muted-foreground">Минимум 2 взрослых тренера (18+ лет)</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Оборудование</h4>
                  <p className="text-muted-foreground">LEGO Education SPIKE Prime или Mindstorms EV3</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Components */}
      <Section className="bg-muted/30">
        <SectionHeader
          title="Компоненты соревнования"
          description="Три части FLL Challenge"
        />
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Blocks,
                title: "Robot Game",
                description: "Программирование робота для выполнения миссий на игровом поле за 2.5 минуты"
              },
              {
                icon: Rocket,
                title: "Innovation Project",
                description: "Исследование проблемы и разработка инновационного решения"
              },
              {
                icon: Star,
                title: "Core Values",
                description: "Демонстрация командной работы, открытий и уважения"
              },
            ].map((component, index) => (
              <motion.div
                key={component.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <component.icon className="h-12 w-12 text-yellow-500 mb-4" />
                    <h3 className="font-semibold mb-2 text-lg">{component.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {component.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Skills */}
      <Section>
        <SectionHeader
          title="Что изучат дети"
          description="Навыки и знания через FLL"
        />
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Программирование",
                description: "Блочное программирование на основе Scratch"
              },
              {
                title: "Инженерия",
                description: "Конструирование и механика с LEGO"
              },
              {
                title: "Исследования",
                description: "Научный метод и критическое мышление"
              },
              {
                title: "Презентации",
                description: "Публичные выступления и коммуникация"
              },
              {
                title: "Командная работа",
                description: "Сотрудничество и распределение ролей"
              },
              {
                title: "Креативность",
                description: "Творческое решение проблем"
              },
              {
                title: "Стратегия",
                description: "Планирование и принятие решений"
              },
              {
                title: "Уверенность",
                description: "Самооценка и лидерские качества"
              },
            ].map((skill, index) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-2">{skill.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {skill.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Season Timeline */}
      <Section className="bg-muted/30">
        <SectionHeader
          title="Структура сезона"
          description="Как проходит сезон FLL"
        />
        <Container>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                phase: "Август",
                title: "Объявление темы",
                description: "Публикация темы сезона и игрового поля"
              },
              {
                phase: "Сентябрь-Ноябрь",
                title: "Подготовка",
                description: "Разработка робота, исследовательский проект, тренировки"
              },
              {
                phase: "Декабрь-Январь",
                title: "Региональные турниры",
                description: "Квалификационные соревнования"
              },
              {
                phase: "Февраль-Апрель",
                title: "Финалы",
                description: "Национальные и мировые чемпионаты"
              },
            ].map((item, index) => (
              <motion.div
                key={item.phase}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="flex gap-4 items-start pt-6">
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 rounded-full bg-yellow-500/10 flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-yellow-500" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-yellow-600 mb-1">{item.phase}</div>
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
      <Section className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white">
        <Container>
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">
                Начните путь в робототехнике!
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
                FLL — идеальная стартовая площадка для юных инженеров и программистов.
                Узнайте, как создать команду!
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-yellow-600 hover:bg-white/90"
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
