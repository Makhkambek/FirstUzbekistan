"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Wrench, Code, Trophy, Users, Rocket, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BentoGrid, BentoItem } from "@/components/features/bento-grid";
import { LessonCard } from "@/components/features/lesson-card";
import { getPopularLessons, getActiveAnnouncements } from "@/lib/data";

const features = [
  {
    title: "Инженерия",
    description: "Изучайте CAD, механику и прототипирование для создания роботов.",
    icon: Wrench,
  },
  {
    title: "Программирование",
    description: "Осваивайте Java/Kotlin для FTC SDK, TeleOp и автономных систем.",
    icon: Code,
  },
  {
    title: "Соревнования",
    description: "Участвуйте в международных турнирах FIRST Tech Challenge.",
    icon: Trophy,
  },
  {
    title: "Командная работа",
    description: "Развивайте навыки сотрудничества и лидерства.",
    icon: Users,
  },
  {
    title: "Инновации",
    description: "Создавайте уникальные решения для реальных инженерных задач.",
    icon: Rocket,
  },
  {
    title: "Цель",
    description: "Представлять Узбекистан на мировой арене робототехники.",
    icon: Target,
  },
];

export default function HomePage() {
  const popularLessons = getPopularLessons(3);
  const announcements = getActiveAnnouncements();

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        {/* Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-ftc-red/10 via-transparent to-ftc-blue/10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-ftc-red/10 blur-[120px]" />
        </div>

        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl text-center"
          >
            <Badge className="mb-6 text-sm px-4 py-1">
              🚀 Набор в команду открыт
            </Badge>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="text-gradient-ftc">FIRST</span> Uzbekistan
            </h1>

            <p className="mt-6 text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto">
              Мы — команда молодых инженеров и программистов, представляющих
              Узбекистан на международных робототехнических соревнованиях
              FIRST Tech Challenge.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg">
                <Link href="/apply">
                  Присоединиться к команде
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/lessons">Начать обучение</Link>
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Announcements */}
      {announcements.length > 0 && (
        <Section className="py-12 bg-muted/30">
          <Container>
            <div className="grid gap-4 md:grid-cols-3">
              {announcements.slice(0, 3).map((announcement, index) => (
                <motion.div
                  key={announcement.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <p className="font-medium">{announcement.title}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {announcement.content}
                      </p>
                      {announcement.link_url && (
                        <Link
                          href={announcement.link_url}
                          className="mt-2 inline-flex items-center text-sm text-ftc-red hover:underline"
                        >
                          {announcement.link_text}
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </Link>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Features */}
      <Section>
        <SectionHeader
          title="Что мы делаем"
          description="Комплексный подход к робототехнике и развитию навыков"
        />
        <BentoGrid>
          {features.map((feature, index) => (
            <BentoItem key={feature.title} {...feature} index={index} />
          ))}
        </BentoGrid>
      </Section>

      {/* Popular Lessons */}
      <Section className="bg-muted/30">
        <SectionHeader
          title="Популярные уроки"
          description="Начните изучение с самых востребованных материалов"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {popularLessons.map((lesson, index) => (
            <LessonCard key={lesson.id} lesson={lesson} index={index} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/lessons">
              Все уроки
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-gradient-to-br from-ftc-red to-ftc-blue text-white">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">
              Готовы начать?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
              Присоединяйтесь к команде FIRST Uzbekistan и станьте частью
              глобального сообщества молодых инноваторов.
            </p>
            <div className="mt-10">
              <Button
                asChild
                size="lg"
                className="bg-white text-ftc-red hover:bg-white/90"
              >
                <Link href="/apply">
                  Подать заявку
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </Section>
    </>
  );
}