export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            subcategories: {
                Row: {
                    id: string
                    slug: string
                    title: string
                    description: string
                    category: 'engineering' | 'programming'
                    order: number
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    slug: string
                    title: string
                    description: string
                    category: 'engineering' | 'programming'
                    order?: number
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    slug?: string
                    title?: string
                    description?: string
                    category?: 'engineering' | 'programming'
                    order?: number
                    created_at?: string
                    updated_at?: string
                }
                Relationships: []
            }
            lessons: {
                Row: {
                    id: string
                    slug: string
                    title: string
                    description: string
                    video_url: string
                    thumbnail_url: string | null
                    category: 'engineering' | 'programming'
                    subcategory_id: string
                    duration: string
                    difficulty: 'beginner' | 'intermediate' | 'advanced'
                    order: number
                    views: number
                    status: 'draft' | 'published'
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    slug: string
                    title: string
                    description: string
                    video_url: string
                    thumbnail_url?: string | null
                    category: 'engineering' | 'programming'
                    subcategory_id: string
                    duration: string
                    difficulty: 'beginner' | 'intermediate' | 'advanced'
                    order?: number
                    views?: number
                    status?: 'draft' | 'published'
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    slug?: string
                    title?: string
                    description?: string
                    video_url?: string
                    thumbnail_url?: string | null
                    category?: 'engineering' | 'programming'
                    subcategory_id?: string
                    duration?: string
                    difficulty?: 'beginner' | 'intermediate' | 'advanced'
                    order?: number
                    views?: number
                    status?: 'draft' | 'published'
                    created_at?: string
                    updated_at?: string
                }
                Relationships: []
            }
            announcements: {
                Row: {
                    id: string
                    title: string
                    content: string
                    type: 'info' | 'warning' | 'success' | 'event'
                    link_text: string | null
                    link_url: string | null
                    is_active: boolean
                    order: number
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    title: string
                    content: string
                    type: 'info' | 'warning' | 'success' | 'event'
                    link_text?: string | null
                    link_url?: string | null
                    is_active?: boolean
                    order?: number
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    title?: string
                    content?: string
                    type?: 'info' | 'warning' | 'success' | 'event'
                    link_text?: string | null
                    link_url?: string | null
                    is_active?: boolean
                    order?: number
                    created_at?: string
                    updated_at?: string
                }
                Relationships: []
            }
            team_members: {
                Row: {
                    id: string
                    name: string
                    role: 'captain' | 'programmer' | 'engineer' | 'designer' | 'mentor' | 'coach'
                    position: string | null  // ДОБАВЬ ЭТО
                    bio: string
                    image_url: string | null
                    github_url: string | null
                    linkedin_url: string | null
                    telegram_url: string | null
                    order: number
                    is_active: boolean
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    role: 'captain' | 'programmer' | 'engineer' | 'designer' | 'mentor' | 'coach'
                    position?: string | null  // ДОБАВЬ ЭТО
                    bio: string
                    image_url?: string | null
                    github_url?: string | null
                    linkedin_url?: string | null
                    telegram_url?: string | null
                    order?: number
                    is_active?: boolean
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    name?: string
                    role?: 'captain' | 'programmer' | 'engineer' | 'designer' | 'mentor' | 'coach'
                    position?: string | null  // ДОБАВЬ ЭТО
                    bio?: string
                    image_url?: string | null
                    github_url?: string | null
                    linkedin_url?: string | null
                    telegram_url?: string | null
                    order?: number
                    is_active?: boolean
                    created_at?: string
                    updated_at?: string
                }
                Relationships: []
            }
            sponsors: {
                Row: {
                    id: string
                    name: string
                    logo_url: string
                    website_url: string
                    tier: 'platinum' | 'gold' | 'silver' | 'bronze' | 'partner'
                    description: string | null
                    order: number
                    is_active: boolean
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    logo_url: string
                    website_url: string
                    tier: 'platinum' | 'gold' | 'silver' | 'bronze' | 'partner'
                    description?: string | null
                    order?: number
                    is_active?: boolean
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    name?: string
                    logo_url?: string
                    website_url?: string
                    tier: 'platinum' | 'gold' | 'silver' | 'bronze' | 'partner'
                    description?: string | null
                    order?: number
                    is_active?: boolean
                    created_at?: string
                    updated_at?: string
                }
                Relationships: []
            }
            site_settings: {
                Row: {
                    id: string
                    application_open: boolean
                    application_deadline: string | null
                    application_form_url: string
                    spots_remaining: number | null
                    updated_at: string
                }
                Insert: {
                    id?: string
                    application_open?: boolean
                    application_deadline?: string | null
                    application_form_url: string
                    spots_remaining?: number | null
                    updated_at?: string
                }
                Update: {
                    id?: string
                    application_open?: boolean
                    application_deadline?: string | null
                    application_form_url?: string
                    spots_remaining?: number | null
                    updated_at?: string
                }
                Relationships: []
            }
            resources: {
                Row: {
                    id: string
                    title: string
                    description: string
                    category: 'cad' | 'code' | 'drawing' | 'other'
                    type: 'engineering' | 'programming'
                    year: number
                    file_url: string
                    preview_url: string | null
                    tags: string[]
                    order: number
                    is_active: boolean
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    title: string
                    description: string
                    category: 'cad' | 'code' | 'drawing' | 'other'
                    type: 'engineering' | 'programming'
                    year: number
                    file_url: string
                    preview_url?: string | null
                    tags?: string[]
                    order?: number
                    is_active?: boolean
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    title?: string
                    description?: string
                    category?: 'cad' | 'code' | 'drawing' | 'other'
                    type?: 'engineering' | 'programming'
                    year?: number
                    file_url?: string
                    preview_url?: string | null
                    tags?: string[]
                    order?: number
                    is_active?: boolean
                    created_at?: string
                    updated_at?: string
                }
                Relationships: []
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}

