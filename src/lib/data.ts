import { Lesson, TeamMember, Sponsor, Announcement, Subcategory } from "@/types";

// ===== SUBCATEGORIES =====
export const subcategories: Subcategory[] = [
    // Engineering
    {
        id: "1",
        slug: "cad-modeling",
        title: "CAD & 3D Моделирование",
        description: "Изучите основы Onshape и создание деталей для робота",
        category: "engineering",
        order: 1,
        created_at: "2024-01-01",
        updated_at: "2024-01-01",
    },
    {
        id: "2",
        slug: "mechanics",
        title: "Механика & Конструкция",
        description: "Понимание механических систем и сборки робота",
        category: "engineering",
        order: 2,
        created_at: "2024-01-01",
        updated_at: "2024-01-01",
    },
    {
        id: "3",
        slug: "prototyping",
        title: "Прототипирование",
        description: "Быстрое создание и тестирование механизмов",
        category: "engineering",
        order: 3,
        created_at: "2024-01-01",
        updated_at: "2024-01-01",
    },
    // Programming
    {
        id: "4",
        slug: "sdk-basics",
        title: "Основы FTC SDK",
        description: "Настройка среды разработки и первая программа",
        category: "programming",
        order: 1,
        created_at: "2024-01-01",
        updated_at: "2024-01-01",
    },
    {
        id: "5",
        slug: "teleop",
        title: "TeleOp Управление",
        description: "Программирование ручного управления роботом",
        category: "programming",
        order: 2,
        created_at: "2024-01-01",
        updated_at: "2024-01-01",
    },
    {
        id: "6",
        slug: "autonomous",
        title: "Автономный Режим",
        description: "Создание автономных программ с датчиками",
        category: "programming",
        order: 3,
        created_at: "2024-01-01",
        updated_at: "2024-01-01",
    },
];

// ===== LESSONS =====
export const lessons: Lesson[] = [
    // CAD & 3D Моделирование
    {
        id: "1",
        slug: "intro-to-onshape",
        title: "Введение в Onshape",
        description: "Первые шаги в облачной CAD системе. Регистрация и знакомство с интерфейсом.",
        video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        thumbnail_url: null,
        category: "engineering",
        subcategory_id: "1",
        duration: "15:30",
        difficulty: "beginner",
        order: 1,
        views: 1250,
        status: "published",
        created_at: "2024-01-15",
        updated_at: "2024-01-15",
    },
    {
        id: "2",
        slug: "basic-sketches",
        title: "Создание базовых эскизов",
        description: "Научитесь создавать 2D эскизы — основу любой 3D детали.",
        video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        thumbnail_url: null,
        category: "engineering",
        subcategory_id: "1",
        duration: "22:45",
        difficulty: "beginner",
        order: 2,
        views: 980,
        status: "published",
        created_at: "2024-01-20",
        updated_at: "2024-01-20",
    },
    {
        id: "3",
        slug: "3d-parts",
        title: "Создание 3D деталей",
        description: "Выдавливание, вращение и другие операции для создания деталей.",
        video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        thumbnail_url: null,
        category: "engineering",
        subcategory_id: "1",
        duration: "28:15",
        difficulty: "intermediate",
        order: 3,
        views: 756,
        status: "published",
        created_at: "2024-01-25",
        updated_at: "2024-01-25",
    },
    // Механика
    {
        id: "4",
        slug: "gear-types",
        title: "Типы передач в FTC",
        description: "Обзор зубчатых, ременных и цепных передач для роботов.",
        video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        thumbnail_url: null,
        category: "engineering",
        subcategory_id: "2",
        duration: "18:20",
        difficulty: "beginner",
        order: 1,
        views: 2100,
        status: "published",
        created_at: "2024-02-01",
        updated_at: "2024-02-01",
    },
    {
        id: "5",
        slug: "gear-ratios",
        title: "Расчёт передаточных чисел",
        description: "Как рассчитать оптимальные передаточные числа для вашего робота.",
        video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        thumbnail_url: null,
        category: "engineering",
        subcategory_id: "2",
        duration: "25:40",
        difficulty: "intermediate",
        order: 2,
        views: 1560,
        status: "published",
        created_at: "2024-02-05",
        updated_at: "2024-02-05",
    },
    // Прототипирование
    {
        id: "6",
        slug: "rapid-prototyping",
        title: "Быстрое прототипирование",
        description: "Методы быстрого создания и тестирования механизмов из картона и пенопласта.",
        video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        thumbnail_url: null,
        category: "engineering",
        subcategory_id: "3",
        duration: "20:15",
        difficulty: "beginner",
        order: 1,
        views: 890,
        status: "published",
        created_at: "2024-02-15",
        updated_at: "2024-02-15",
    },
    // SDK Basics
    {
        id: "7",
        slug: "android-studio-setup",
        title: "Установка Android Studio",
        description: "Пошаговая установка среды разработки для FTC.",
        video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        thumbnail_url: null,
        category: "programming",
        subcategory_id: "4",
        duration: "12:45",
        difficulty: "beginner",
        order: 1,
        views: 3200,
        status: "published",
        created_at: "2024-03-01",
        updated_at: "2024-03-01",
    },
    {
        id: "8",
        slug: "ftc-project-structure",
        title: "Структура FTC проекта",
        description: "Понимание структуры кода и основных классов SDK.",
        video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        thumbnail_url: null,
        category: "programming",
        subcategory_id: "4",
        duration: "19:20",
        difficulty: "beginner",
        order: 2,
        views: 2450,
        status: "published",
        created_at: "2024-03-05",
        updated_at: "2024-03-05",
    },
    // TeleOp
    {
        id: "9",
        slug: "teleop-basics",
        title: "Основы TeleOp",
        description: "Создание первой программы телеуправления роботом.",
        video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        thumbnail_url: null,
        category: "programming",
        subcategory_id: "5",
        duration: "21:15",
        difficulty: "beginner",
        order: 1,
        views: 2780,
        status: "published",
        created_at: "2024-03-15",
        updated_at: "2024-03-15",
    },
    {
        id: "10",
        slug: "gamepad-controls",
        title: "Работа с геймпадом",
        description: "Настройка кнопок и стиков геймпада для управления роботом.",
        video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        thumbnail_url: null,
        category: "programming",
        subcategory_id: "5",
        duration: "18:30",
        difficulty: "beginner",
        order: 2,
        views: 2100,
        status: "published",
        created_at: "2024-03-20",
        updated_at: "2024-03-20",
    },
    // Autonomous
    {
        id: "11",
        slug: "autonomous-basics",
        title: "Основы автономного режима",
        description: "Структура и принципы автономных программ в FTC.",
        video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        thumbnail_url: null,
        category: "programming",
        subcategory_id: "6",
        duration: "24:30",
        difficulty: "intermediate",
        order: 1,
        views: 1890,
        status: "published",
        created_at: "2024-04-01",
        updated_at: "2024-04-01",
    },
    {
        id: "12",
        slug: "encoders",
        title: "Работа с энкодерами",
        description: "Точное перемещение робота с использованием энкодеров моторов.",
        video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        thumbnail_url: null,
        category: "programming",
        subcategory_id: "6",
        duration: "28:15",
        difficulty: "intermediate",
        order: 2,
        views: 1650,
        status: "published",
        created_at: "2024-04-05",
        updated_at: "2024-04-05",
    },
];

