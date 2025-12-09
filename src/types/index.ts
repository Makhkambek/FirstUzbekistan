import { Database } from './database';

// ===== DATABASE TYPES (from Supabase) =====

export type Subcategory = Database['public']['Tables']['subcategories']['Row'];
export type Lesson = Database['public']['Tables']['lessons']['Row'];
export type Announcement = Database['public']['Tables']['announcements']['Row'];
export type TeamMember = Database['public']['Tables']['team_members']['Row'];
export type Sponsor = Database['public']['Tables']['sponsors']['Row'];
export type SiteSettings = Database['public']['Tables']['site_settings']['Row'];

// Enums
export type LessonCategory = 'engineering' | 'programming';
export type LessonStatus = 'draft' | 'published';
export type AnnouncementType = 'info' | 'warning' | 'success' | 'event';
export type TeamRole = 'captain' | 'programmer' | 'engineer' | 'designer' | 'mentor' | 'coach';
export type SponsorTier = 'platinum' | 'gold' | 'silver' | 'bronze' | 'partner';

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
    difficulty: 'beginner' | 'intermediate' | 'advanced';
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