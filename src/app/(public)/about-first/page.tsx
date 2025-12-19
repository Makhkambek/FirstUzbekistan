"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Globe,
  Users,
  Trophy,
  Heart,
  Rocket,
  GraduationCap,
  Target,
  Sparkles,
  TrendingUp,
  Award,
  Handshake,
  Star,
  Cog
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutFirstPage() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

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
            <Badge className="mb-4">For Inspiration and Recognition of Science and Technology</Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Что такое FIRST?
            </h1>
            <p className="mt-6 text-lg text-muted-foreground md:text-xl">
              FIRST — это глобальная некоммерческая организация, которая вдохновляет молодых людей
              стать лидерами в области науки и технологий через увлекательные программы по робототехнике.
            </p>
          </motion.div>
        </Container>
      </Section>

      {/* History */}
      <Section>
        <Container>
          <div className="grid gap-6 lg:grid-cols-2 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4">История FIRST</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong className="text-foreground">FIRST</strong> (For Inspiration and Recognition of Science and Technology)
                  была основана в 1989 году изобретателем и предпринимателем <strong className="text-foreground">Дином Кейменом</strong>.
                </p>
                <p>
                  Дин Кеймен — известный американский изобретатель (создатель Segway и современных инфузионных
                  насосов), который осознал, что общество превозносит спортивных звёзд, но не уделяет должного
                  внимания молодым учёным и инженерам.
                </p>
                <p>
                  Его видение — создать "спорт для ума", где наука, технологии, инженерия и математика будут
                  так же захватывающими и престижными, как и традиционные виды спорта.
                </p>
                <p>
                  За более чем <strong className="text-foreground">35 лет</strong> FIRST выросла в глобальное
                  движение, охватывающее миллионы студентов по всему миру.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-ftc-blue/50 bg-ftc-blue/5">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Award className="h-6 w-6 text-ftc-blue flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold mb-1">1989</h3>
                        <p className="text-sm text-muted-foreground">
                          Основание FIRST Дином Кейменом и Вудом Флауэрсом
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Trophy className="h-6 w-6 text-ftc-blue flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold mb-1">1992</h3>
                        <p className="text-sm text-muted-foreground">
                          Первые соревнования FIRST Robotics Competition (FRC)
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users className="h-6 w-6 text-ftc-blue flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold mb-1">1998</h3>
                        <p className="text-sm text-muted-foreground">
                          Запуск FIRST LEGO League в партнерстве с LEGO Education
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Rocket className="h-6 w-6 text-ftc-blue flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold mb-1">2005</h3>
                        <p className="text-sm text-muted-foreground">
                          Создание FIRST Tech Challenge для средней школы
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Globe className="h-6 w-6 text-ftc-blue flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold mb-1">2017</h3>
                        <p className="text-sm text-muted-foreground">
                          Запуск FIRST Global Challenge — международная олимпиада
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Mission & Values */}
      <Section className="bg-muted/30">
        <SectionHeader
          title="Миссия и ценности"
          description="Что движет FIRST"
        />
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-ftc-red/50">
                <CardHeader>
                  <Target className="h-10 w-10 text-ftc-red mb-2" />
                  <CardTitle>Миссия FIRST</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Вдохновлять молодых людей стать лидерами в науке и технологиях, вовлекая их
                    в увлекательные программы наставничества, которые развивают STEM навыки,
                    вдохновляют на инновации и формируют навыки будущего — включая уверенность
                    в себе, коммуникацию и лидерство.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="h-full border-ftc-blue/50">
                <CardHeader>
                  <Handshake className="h-10 w-10 text-ftc-blue mb-2" />
                  <CardTitle>Gracious Professionalism®</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Это краеугольный камень философии FIRST. Это означает:
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li className="flex gap-2">
                      <Star className="h-4 w-4 text-ftc-blue flex-shrink-0 mt-0.5" />
                      <span>Уважение к другим, даже в конкуренции</span>
                    </li>
                    <li className="flex gap-2">
                      <Star className="h-4 w-4 text-ftc-blue flex-shrink-0 mt-0.5" />
                      <span>Высокое качество работы</span>
                    </li>
                    <li className="flex gap-2">
                      <Star className="h-4 w-4 text-ftc-blue flex-shrink-0 mt-0.5" />
                      <span>Честность и целостность</span>
                    </li>
                    <li className="flex gap-2">
                      <Star className="h-4 w-4 text-ftc-blue flex-shrink-0 mt-0.5" />
                      <span>Доброжелательное отношение</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="h-full border-yellow-500/50">
                <CardHeader>
                  <Heart className="h-10 w-10 text-yellow-500 mb-2" />
                  <CardTitle>Coopertition®</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Уникальное слово, объединяющее cooperation (сотрудничество) и competition (конкуренция):
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li className="flex gap-2">
                      <Star className="h-4 w-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                      <span>Команды помогают друг другу</span>
                    </li>
                    <li className="flex gap-2">
                      <Star className="h-4 w-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                      <span>Делятся знаниями и деталями</span>
                    </li>
                    <li className="flex gap-2">
                      <Star className="h-4 w-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                      <span>Соревнуются с уважением</span>
                    </li>
                    <li className="flex gap-2">
                      <Star className="h-4 w-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                      <span>Победа команды — это хорошо, но помощь другим — еще лучше</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Programs Overview */}
      <Section>
        <SectionHeader
          title="Программы FIRST"
          description="Для каждого возраста свой уровень"
        />
        <Container>
          <div className="space-y-6">
            {[
              {
                name: "FIRST LEGO League Discover",
                age: "4-6 лет",
                description: "Игровое введение в STEM через наборы LEGO",
                color: "from-purple-500 to-pink-500",
                available: false
              },
              {
                name: "FIRST LEGO League Explore",
                age: "6-10 лет",
                description: "Командные проекты с LEGO и базовой механизацией",
                color: "from-blue-500 to-purple-500",
                available: false
              },
              {
                name: "FIRST LEGO League Challenge",
                age: "9-16 лет",
                description: "Соревновательная робототехника с LEGO, роботы выполняют миссии на поле",
                color: "from-yellow-500 to-orange-500",
                link: "/competitions/fll",
                available: true
              },
              {
                name: "FIRST Tech Challenge",
                age: "12-18 лет",
                description: "Продвинутая робототехника с металлическими деталями, программирование на Java/Kotlin",
                color: "from-ftc-red to-ftc-blue",
                link: "/competitions/ftc",
                available: true
              },
              {
                name: "FIRST Robotics Competition",
                age: "14-18 лет",
                description: "Высший уровень: промышленные роботы весом до 60 кг, профессиональные инструменты",
                color: "from-blue-600 to-cyan-600",
                available: false
              },
              {
                name: "FIRST Global Challenge",
                age: "14-18 лет",
                description: "Международная олимпиада — одна национальная команда от каждой страны",
                color: "from-green-500 to-blue-500",
                link: "/competitions/fgc",
                available: true
              },
            ].map((program, index) => (
              <motion.div
                key={program.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${program.color}`} />
                  <CardContent className="pt-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg">{program.name}</h3>
                          <Badge variant="outline">{program.age}</Badge>
                          {program.available && (
                            <Badge className="bg-green-500">Доступно в UZ</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{program.description}</p>
                      </div>
                      {program.link && (
                        <Button asChild>
                          <Link href={program.link}>Подробнее</Link>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Global Impact */}
      <Section className="bg-muted/30">
        <SectionHeader
          title="Глобальное влияние"
          description="FIRST по всему миру"
        />
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Globe,
                number: "110+",
                label: "Стран",
                description: "По всему миру"
              },
              {
                icon: Users,
                number: "679,000+",
                label: "Участников",
                description: "В сезоне 2023-24"
              },
              {
                icon: Trophy,
                number: "87,000+",
                label: "Команд",
                description: "Активных команд"
              },
              {
                icon: GraduationCap,
                number: "3M+",
                label: "Выпускников",
                description: "Alumni программ FIRST"
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <stat.icon className="h-10 w-10 text-ftc-red mx-auto mb-3" />
                    <div className="text-3xl font-bold mb-1">{stat.number}</div>
                    <div className="font-semibold mb-1">{stat.label}</div>
                    <div className="text-sm text-muted-foreground">{stat.description}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Alumni Success */}
      <Section>
        <SectionHeader
          title="Успех выпускников"
          description="Куда идут участники FIRST"
        />
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <TrendingUp className="h-10 w-10 text-ftc-blue mb-2" />
                <CardTitle>Образование и карьера</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <Sparkles className="h-5 w-5 text-ftc-blue flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">88%</strong> выпускников FIRST поступают в университеты
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Sparkles className="h-5 w-5 text-ftc-blue flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">90%</strong> выбирают STEM специальности
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Sparkles className="h-5 w-5 text-ftc-blue flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">3x</strong> выше вероятность выбрать инженерную карьеру
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Sparkles className="h-5 w-5 text-ftc-blue flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    Выпускники работают в <strong className="text-foreground">NASA, SpaceX, Google, Apple, Microsoft</strong> и других ведущих компаниях
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <GraduationCap className="h-10 w-10 text-ftc-red mb-2" />
                <CardTitle>Топовые университеты</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  Выпускники FIRST поступают в лучшие университеты мира:
                </p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-ftc-red" />
                    <span>MIT (Massachusetts Institute of Technology)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-ftc-red" />
                    <span>Stanford University</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-ftc-red" />
                    <span>Carnegie Mellon University</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-ftc-red" />
                    <span>Georgia Institute of Technology</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-ftc-red" />
                    <span>UC Berkeley</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-ftc-red" />
                    <span>Caltech</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-ftc-red" />
                    <span>Cornell University</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Rocket className="h-10 w-10 text-yellow-500 mb-2" />
                <CardTitle>Навыки и ценности</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <Star className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    Развитие лидерских качеств и уверенности в себе
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Star className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    Навыки командной работы и коммуникации
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Star className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    Критическое мышление и решение проблем
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Star className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    Ценности служения обществу и помощи другим
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Corporate Partners */}
      <Section className="bg-muted/30">
        <SectionHeader
          title="Партнёры и спонсоры"
          description="Ведущие мировые компании поддерживают FIRST"
        />
        <Container>
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground mb-8">
                FIRST поддерживается крупнейшими технологическими, аэрокосмическими и инженерными компаниями мира,
                которые видят в программе источник будущих талантов.
              </p>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <h4 className="font-semibold mb-3 text-sm flex items-center gap-2">
                    <Rocket className="h-4 w-4 text-ftc-blue" />
                    Аэрокосмическая отрасль
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <div className="h-1 w-1 rounded-full bg-ftc-blue" />
                      NASA
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1 w-1 rounded-full bg-ftc-blue" />
                      Boeing
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1 w-1 rounded-full bg-ftc-blue" />
                      Lockheed Martin
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1 w-1 rounded-full bg-ftc-blue" />
                      Raytheon Technologies
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1 w-1 rounded-full bg-ftc-blue" />
                      BAE Systems
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-sm flex items-center gap-2">
                    <Globe className="h-4 w-4 text-ftc-red" />
                    Технологии
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <div className="h-1 w-1 rounded-full bg-ftc-red" />
                      Google
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1 w-1 rounded-full bg-ftc-red" />
                      Qualcomm
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1 w-1 rounded-full bg-ftc-red" />
                      Texas Instruments
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1 w-1 rounded-full bg-ftc-red" />
                      Rockwell Automation
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1 w-1 rounded-full bg-ftc-red" />
                      Battelle
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-sm flex items-center gap-2">
                    <Cog className="h-4 w-4 text-yellow-500" />
                    Инженерное ПО
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <div className="h-1 w-1 rounded-full bg-yellow-500" />
                      Autodesk
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1 w-1 rounded-full bg-yellow-500" />
                      PTC
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1 w-1 rounded-full bg-yellow-500" />
                      Dassault Systèmes
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1 w-1 rounded-full bg-yellow-500" />
                      SOLIDWORKS
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-sm flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-green-500" />
                    Автомобильная промышленность
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <div className="h-1 w-1 rounded-full bg-green-500" />
                      General Motors
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1 w-1 rounded-full bg-green-500" />
                      Ford Motor Company
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1 w-1 rounded-full bg-green-500" />
                      Chevrolet
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1 w-1 rounded-full bg-green-500" />
                      FCA (Fiat Chrysler)
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <p className="text-sm text-center text-muted-foreground">
                  💡 <strong className="text-foreground">Почему это важно:</strong> Эти компании не просто спонсируют соревнования —
                  они активно набирают выпускников FIRST на стажировки и постоянные позиции, признавая ценность
                  опыта участия в программах FIRST.
                </p>
              </div>
            </CardContent>
          </Card>
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
                Станьте частью глобального движения FIRST!
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
                Присоединяйтесь к миллионам студентов по всему миру, которые меняют будущее
                через науку и технологии.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-ftc-red hover:bg-white/90"
                >
                  <Link href="/start-team">
                    Создать команду
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  <Link href="/competitions/ftc">
                    Посмотреть соревнования
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
