"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  ClipboardCheck,
  ShoppingCart,
  FileCheck,
  Calendar,
  Globe,
  Mail,
  DollarSign,
  BookOpen,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function StartTeamPage() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);
  const steps = [
    {
      number: 1,
      title: "Определите программу",
      icon: ClipboardCheck,
      description: "Выберите программу FIRST в зависимости от возраста участников",
      details: [
        "FLL Discover (4-6 лет) — игровое знакомство с робототехникой",
        "FLL Explore (6-10 лет) — командные проекты с LEGO",
        "FLL Challenge (9-16 лет) — соревновательная робототехника",
        "FTC (12-18 лет) — продвинутая робототехника и инженерия",
        "FGC (14-18 лет) — национальная команда, отбор через организаторов"
      ],
      important: "Возраст участников определяется на начало учебного года/сезона"
    },
    {
      number: 2,
      title: "Найдите наставников",
      icon: Users,
      description: "Минимум 2 взрослых наставника (18+) обязательны для всех программ",
      details: [
        "Наставники могут быть учителями, родителями, инженерами, студентами",
        "Не требуется опыт в робототехнике — можно учиться вместе с детьми",
        "Оба наставника должны пройти Youth Protection Program (YPP) — бесплатный онлайн-курс",
        "Рекомендуется 1 наставник на 5-7 участников команды",
        "Наставники несут ответственность за безопасность и благополучие детей"
      ],
      important: "YPP обязателен и должен обновляться ежегодно"
    },
    {
      number: 3,
      title: "Соберите команду",
      icon: Users,
      description: "Наберите участников подходящего возраста",
      details: [
        "FLL Challenge: 2-10 участников (рекомендуется 6-10)",
        "FTC: минимум 2, рекомендуется 10-15 участников",
        "Разнообразие навыков: инженерия, программирование, дизайн, маркетинг",
        "Можно набирать из школы, секций, онлайн-объявлений",
        "Важна мотивация участников, а не начальный уровень навыков"
      ],
      important: "Все участники должны соответствовать возрастным требованиям на начало сезона"
    },
    {
      number: 4,
      title: "Найдите организацию-спонсора",
      icon: FileCheck,
      description: "Команда должна быть аффилирована с официальной организацией",
      details: [
        "Школа, лицей, гимназия",
        "Образовательный центр или учреждение дополнительного образования",
        "Некоммерческая организация",
        "Общественная организация",
        "Музей или библиотека",
        "Организация предоставляет юридическую и финансовую поддержку"
      ],
      important: "Без организации-спонсора невозможна официальная регистрация"
    },
    {
      number: 5,
      title: "Найдите помещение",
      icon: Globe,
      description: "Обеспечьте пространство для встреч и работы команды",
      details: [
        "Минимум 20-30 м² для FLL, 40-60 м² для FTC",
        "Столы для сборки, стеллажи для хранения",
        "Доступ к электричеству и интернету",
        "Возможность встреч минимум 2 раза в неделю по 2-3 часа",
        "Может быть школьный класс, гараж, арендованное помещение"
      ],
      important: "Помещение должно быть безопасным и доступным для всех участников"
    },
    {
      number: 6,
      title: "Рассчитайте бюджет",
      icon: DollarSign,
      description: "Подготовьте финансовый план на сезон",
      costs: {
        fll: [
          "LEGO Education SPIKE Prime набор: $330-400",
          "Игровое поле и миссии (Challenge Set): $75",
          "Дополнительные детали: $50-100",
          "Итого на первый год: ~$455-575"
        ],
        ftc: [
          "Starter Kit (базовый набор деталей): $250-350",
          "Контроллер и моторы: $400-600",
          "Дополнительные детали и материалы: $500-1500",
          "Поле для тренировок (опционально): $100-300",
          "Итого на первый год: ~$1250-2750+"
        ]
      },
      details: [
        "Роботы и детали можно использовать несколько лет",
        "Ищите спонсоров: местные компании, гранты, краудфандинг"
      ],
      important: "FGC предоставляет набор роботов бесплатно для национальных команд"
    },
    {
      number: 7,
      title: "Зарегистрируйте команду",
      icon: FileCheck,
      description: "Официальная регистрация на сайте FIRST",
      details: [
        "Создайте аккаунт на firstinspires.org",
        "Зарегистрируйте организацию-спонсора (если еще не зарегистрирована)",
        "Зарегистрируйте команду и получите номер (Team Number)",
        "Зарегистрируйте всех наставников с прохождением YPP",
        "Добавьте всех участников в команду"
      ],
      links: [
        { text: "FIRST Inspires", url: "https://www.firstinspires.org" },
        { text: "Регистрация команды FLL", url: "https://www.firstlegoleague.org/season" },
        { text: "Регистрация команды FTC", url: "https://www.firstinspires.org/robotics/ftc/start-a-team" }
      ],
      important: "Регистрация открывается обычно в мае-июне на следующий сезон"
    },
    {
      number: 8,
      title: "Закупите оборудование",
      icon: ShoppingCart,
      description: "Приобретите необходимое оборудование и наборы",
      details: [
        "Для FLL: LEGO Education SPIKE Prime или EV3 через официальных дистрибьюторов",
        "Для FTC: детали через AndyMark, REV Robotics, goBILDA, Pitsco",
        "Игровые поля: через FIRST или местных производителей",
        "Инструменты: отвертки, ключи, дрель (для FTC)",
        "Компьютеры для программирования (можно использовать существующие)"
      ],
      links: [
        { text: "AndyMark (FTC)", url: "https://www.andymark.com" },
        { text: "REV Robotics (FTC)", url: "https://www.revrobotics.com" },
        { text: "LEGO Education", url: "https://education.lego.com" }
      ],
      important: "Заказывайте заранее — доставка может занять 4-8 недель"
    },
    {
      number: 9,
      title: "Изучите правила сезона",
      icon: BookOpen,
      description: "Ознакомьтесь с игрой и правилами текущего сезона",
      details: [
        "Игра объявляется в августе-сентябре каждого года",
        "Game Manual содержит все правила и требования",
        "Изучите миссии (FLL) или задачи (FTC)",
        "Посмотрите видео Kick-Off и аниме-ролики игры",
        "Разработайте стратегию команды"
      ],
      links: [
        { text: "FLL Season Info", url: "https://www.firstlegoleague.org/season" },
        { text: "FTC Game & Season Info", url: "https://www.firstinspires.org/robotics/ftc/game-and-season-info" }
      ],
      important: "Правила меняются каждый год — внимательно изучайте новый Game Manual"
    },
    {
      number: 10,
      title: "Найдите турнир",
      icon: Calendar,
      description: "Зарегистрируйтесь на квалификационный турнир",
      details: [
        "Турниры проводятся региональными партнерами FIRST",
        "Обычно проходят с декабря по март",
        "Регистрация на турнир открывается осенью",
        "Стоимость участия в турнире: обычно $100-200",
        "Можно участвовать в нескольких турнирах за сезон"
      ],
      important: "В Узбекистане пока нет официальных региональных турниров — возможен выезд в соседние страны"
    },
    {
      number: 11,
      title: "Подготовка и тренировки",
      icon: CheckCircle2,
      description: "Регулярные встречи и подготовка к соревнованиям",
      details: [
        "Рекомендуется встречаться 2-3 раза в неделю по 2-3 часа",
        "Разделите команду на подгруппы: инженерия, программирование, бизнес, аутрич",
        "Документируйте процесс для Engineering Notebook / Project",
        "Тестируйте робота на игровом поле",
        "Готовьте презентации для судей",
        "Развивайте командную работу и Core Values"
      ],
      important: "Процесс важнее результата — акцент на обучении и командной работе"
    }
  ];

  return (
    <>
      {/* Hero */}
      <Section className="bg-gradient-to-br from-ftc-red/10 via-transparent to-ftc-blue/10">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Как создать свою FIRST команду
            </h1>
            <p className="mt-6 text-lg text-muted-foreground md:text-xl">
              Пошаговое руководство по организации команды FIRST в Узбекистане
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              <Badge variant="outline">FLL Challenge</Badge>
              <Badge variant="outline">FTC</Badge>
              <Badge variant="outline">FGC</Badge>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Important Notice */}
      <Section className="bg-muted/30">
        <Container>
          <Card className="border-yellow-500/50 bg-yellow-500/5">
            <CardContent className="pt-6">
              <div className="flex gap-4 items-start">
                <AlertCircle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Важно знать</h3>
                  <p className="text-sm text-muted-foreground">
                    Эта инструкция применима для FLL Challenge и FTC. Для FIRST Global Challenge
                    формат отличается — это национальная команда с отбором через организаторов.
                    Свяжитесь с нами для информации об участии в FGC.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Container>
      </Section>

      {/* Steps */}
      <Section>
        <Container>
          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 h-12 w-12 rounded-full bg-ftc-red/10 flex items-center justify-center">
                        <step.icon className="h-6 w-6 text-ftc-red" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-muted-foreground mb-1">Шаг {step.number}</div>
                        <CardTitle className="text-2xl">{step.title}</CardTitle>
                        <p className="text-muted-foreground mt-2">{step.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      {step.details.map((detail, i) => (
                        <li key={i} className="flex gap-2 items-start">
                          <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{detail}</span>
                        </li>
                      ))}
                    </ul>

                    {step.costs && (
                      <div className="space-y-4 mt-6">
                        <div>
                          <h4 className="font-semibold mb-2">💰 Бюджет FLL Challenge:</h4>
                          <ul className="space-y-1 text-sm">
                            {step.costs.fll.map((cost, i) => (
                              <li key={i} className="text-muted-foreground">• {cost}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">💰 Бюджет FTC:</h4>
                          <ul className="space-y-1 text-sm">
                            {step.costs.ftc.map((cost, i) => (
                              <li key={i} className="text-muted-foreground">• {cost}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    {step.links && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {step.links.map((link, i) => (
                          <Button key={i} asChild variant="outline" size="sm">
                            <a href={link.url} target="_blank" rel="noopener noreferrer">
                              <Globe className="h-4 w-4 mr-2" />
                              {link.text}
                            </a>
                          </Button>
                        ))}
                      </div>
                    )}

                    {step.important && (
                      <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                        <p className="text-sm font-medium text-blue-700 dark:text-blue-400">
                          ⚠️ {step.important}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Resources */}
      <Section className="bg-muted/30">
        <SectionHeader
          title="Полезные ресурсы"
          description="Официальные источники информации"
        />
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "FIRST Inspires",
                description: "Главный сайт всех программ FIRST",
                url: "https://www.firstinspires.org"
              },
              {
                title: "FIRST LEGO League",
                description: "Официальный сайт FLL",
                url: "https://www.firstlegoleague.org"
              },
              {
                title: "FTC Resources",
                description: "Ресурсы для команд FTC",
                url: "https://www.firstinspires.org/robotics/ftc"
              },
              {
                title: "Youth Protection",
                description: "Обучение для наставников (обязательно)",
                url: "https://www.firstinspires.org/resource-library/youth-protection-policy"
              },
              {
                title: "Team Management",
                description: "Управление командой на FIRST Dashboard",
                url: "https://my.firstinspires.org"
              },
              {
                title: "Grants & Funding",
                description: "Гранты и финансирование для команд",
                url: "https://www.firstinspires.org/ways-to-help/fundraise"
              }
            ].map((resource, index) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <Globe className="h-8 w-8 text-ftc-blue mb-3" />
                    <h3 className="font-semibold mb-2">{resource.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {resource.description}
                    </p>
                    <Button asChild variant="outline" size="sm" className="w-full">
                      <a href={resource.url} target="_blank" rel="noopener noreferrer">
                        Перейти
                      </a>
                    </Button>
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
                Нужна помощь?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
                Мы готовы помочь с организацией вашей команды в Узбекистане.
                Свяжитесь с нами для консультации!
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-ftc-red hover:bg-white/90"
                >
                  <Link href="/about">
                    Связаться с нами
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
