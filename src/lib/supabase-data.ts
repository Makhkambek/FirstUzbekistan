import { createClient } from '@/lib/supabase/client'
import type { Database } from '@/types/database'

const supabase = createClient()

// Type aliases
type Subcategory = Database['public']['Tables']['subcategories']['Row']
type Lesson = Database['public']['Tables']['lessons']['Row']
type Announcement = Database['public']['Tables']['announcements']['Row']
type TeamMember = Database['public']['Tables']['team_members']['Row']
type Sponsor = Database['public']['Tables']['sponsors']['Row']
type SiteSettings = Database['public']['Tables']['site_settings']['Row']

// ===== SUBCATEGORIES =====

export async function getSubcategoriesByCategory(category: 'engineering' | 'programming'): Promise<Subcategory[]> {
    const { data, error } = await supabase
        .from('subcategories')
        .select('*')
        .eq('category', category)
        .order('order', { ascending: true })

    if (error) {
        console.error('Error fetching subcategories:', error)
        return []
    }

    return data || []
}

export async function getSubcategoryBySlug(slug: string): Promise<Subcategory | null> {
    const { data, error } = await supabase
        .from('subcategories')
        .select('*')
        .eq('slug', slug)
        .single()

    if (error) {
        console.error('Error fetching subcategory:', error)
        return null
    }

    return data
}

// ===== LESSONS =====

export async function getLessonsByCategory(category: 'engineering' | 'programming'): Promise<Lesson[]> {
    const { data, error } = await supabase
        .from('lessons')
        .select('*')
        .eq('category', category)
        .eq('status', 'published')
        .order('order', { ascending: true })

    if (error) {
        console.error('Error fetching lessons:', error)
        return []
    }

    return data || []
}

export async function getLessonsBySubcategory(subcategoryId: string): Promise<Lesson[]> {
    const { data, error } = await supabase
        .from('lessons')
        .select('*')
        .eq('subcategory_id', subcategoryId)
        .eq('status', 'published')
        .order('order', { ascending: true })

    if (error) {
        console.error('Error fetching lessons by subcategory:', error)
        return []
    }

    return data || []
}

export async function getLessonBySlug(slug: string): Promise<Lesson | null> {
    const { data, error } = await supabase
        .from('lessons')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .single()

    if (error) {
        console.error('Error fetching lesson:', error)
        return null
    }

    // Increment views (fire and forget)
    if (data) {
        (async () => {
            try {
                const { error } = await supabase
                    .from('lessons')
                    .update({ views: data.views + 1 })
                    .eq('id', data.id)

                if (error) {
                    console.error('Error updating views:', error)
                }
            } catch (err) {
                console.error('Error updating views:', err)
            }
        })()
    }

    return data
}

export async function getPopularLessons(limit = 3): Promise<Lesson[]> {
    const { data, error } = await supabase
        .from('lessons')
        .select('*')
        .eq('status', 'published')
        .order('views', { ascending: false })
        .limit(limit)

    if (error) {
        console.error('Error fetching popular lessons:', error)
        return []
    }

    return data || []
}

export async function getLatestLessons(limit = 3): Promise<Lesson[]> {
    const { data, error } = await supabase
        .from('lessons')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false })
        .limit(limit)

    if (error) {
        console.error('Error fetching latest lessons:', error)
        return []
    }

    return data || []
}

// ===== ANNOUNCEMENTS =====

export async function getActiveAnnouncements(): Promise<Announcement[]> {
    const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .eq('is_active', true)
        .order('order', { ascending: true })

    if (error) {
        console.error('Error fetching announcements:', error)
        return []
    }

    return data || []
}

// ===== TEAM MEMBERS =====

export async function getActiveTeamMembers(): Promise<TeamMember[]> {
    const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .eq('is_active', true)
        .order('order', { ascending: true })

    if (error) {
        console.error('Error fetching team members:', error)
        return []
    }

    return data || []
}

// ===== SPONSORS =====

export async function getActiveSponsors(): Promise<Sponsor[]> {
    const { data, error } = await supabase
        .from('sponsors')
        .select('*')
        .eq('is_active', true)
        .order('order', { ascending: true })

    if (error) {
        console.error('Error fetching sponsors:', error)
        return []
    }

    return data || []
}

// ===== SITE SETTINGS =====

export async function getSiteSettings(): Promise<SiteSettings | null> {
    const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .single()

    if (error) {
        console.error('Error fetching site settings:', error)
        return null
    }

    return data
}