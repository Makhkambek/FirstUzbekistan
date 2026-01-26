"use client";

import { useLayoutEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  ClipboardList,
  Calendar,
  Users,
  Wrench,
  Code,
  FileText,
  Briefcase,
  MapPin,
  AlertCircle,
  ChevronDown,
  Sparkles,
  Trophy,
  Rocket,
  Zap,
  Star,
  Target,
  Award
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const preparationSections = [
  {
    title: "Перед соревнованиями",
    subtitle: "Подготовка документов и планирование",
    icon: ClipboardList,
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-500/10 to-cyan-500/10",
    items: [
      {
        category: "Документы",
        icon: FileText,
        color: "text-blue-500",
        checklist: [
          "Паспорта всех участников (с действительным сроком)",
          "Визы (если требуются)",
          "Медицинские страховки",
          "Разрешения от родителей для несовершеннолетних",
          "Регистрационные документы команды",
          "Подтверждение бронирования отеля",
          "Билеты на транспорт"
        ]
      },
      {
        category: "Регистрация",
        icon: Calendar,
        color: "text-cyan-500",
        checklist: [
          "Зарегистрировать команду на официальном сайте",
          "Оплатить регистрационный взнос",
          "Подтвердить состав команды",
          "Загрузить необходимые формы и документы",
          "Получить подтверждение регистрации"
        ]
      },
      {
        category: "Логистика",
        icon: MapPin,
        color: "text-sky-500",
        checklist: [
          "Забронировать авиабилеты заранее",
          "Забронировать отель (желательно рядом с местом проведения)",
          "Организовать трансфер от аэропорта до отеля",
          "Спланировать маршрут до места соревнований",
          "Изучить местность и ближайшую инфраструктуру"
        ]
      }
    ]
  },
  {
    title: "Подготовка робота",
    subtitle: "Механика, электроника и программирование",
    icon: Wrench,
    gradient: "from-ftc-red to-orange-500",
    bgGradient: "from-ftc-red/10 to-orange-500/10",
    items: [
      {
        category: "Механика",
        icon: Wrench,
        color: "text-ftc-red",
        checklist: [
          "Проверить все соединения и крепления",
          "Убедиться в исправности всех механизмов",
          "Подготовить запасные детали (колеса, моторы, сервоприводы)",
          "Проверить соответствие размеров робота правилам",
          "Провести тесты на прочность конструкции",
          "Взять инструменты: отвертки, ключи, плоскогубцы",
          "Упаковать робота безопасно для транспортировки"
        ]
      },
      {
        category: "Электроника",
        icon: Zap,
        color: "text-orange-500",
        checklist: [
          "Проверить все кабели и соединения",
          "Зарядить все батареи и взять запасные",
          "Проверить работу всех датчиков",
          "Протестировать беспроводное соединение",
          "Взять запасные провода и коннекторы",
          "Подготовить устройства для зарядки",
          "Проверить совместимость с розетками страны проведения"
        ]
      },
      {
        category: "Программное обеспечение",
        icon: Code,
        color: "text-amber-500",
        checklist: [
          "Загрузить последнюю версию кода на робота",
          "Создать резервную копию всего кода",
          "Протестировать автономные программы",
          "Проверить телеоперацию (TeleOp)",
          "Подготовить ноутбук с необходимым ПО",
          "Убедиться в наличии всех необходимых драйверов",
          "Взять USB-кабели для прошивки"
        ]
      }
    ]
  },
  {
    title: "Команда и подготовка",
    subtitle: "Навыки, стратегия и командная работа",
    icon: Users,
    gradient: "from-green-500 to-emerald-500",
    bgGradient: "from-green-500/10 to-emerald-500/10",
    items: [
      {
        category: "Команда",
        icon: Users,
        color: "text-green-500",
        checklist: [
          "Распределить роли (драйвер, оператор, тренер)",
          "Провести тренировочные сессии",
          "Отработать стратегию игры",
          "Подготовить Engineering Notebook",
          "Подготовить презентацию команды",
          "Подготовить ответы на возможные вопросы жюри",
          "Организовать командную форму/футболки"
        ]
      },
      {
        category: "Навыки",
        icon: Target,
        color: "text-emerald-500",
        checklist: [
          "Отработать управление роботом",
          "Тренировать быстрое устранение неполадок",
          "Практиковать работу в стрессовых условиях",
          "Изучить правила соревнований",
          "Подготовиться к интервью с судьями",
          "Научиться презентовать проект"
        ]
      }
    ]
  },
  {
    title: "На соревнованиях",
    subtitle: "Важные моменты и правила поведения",
    icon: Trophy,
    gradient: "from-yellow-500 to-amber-500",
    bgGradient: "from-yellow-500/10 to-amber-500/10",
    items: [
      {
        category: "Важные моменты",
        icon: AlertCircle,
        color: "text-yellow-500",
        checklist: [
          "Прибыть заранее для регистрации",
          "Пройти технический осмотр робота",
          "Ознакомиться с площадкой и полем",
          "Участвовать во всех briefing сессиях",
          "Следить за расписанием матчей",
          "Быть готовым к изменениям в расписании",
          "Общаться с другими командами"
        ]
      },
      {
        category: "Во время матчей",
        icon: Star,
        color: "text-amber-500",
        checklist: [
          "Прийти в Pit Area за 15 минут до матча",
          "Проверить заряд батареи",
          "Провести быструю проверку робота",
          "Обсудить стратегию с союзниками",
          "Следовать инструкциям судей",
          "Сохранять спортивный дух",
          "Делать заметки после каждого матча"
        ]
      },
      {
        category: "Безопасность и этикет",
        icon: Briefcase,
        color: "text-orange-500",
        checklist: [
          "Соблюдать правила безопасности",
          "Быть вежливыми со всеми участниками",
          "Помогать другим командам",
          "Не оставлять ценные вещи без присмотра",
          "Следовать дресс-коду",
          "Уважать решения судей"
        ]
      }
    ]
  },
  {
    title: "После соревнований",
    subtitle: "Анализ результатов и выводы",
    icon: Award,
    gradient: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-500/10 to-pink-500/10",
    items: [
      {
        category: "Завершение",
        icon: CheckCircle2,
        color: "text-purple-500",
        checklist: [
          "Дождаться церемонии награждения",
          "Собрать фотографии и видео",
          "Обменяться контактами с другими командами",
          "Получить сертификаты участия",
          "Упаковать робота и оборудование",
          "Проверить, что ничего не забыли"
        ]
      },
      {
        category: "Анализ",
        icon: FileText,
        color: "text-pink-500",
        checklist: [
          "Провести разбор полетов команды",
          "Записать уроки и выводы",
          "Отметить сильные и слабые стороны",
          "Спланировать улучшения",
          "Поделиться опытом с сообществом",
          "Обновить портфолио команды"
        ]
      }
    ]
  }
];

function SectionCard({ section, sectionIndex }: { section: typeof preparationSections[0], sectionIndex: number }) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: sectionIndex * 0.1 }}
      className="mb-8"
    >
      <Card className={cn(
        "overflow-hidden border-2 transition-all duration-300",
        "hover:shadow-2xl hover:scale-[1.01]",
        `bg-gradient-to-br ${section.bgGradient}`
      )}>
        <CardHeader
          className="cursor-pointer select-none"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div
                className={`p-4 rounded-xl bg-gradient-to-br ${section.gradient} shadow-lg`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <section.icon className="h-8 w-8 text-white" />
              </motion.div>
              <div>
                <CardTitle className="text-3xl font-bold">
                  {section.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">{section.subtitle}</p>
              </div>
            </div>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="h-6 w-6" />
            </motion.div>
          </div>
        </CardHeader>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CardContent className="pt-0">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {section.items.map((item, itemIndex) => (
                    <motion.div
                      key={item.category}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: itemIndex * 0.1 }}
                    >
                      <Card className="h-full bg-background/50 backdrop-blur-sm border-2 hover:border-primary/50 transition-all duration-300">
                        <CardHeader className="pb-3">
                          <div className="flex items-center gap-3">
                            <div className={cn("p-2 rounded-lg bg-muted", item.color)}>
                              <item.icon className="h-5 w-5" />
                            </div>
                            <CardTitle className="text-lg">{item.category}</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-3">
                            {item.checklist.map((checkItem, index) => (
                              <li key={index} className="flex items-start gap-3">
                                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{checkItem}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}

export default function CompetitionGuidePage() {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-ftc-red/10 via-purple-500/10 to-ftc-blue/10" />
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gradient-to-br from-ftc-red/20 to-ftc-blue/20 blur-xl"
              style={{
                width: Math.random() * 300 + 100,
                height: Math.random() * 300 + 100,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
                scale: [1, Math.random() + 0.5, 1],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            >
              <Badge className="mb-6 text-base px-6 py-2 bg-ftc-red text-white border-0 shadow-lg">
                <Sparkles className="h-4 w-4 mr-2" />
                Полное руководство
              </Badge>
            </motion.div>

            <motion.h1
              className="text-5xl font-black tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="bg-gradient-to-r from-ftc-red via-purple-500 to-ftc-blue bg-clip-text text-transparent">
                Подготовка
              </span>
              <br />
              <span className="text-foreground">к соревнованиям</span>
            </motion.h1>

            <motion.p
              className="mt-8 text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Полный справочник для участия в соревнованиях FIRST.
              Все что нужно знать, взять с собой и учесть для успешного выступления!
            </motion.p>

            {/* Stats */}
            <motion.div
              className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              {[
                { icon: ClipboardList, label: "5 этапов", color: "from-blue-500 to-cyan-500" },
                { icon: Rocket, label: "Полезные советы", color: "from-ftc-red to-orange-500" },
                { icon: Trophy, label: "Чек-листы", color: "from-yellow-500 to-amber-500" },
                { icon: Star, label: "Подготовка", color: "from-purple-500 to-pink-500" }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="relative group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-br rounded-xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity",
                    stat.color
                  )} />
                  <Card className="relative bg-background/80 backdrop-blur-sm border-2">
                    <CardContent className="p-6 text-center">
                      <stat.icon className={cn("h-8 w-8 mx-auto mb-2 bg-gradient-to-br bg-clip-text text-transparent", stat.color)} />
                      <p className="font-bold">{stat.label}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Timeline Sections */}
      <Section>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Этапы подготовки</h2>
            <p className="text-muted-foreground text-lg">
              Пять ключевых этапов для успешного выступления на соревнованиях
            </p>
          </motion.div>

          {preparationSections.map((section, index) => (
            <SectionCard key={section.title} section={section} sectionIndex={index} />
          ))}
        </Container>
      </Section>

      {/* Important Note */}
      <Section className="bg-muted/30">
        <Container>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Card className="border-2 border-ftc-red bg-gradient-to-br from-ftc-red/10 to-orange-500/10 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-ftc-red/10 rounded-full blur-3xl" />
              <CardHeader>
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <AlertCircle className="h-8 w-8 text-ftc-red" />
                  </motion.div>
                  <CardTitle className="text-2xl">Важная информация</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 relative">
                <p className="text-lg">
                  Этот справочник является общим руководством. Обязательно проверяйте специфические требования
                  каждого конкретного соревнования на официальном сайте события.
                </p>
                <p className="text-lg">
                  Рекомендуется начать подготовку минимум за 2-3 месяца до соревнований, особенно если
                  требуется оформление виз и международных документов.
                </p>
                <div className="flex items-start gap-3 p-4 bg-background/50 rounded-lg border-2 border-ftc-red/20">
                  <Trophy className="h-6 w-6 text-ftc-red flex-shrink-0 mt-1" />
                  <p className="font-bold text-lg">
                    Желаем удачи на соревнованиях! Помните: участие в FIRST - это не только победы,
                    но и опыт, новые знакомства и развитие навыков.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </Container>
      </Section>
    </>
  );
}
