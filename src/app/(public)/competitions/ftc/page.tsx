"use client";

import { motion } from "framer-motion";
import { Users, Trophy, Cog, Code, Calendar, MapPin, Presentation, Briefcase, BookOpen, Lightbulb } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function FTCPage() {
  return (
    <>
      {/* Hero Section */}
      <Section className="bg-gradient-to-br from-ftc-red/10 via-transparent to-ftc-blue/10">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="mb-4">12-18 лет (7-12 классы)</Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              FIRST Tech Challenge
            </h1>
            <p className="mt-6 text-lg text-muted-foreground md:text-xl">
              Международная программа робототехники для учащихся 7-12 классов,
              где команды проектируют, строят, программируют и управляют роботами в
              соревновательном формате на основе альянсов.
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
                  <Trophy className="h-5 w-5 text-ftc-red" />
                  О соревновании
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  FIRST Tech Challenge (FTC) — это программа робототехники для учащихся
                  7-12 классов (12-18 лет), которая сочетает азарт спорта с наукой и технологиями.
                </p>
                <p>
                  Команды проектируют, конструируют, программируют и управляют роботами размером
                  до 45x45x45 см для выполнения задач на игровом поле 3.6x3.6 метра. Матчи длятся
                  2.5 минуты и проходят в формате альянсов (2 команды против 2 команд).
                </p>
                <p>
                  Роботы строятся из многоразовых деталей (металл, пластик) и программируются
                  на Java, Kotlin или Blocks через Android-устройства.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-ftc-blue" />
                  Требования к команде
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Размер команды</h4>
                  <p className="text-muted-foreground">Минимум 2 участника, рекомендуется 10-15</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Возраст</h4>
                  <p className="text-muted-foreground">12-18 лет (7-12 классы на начало сезона)</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Наставники</h4>
                  <p className="text-muted-foreground">Минимум 2 взрослых наставника (18+ лет)</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Роли</h4>
                  <p className="text-muted-foreground">Инженеры, программисты, драйверы, аутрич, бизнес</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Skills */}
      <Section className="bg-muted/30">
        <SectionHeader
          title="Навыки и компетенции"
          description="Что вы развиваете участвуя в FTC"
        />
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Cog,
                title: "Инженерия",
                description: "CAD моделирование, механика, прототипирование, дизайн"
              },
              {
                icon: Code,
                title: "Программирование",
                description: "Java/Kotlin, Android Studio, Computer Vision, автономные системы"
              },
              {
                icon: Users,
                title: "Командная работа",
                description: "Лидерство, коммуникация, управление проектами, делегирование"
              },
              {
                icon: Trophy,
                title: "Соревнования",
                description: "Стратегия, скаутинг, анализ, работа под давлением"
              },
              {
                icon: Presentation,
                title: "Презентации",
                description: "Публичные выступления, питчинг, защита проекта перед судьями"
              },
              {
                icon: Briefcase,
                title: "Бизнес и Аутрич",
                description: "Фандрайзинг, спонсорство, маркетинг, работа с сообществом"
              },
              {
                icon: BookOpen,
                title: "Документация",
                description: "Engineering Notebook, техническое письмо, портфолио команды"
              },
              {
                icon: Lightbulb,
                title: "Критическое мышление",
                description: "Решение проблем, дебаггинг, анализ данных, принятие решений"
              },
            ].map((skill, index) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <skill.icon className="h-10 w-10 text-ftc-red mb-4" />
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
      <Section>
        <SectionHeader
          title="Структура сезона"
          description="Как проходит сезон FTC"
        />
        <Container>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                phase: "Сентябрь",
                title: "Kick-Off",
                description: "Объявление игры сезона, изучение правил и стратегий"
              },
              {
                phase: "Октябрь-Декабрь",
                title: "Build Season",
                description: "Проектирование и сборка робота, программирование, тестирование"
              },
              {
                phase: "Январь-Февраль",
                title: "Квалификационные турниры",
                description: "Локальные соревнования, отбор на региональные чемпионаты"
              },
              {
                phase: "Март-Апрель",
                title: "Чемпионаты",
                description: "Региональные и мировые финалы"
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
                      <div className="h-12 w-12 rounded-full bg-ftc-red/10 flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-ftc-red" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-ftc-red mb-1">{item.phase}</div>
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
      <Section className="bg-gradient-to-br from-ftc-red to-ftc-blue text-white">
        <Container>
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">
                Готовы создать команду?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
                Узнайте, как зарегистрировать свою команду FTC и начать участие
                в международных соревнованиях!
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-ftc-red hover:bg-white/90"
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
