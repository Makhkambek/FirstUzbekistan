import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Пропускаем API и страницу логина
    if (pathname.startsWith('/api/') || pathname === '/auth/login') {
        return NextResponse.next()
    }

    // Проверяем все админские страницы
    if (pathname.startsWith('/admin')) {
        const isAuthenticated = request.cookies.get('admin-authenticated')?.value === 'true'

        if (!isAuthenticated) {
            // Редирект на НОВЫЙ путь логина
            return NextResponse.redirect(new URL('/auth/login', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/admin/:path*',
    ],
}