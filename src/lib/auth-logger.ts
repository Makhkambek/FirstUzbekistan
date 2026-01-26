import { createClient } from '@/lib/supabase/server';

export type LoginAttemptStatus = 'success' | 'failed' | 'blocked';

export async function logLoginAttempt(
    username: string,
    ip: string,
    userAgent: string,
    status: LoginAttemptStatus,
    reason?: string
) {
    const timestamp = new Date().toISOString();

    // Логирование в консоль (попадет в логи сервера)
    const logMessage = `[${timestamp}] Login ${status.toUpperCase()}: username="${username}", ip="${ip}", userAgent="${userAgent}"${reason ? `, reason="${reason}"` : ''}`;

    if (status === 'success') {
        console.log('✅', logMessage);
    } else if (status === 'blocked') {
        console.warn('🚫', logMessage);
    } else {
        console.warn('❌', logMessage);
    }

    // Сохранение в Supabase (опционально, если таблица существует)
    try {
        const supabase = await createClient();
        await supabase.from('admin_login_attempts').insert({
            username,
            ip_address: ip,
            user_agent: userAgent,
            status,
            reason,
            attempted_at: timestamp,
        });
    } catch (error) {
        // Если таблицы нет - ничего страшного, логи в консоли есть
        console.debug('Failed to save login attempt to database:', error);
    }
}

export function getClientIp(request: Request): string {
    // Проверяем различные заголовки для получения реального IP
    const forwarded = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const cfConnectingIp = request.headers.get('cf-connecting-ip'); // Cloudflare

    if (forwarded) {
        return forwarded.split(',')[0].trim();
    }

    if (realIp) {
        return realIp;
    }

    if (cfConnectingIp) {
        return cfConnectingIp;
    }

    return 'unknown';
}
