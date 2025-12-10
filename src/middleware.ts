import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Если это страница логина или API, пропускаем
    if (pathname === '/admin/login' || pathname.startsWith('/api/')) {
        return NextResponse.next()
    }

    // Проверяем только админские страницы
    if (pathname.startsWith('/admin')) {
        const isAuthenticated = request.cookies.get('admin-authenticated')?.value === 'true'

        if (!isAuthenticated) {
            return NextResponse.redirect(new URL('/admin/login', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: '/admin/:path*',
}