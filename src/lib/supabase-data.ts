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
type Resource = Database['public']['Tables']['resources']['Row']

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
    console.log('Fetching lesson with slug:', slug);

    const { data, error } = await supabase
        .from('lessons')
        .select('*')
        .eq('slug', slug)
        .maybeSingle()

    if (error) {
        console.error('Error fetching lesson:', error)
        return null
    }

    if (!data) {
        console.log('Lesson not found with slug:', slug)
        return null
    }

    console.log('Lesson found:', data.title);

    // Increment views
    void supabase
        .from('lessons')
        .update({ views: data.views + 1 })
        .eq('id', data.id)

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

// ===== RESOURCES =====

export async function getResourcesByType(type: 'engineering' | 'programming', year?: number): Promise<Resource[]> {
    let query = supabase
        .from('resources')
        .select('*')
        .eq('type', type)
        .eq('is_active', true)
        .order('year', { ascending: false })
        .order('order', { ascending: true })

    if (year) {
        query = query.eq('year', year)
    }

    const { data, error } = await query

    if (error) {
        console.error('Error fetching resources by type:', error)
        return []
    }

    console.log(`Resources by type ${type}:`, data?.length || 0)
    return data || []
}

export async function getResourcesByCategory(category: 'cad' | 'code' | 'drawing' | 'other', year?: number): Promise<Resource[]> {
    let query = supabase
        .from('resources')
        .select('*')
        .eq('category', category)
        .eq('is_active', true)
        .order('year', { ascending: false })
        .order('order', { ascending: true })

    if (year) {
        query = query.eq('year', year)
    }

    const { data, error } = await query

    if (error) {
        console.error('Error fetching resources by category:', error)
        return []
    }

    console.log(`Resources by category ${category}:`, data?.length || 0)
    return data || []
}

export async function getAvailableYearsForCategory(category: 'cad' | 'code' | 'drawing' | 'other'): Promise<number[]> {
    const { data, error } = await supabase
        .from('resources')
        .select('year')
        .eq('category', category)
        .eq('is_active', true)

    if (error) {
        console.error('Error fetching years for category:', error)
        return []
    }

    const years = [...new Set(data?.map(r => r.year) || [])]
    console.log(`Available years for ${category}:`, years)
    return years.sort((a, b) => b - a)
}

export async function getAvailableYears(type: 'engineering' | 'programming'): Promise<number[]> {
    const { data, error } = await supabase
        .from('resources')
        .select('year')
        .eq('type', type)
        .eq('is_active', true)

    if (error) {
        console.error('Error fetching years:', error)
        return []
    }

    const years = [...new Set(data?.map(r => r.year) || [])]
    return years.sort((a, b) => b - a)
}

export async function getAllResources(): Promise<Resource[]> {
    const { data, error } = await supabase
        .from('resources')
        .select('*')
        .order('type')
        .order('year', { ascending: false })
        .order('order')

    if (error) {
        console.error('Error fetching all resources:', error)
        return []
    }

    return data || []
}