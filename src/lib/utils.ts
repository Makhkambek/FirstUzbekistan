import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
}

export function formatDate(dateString: string, locale = "ru-RU"): string {
    return new Date(dateString).toLocaleDateString(locale, {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

export function formatDateTime(dateString: string, locale = "ru-RU"): string {
    return new Date(dateString).toLocaleString(locale, {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

export function slugify(text: string): string {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-")
        .replace(/^-+/, "")
        .replace(/-+$/, "");
}

export function getInitials(name: string): string {
    return name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
}

export function isPast(dateString: string): boolean {
    return new Date(dateString) < new Date();
}

export function getCategoryColor(category: "engineering" | "programming") {
    return category === "engineering" ? "engineering" : "programming";
}

export function getDifficultyLabel(difficulty: string): string {
    const labels: Record<string, string> = {
        beginner: "Начинающий",
        intermediate: "Средний",
        advanced: "Продвинутый",
    };
    return labels[difficulty] || difficulty;
}

export function getRoleLabel(role: string): string {
    const labels: Record<string, string> = {
        captain: "Капитан",
        programmer: "Программист",
        engineer: "Инженер",
        designer: "Дизайнер",
        mentor: "Ментор",
        coach: "Тренер",
    };
    return labels[role] || role;
}

export function getTierLabel(tier: string): string {
    const labels: Record<string, string> = {
        platinum: "Платиновый",
        gold: "Золотой",
        silver: "Серебряный",
        bronze: "Бронзовый",
        partner: "Партнёр",
    };
    return labels[tier] || tier;
}

export function getYouTubeId(url: string): string | null {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

export function getYouTubeThumbnail(url: string): string | null {
    const videoId = getYouTubeId(url);
    return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;
}