// ===== TEAM MEMBERS =====
export const teamMembers: TeamMember[] = [
    {
        id: "1",
        name: "Махкамбек Тешабаев",
        role: "captain",
        position: null,
        bio: "Капитан команды FIRST Uzbekistan. Опыт в робототехнике более 3 лет. Координирует работу всей команды.",
        image_url: null,
        github_url: "https://github.com/makhkambek",
        linkedin_url: null,
        telegram_url: "https://t.me/makhkambek",
        order: 1,
        is_active: true,
        created_at: "2024-01-01",
        updated_at: "2024-01-01",
    },
    {
        id: "2",
        name: "Азиз Каримов",
        role: "programmer",
        position: null,
        bio: "Главный программист. Специализация на автономных системах и компьютерном зрении.",
        image_url: null,
        github_url: "https://github.com/azizkarimov",
        linkedin_url: null,
        telegram_url: null,
        order: 2,
        is_active: true,
        created_at: "2024-01-01",
        updated_at: "2024-01-01",
    },
    {
        id: "3",
        name: "Шахзод Рахимов",
        role: "engineer",
        position: null,
        bio: "Ведущий инженер. Эксперт в CAD моделировании и механическом дизайне.",
        image_url: null,
        github_url: null,
        linkedin_url: "https://linkedin.com/in/shahzod",
        telegram_url: null,
        order: 3,
        is_active: true,
        created_at: "2024-01-01",
        updated_at: "2024-01-01",
    },
    {
        id: "4",
        name: "Дильноза Усманова",
        role: "designer",
        position: null,
        bio: "Дизайнер и специалист по документации. Создаёт презентации и ведёт инженерный журнал.",
        image_url: null,
        github_url: null,
        linkedin_url: null,
        telegram_url: "https://t.me/dilnoza",
        order: 4,
        is_active: true,
        created_at: "2024-01-01",
        updated_at: "2024-01-01",
    },
];

