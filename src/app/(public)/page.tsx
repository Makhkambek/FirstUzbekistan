"use client";

import { useEffect, useState } from "react";
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
import { HeroBackgroundSlider } from "@/components/features/hero-background-slider";
import { getPopularLessons, getActiveAnnouncements } from "@/lib/supabase-data";
import { Lesson, Announcement } from "@/types";

// Hero background images
const heroImages = [
  "/hero/hero-1.jpg",
  "/hero/hero-2.jpg",
  "/hero/hero-3.jpg",
  "/hero/hero-4.jpg",
  "/hero/hero-5.jpg",
  "/hero/hero-6.jpg",
];

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
  const [popularLessons, setPopularLessons] = useState<Lesson[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [lessons, announcementsData] = await Promise.all([
        getPopularLessons(3),
        getActiveAnnouncements(),
      ]);
      setPopularLessons(lessons);
      setAnnouncements(announcementsData);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32 flex items-center">
        {/* Background Slider */}
        <HeroBackgroundSlider images={heroImages} interval={10000} />

        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Side - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-5xl font-black tracking-tight sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl">
                <span className="bg-gradient-to-r from-ftc-red via-pink-500 to-ftc-blue bg-clip-text text-transparent animate-gradient-x drop-shadow-[0_4px_20px_rgba(231,76,60,0.6)]"
                      style={{
                        WebkitTextStroke: '2px rgba(255,255,255,0.1)',
                        paintOrder: 'stroke fill'
                      }}>
                  FIRST
                </span>
                {" "}
                <span className="text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]"
                      style={{
                        WebkitTextStroke: '1px rgba(0,0,0,0.3)',
                        paintOrder: 'stroke fill'
                      }}>
                  Uzbekistan
                </span>
              </h1>

              <p className="mt-6 text-lg text-white md:text-xl lg:text-2xl leading-relaxed font-semibold drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
                 style={{
                   textShadow: '0 0 20px rgba(0,0,0,0.9), 0 2px 4px rgba(0,0,0,0.8)'
                 }}>
                Мы — команда молодых инженеров и программистов, представляющих
                Узбекистан на международных робототехнических соревнованиях
                FIRST Tech Challenge.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button asChild size="lg" className="bg-gradient-to-r from-ftc-red to-pink-600 hover:from-ftc-red/90 hover:to-pink-600/90 border-0 shadow-[0_0_30px_rgba(231,76,60,0.6)] hover:shadow-[0_0_40px_rgba(231,76,60,0.8)] transition-all duration-300 text-lg px-8 py-6">
                  <Link href="/apply">
                    Присоединиться к команде
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-2 border-white/50 bg-white/5 hover:bg-white/15 text-white backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.3)] text-lg px-8 py-6">
                  <Link href="/lessons">Начать обучение</Link>
                </Button>
              </div>
            </motion.div>

            {/* Right Side - Visual Space for Photos */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block"
            >
              {/* Пустое пространство для видимости фото */}
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Announcements */}
      {!loading && announcements.length > 0 && (
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
        {loading ? (
          <div className="text-center text-muted-foreground">Загрузка...</div>
        ) : (
          <>
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
          </>
        )}
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