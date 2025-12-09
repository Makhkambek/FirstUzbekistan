// ===== DATABASE TYPES =====

export type LessonCategory = "engineering" | "programming";
export type LessonStatus = "draft" | "published";
export type AnnouncementType = "info" | "warning" | "success" | "event";
export type TeamRole = "captain" | "programmer" | "engineer" | "designer" | "mentor" | "coach";
export type SponsorTier = "platinum" | "gold" | "silver" | "bronze" | "partner";

// Subcategory (управляется через CMS)
export interface Subcategory {
    id: string;
    slug: string;
    title: string;
    description: string;
    category: LessonCategory;
    order: number;
    created_at: string;
    updated_at: string;
}

// Lesson (управляется через CMS)
export interface Lesson {
    id: string;
    slug: string;
    title: string;
    description: string;
    video_url: string;
    thumbnail_url: string | null;
    category: LessonCategory;
    subcategory_id: string;
    subcategory?: Subcategory;
    duration: string;
    difficulty: "beginner" | "intermediate" | "advanced";
    order: number;
    views: number;
    status: LessonStatus;
    created_at: string;
    updated_at: string;
}

// Announcement (управляется через CMS)
export interface Announcement {
    id: string;
    title: string;
    content: string;
    type: AnnouncementType;
    link_text: string | null;
    link_url: string | null;
    is_active: boolean;
    order: number;
    created_at: string;
    updated_at: string;
}

// Team Member (управляется через CMS)
export interface TeamMember {
    id: string;
    name: string;
    role: TeamRole;
    bio: string;
    image_url: string | null;
    github_url: string | null;
    linkedin_url: string | null;
    telegram_url: string | null;
    order: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

// Sponsor (управляется через CMS)
export interface Sponsor {
    id: string;
    name: string;
    logo_url: string;
    website_url: string;
    tier: SponsorTier;
    description: string | null;
    order: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

// Site Settings (управляется через CMS)
export interface SiteSettings {
    id: string;
    application_open: boolean;
    application_deadline: string | null;
    application_form_url: string;
    spots_remaining: number | null;
    updated_at: string;
}

// ===== FORM TYPES =====

export interface LessonFormData {
    title: string;
    slug: string;
    description: string;
    video_url: string;
    thumbnail_url?: string;
    category: LessonCategory;
    subcategory_id: string;
    duration: string;
    difficulty: "beginner" | "intermediate" | "advanced";
    order: number;
    status: LessonStatus;
}

export interface SubcategoryFormData {
    title: string;
    slug: string;
    description: string;
    category: LessonCategory;
    order: number;
}

export interface AnnouncementFormData {
    title: string;
    content: string;
    type: AnnouncementType;
    link_text?: string;
    link_url?: string;
    is_active: boolean;
    order: number;
}

export interface TeamMemberFormData {
    name: string;
    role: TeamRole;
    bio: string;
    image_url?: string;
    github_url?: string;
    linkedin_url?: string;
    telegram_url?: string;
    order: number;
    is_active: boolean;
}

// ===== API RESPONSE TYPES =====

export interface ApiResponse<T> {
    data: T | null;
    error: string | null;
}

export interface PaginatedResponse<T> {
    data: T[];
    count: number;
    page: number;
    pageSize: number;
    totalPages: number;
}