// Simple in-memory rate limiter
type RateLimitEntry = {
    attempts: number;
    resetAt: number;
    blockedUntil?: number;
};

class RateLimiter {
    private attempts: Map<string, RateLimitEntry> = new Map();
    private maxAttempts: number;
    private windowMs: number;
    private blockDurationMs: number;

    constructor(maxAttempts = 5, windowMs = 15 * 60 * 1000, blockDurationMs = 30 * 60 * 1000) {
        this.maxAttempts = maxAttempts; // 5 попыток
        this.windowMs = windowMs; // 15 минут
        this.blockDurationMs = blockDurationMs; // Блокировка на 30 минут
    }

    check(identifier: string): { allowed: boolean; remainingAttempts?: number; blockedUntil?: Date } {
        const now = Date.now();
        const entry = this.attempts.get(identifier);

        // Проверка блокировки
        if (entry?.blockedUntil && entry.blockedUntil > now) {
            return {
                allowed: false,
                blockedUntil: new Date(entry.blockedUntil),
            };
        }

        // Сброс если прошло время окна
        if (!entry || entry.resetAt < now) {
            this.attempts.set(identifier, {
                attempts: 0,
                resetAt: now + this.windowMs,
            });
            return { allowed: true, remainingAttempts: this.maxAttempts };
        }

        // Проверка лимита
        if (entry.attempts >= this.maxAttempts) {
            // Блокируем IP
            entry.blockedUntil = now + this.blockDurationMs;
            this.attempts.set(identifier, entry);
            return {
                allowed: false,
                blockedUntil: new Date(entry.blockedUntil),
            };
        }

        return {
            allowed: true,
            remainingAttempts: this.maxAttempts - entry.attempts,
        };
    }

    recordAttempt(identifier: string): void {
        const now = Date.now();
        const entry = this.attempts.get(identifier);

        if (!entry || entry.resetAt < now) {
            this.attempts.set(identifier, {
                attempts: 1,
                resetAt: now + this.windowMs,
            });
        } else {
            entry.attempts++;
            this.attempts.set(identifier, entry);
        }
    }

    reset(identifier: string): void {
        this.attempts.delete(identifier);
    }

    // Очистка старых записей (запускать периодически)
    cleanup(): void {
        const now = Date.now();
        for (const [key, entry] of this.attempts.entries()) {
            if (entry.resetAt < now && (!entry.blockedUntil || entry.blockedUntil < now)) {
                this.attempts.delete(key);
            }
        }
    }
}

// Singleton instance
export const loginRateLimiter = new RateLimiter(5, 15 * 60 * 1000, 30 * 60 * 1000);

// Очистка каждые 30 минут
if (typeof window === 'undefined') {
    setInterval(() => loginRateLimiter.cleanup(), 30 * 60 * 1000);
}
