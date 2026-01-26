-- Таблица для логирования попыток входа в админку
CREATE TABLE IF NOT EXISTS admin_login_attempts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    ip_address VARCHAR(45) NOT NULL,
    user_agent TEXT,
    status VARCHAR(20) NOT NULL CHECK (status IN ('success', 'failed', 'blocked')),
    reason TEXT,
    attempted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Индексы для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_admin_login_attempts_ip ON admin_login_attempts(ip_address);
CREATE INDEX IF NOT EXISTS idx_admin_login_attempts_status ON admin_login_attempts(status);
CREATE INDEX IF NOT EXISTS idx_admin_login_attempts_attempted_at ON admin_login_attempts(attempted_at DESC);
CREATE INDEX IF NOT EXISTS idx_admin_login_attempts_username ON admin_login_attempts(username);

-- Row Level Security (RLS)
ALTER TABLE admin_login_attempts ENABLE ROW LEVEL SECURITY;

-- Политика: Только сервисная роль может вставлять записи
CREATE POLICY "Service role can insert login attempts"
    ON admin_login_attempts
    FOR INSERT
    TO service_role
    WITH CHECK (true);

-- Политика: Только сервисная роль может читать логи
CREATE POLICY "Service role can read login attempts"
    ON admin_login_attempts
    FOR SELECT
    TO service_role
    USING (true);

-- Комментарии к таблице и колонкам
COMMENT ON TABLE admin_login_attempts IS 'Логи попыток входа в административную панель';
COMMENT ON COLUMN admin_login_attempts.username IS 'Имя пользователя, пытавшегося войти';
COMMENT ON COLUMN admin_login_attempts.ip_address IS 'IP адрес, с которого была попытка входа';
COMMENT ON COLUMN admin_login_attempts.user_agent IS 'User-Agent браузера';
COMMENT ON COLUMN admin_login_attempts.status IS 'Статус попытки: success, failed, или blocked';
COMMENT ON COLUMN admin_login_attempts.reason IS 'Причина неудачи или блокировки';
COMMENT ON COLUMN admin_login_attempts.attempted_at IS 'Дата и время попытки входа';
