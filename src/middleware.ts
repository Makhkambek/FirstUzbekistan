import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Защищаем все /admin роуты кроме /admin/login
    if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
        const isAuthenticated = request.cookies.get('admin-authenticated')?.value === 'true'

        if (!isAuthenticated) {
            const loginUrl = new URL('/admin/login', request.url)
            loginUrl.searchParams.set('from', pathname)
            return NextResponse.redirect(loginUrl)
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: '/admin/:path*',
}