// ===== SPONSORS =====
export const sponsors: Sponsor[] = [
    {
        id: "1",
        name: "TechCorp Uzbekistan",
        logo_url: "/sponsors/techcorp.png",
        website_url: "https://techcorp.uz",
        tier: "platinum",
        description: "Генеральный спонсор команды",
        order: 1,
        is_active: true,
        created_at: "2024-01-01",
        updated_at: "2024-01-01",
    },
    {
        id: "2",
        name: "INHA University",
        logo_url: "/sponsors/inha.png",
        website_url: "https://inha.uz",
        tier: "gold",
        description: "Образовательный партнёр",
        order: 2,
        is_active: true,
        created_at: "2024-01-01",
        updated_at: "2024-01-01",
    },
    {
        id: "3",
        name: "RoboSupply",
        logo_url: "/sponsors/robosupply.png",
        website_url: "https://robosupply.com",
        tier: "gold",
        description: "Поставщик робототехнических компонентов",
        order: 3,
        is_active: true,
        created_at: "2024-01-01",
        updated_at: "2024-01-01",
    },
    {
        id: "4",
        name: "MakerSpace Tashkent",
        logo_url: "/sponsors/makerspace.png",
        website_url: "https://makerspace.uz",
        tier: "silver",
        description: "Предоставляет доступ к оборудованию",
        order: 4,
        is_active: true,
        created_at: "2024-01-01",
        updated_at: "2024-01-01",
    },
];

// ===== ANNOUNCEMENTS =====
export const announcements: Announcement[] = [
    {
        id: "1",
        title: "🚀 Набор открыт!",
        content: "Приём заявок на сезон 2025 открыт. Присоединяйтесь к нашей команде!",
        type: "success",
        link_text: "Подать заявку",
        link_url: "/apply",
        is_active: true,
        order: 1,
        created_at: "2024-12-01",
        updated_at: "2024-12-01",
    },
    {
        id: "2",
        title: "📺 Новые уроки",
        content: "Добавлено 5 новых видео по программированию автономного режима.",
        type: "info",
        link_text: "Смотреть",
        link_url: "/lessons/programming",
        is_active: true,
        order: 2,
        created_at: "2024-12-05",
        updated_at: "2024-12-05",
    },
    {
        id: "3",
        title: "🏆 Региональный турнир",
        content: "15 января состоится региональный этап FTC в Ташкенте.",
        type: "event",
        link_text: "Подробнее",
        link_url: "/about",
        is_active: true,
        order: 3,
        created_at: "2024-12-08",
        updated_at: "2024-12-08",
    },
];

// ===== SITE SETTINGS =====
export const siteSettings = {
    id: "1",
    application_open: true,
    application_deadline: "2025-02-01",
    application_form_url: "https://forms.google.com/firstuzbekistan",
    spots_remaining: 5,
    updated_at: "2024-12-01",
};

// ===== HELPER FUNCTIONS =====

export function getLessonsByCategory(category: "engineering" | "programming"): Lesson[] {
    return lessons
        .filter((l) => l.category === category && l.status === "published")
        .sort((a, b) => a.order - b.order);
}

export function getLessonsBySubcategory(subcategoryId: string): Lesson[] {
    return lessons
        .filter((l) => l.subcategory_id === subcategoryId && l.status === "published")
        .sort((a, b) => a.order - b.order);
}

export function getSubcategoriesByCategory(category: "engineering" | "programming"): Subcategory[] {
    return subcategories
        .filter((s) => s.category === category)
        .sort((a, b) => a.order - b.order);
}

export function getPopularLessons(limit = 3): Lesson[] {
    return [...lessons]
        .filter((l) => l.status === "published")
        .sort((a, b) => b.views - a.views)
        .slice(0, limit);
}

export function getLatestLessons(limit = 3): Lesson[] {
    return [...lessons]
        .filter((l) => l.status === "published")
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, limit);
}

export function getLessonById(id: string): Lesson | undefined {
    return lessons.find((l) => l.id === id);
}

export function getLessonBySlug(slug: string): Lesson | undefined {
    return lessons.find((l) => l.slug === slug);
}

export function getSubcategoryBySlug(slug: string): Subcategory | undefined {
    return subcategories.find((s) => s.slug === slug);
}

export function getActiveAnnouncements(): Announcement[] {
    return announcements
        .filter((a) => a.is_active)
        .sort((a, b) => a.order - b.order);
}

export function getActiveTeamMembers(): TeamMember[] {
    return teamMembers
        .filter((m) => m.is_active)
        .sort((a, b) => a.order - b.order);
}

export function getActiveSponsors(): Sponsor[] {
    return sponsors
        .filter((s) => s.is_active)
        .sort((a, b) => a.order - b.order);
}