export const SITE_CONFIG = {
    name: "FIRST Uzbekistan",
    description: "FIRST Tech Challenge Uzbekistan - Робототехника, инженерия и программирование",
    url: "https://firstuzbekistan.uz",
    email: "teshabayevmakhkambek@gmail.com",
};

export const NAVIGATION = [
    { label: "Главная", href: "/" },
    { label: "О FIRST", href: "/about-first" },
    { label: "Уроки", href: "/lessons" },
    { label: "О команде", href: "/about" },
    { label: "Подать заявку", href: "/apply" },
];

export const COMPETITIONS = [
    {
        label: "FIRST Global Challenge",
        href: "/competitions/fgc",
        description: "Международные олимпиады по робототехнике"
    },
    {
        label: "FIRST Tech Challenge",
        href: "/competitions/ftc",
        description: "Соревнования для старшеклассников"
    },
    {
        label: "FIRST LEGO League",
        href: "/competitions/fll",
        description: "Робототехника для школьников"
    },
];

export const RESOURCES = [
    {
        label: "Подготовка к соревнованиям",
        href: "/competition-guide",
        description: "Все что нужно знать для участия"
    },
    {
        label: "CAD Ресурсы",
        href: "/resources/cads",
        description: "Модели и чертежи для проектирования"
    },
    {
        label: "Код и примеры",
        href: "/resources/code",
        description: "Примеры кода и библиотеки"
    },
];

export const SOCIAL_LINKS = {
    telegram: "https://t.me/firstuzbekistan",
    instagram: "https://instagram.com/firstuzbekistan",
    youtube: "https://youtube.com/@firstuzbekistan",
    github: "https://github.com/firstuzbekistan",
};

export const CATEGORIES = {
    engineering: {
        title: "Инженерия",
        description: "CAD, механика и прототипирование",
        color: "engineering",
    },
    programming: {
        title: "Программирование",
        description: "FTC SDK, TeleOp и автономные системы",
        color: "programming",
    },
};

export const DIFFICULTY_OPTIONS = [
    { value: "beginner", label: "Начинающий" },
    { value: "intermediate", label: "Средний" },
    { value: "advanced", label: "Продвинутый" },
];

export const ROLE_OPTIONS = [
    { value: "captain", label: "Капитан" },
    { value: "programmer", label: "Программист" },
    { value: "engineer", label: "Инженер" },
    { value: "designer", label: "Дизайнер" },
    { value: "mentor", label: "Ментор" },
    { value: "coach", label: "Тренер" },
];

export const TIER_OPTIONS = [
    { value: "platinum", label: "Платиновый" },
    { value: "gold", label: "Золотой" },
    { value: "silver", label: "Серебряный" },
    { value: "bronze", label: "Бронзовый" },
    { value: "partner", label: "Партнёр" },
];

export const ANNOUNCEMENT_TYPE_OPTIONS = [
    { value: "info", label: "Информация" },
    { value: "warning", label: "Важно" },
    { value: "success", label: "Успех" },
    { value: "event", label: "Событие" },
];