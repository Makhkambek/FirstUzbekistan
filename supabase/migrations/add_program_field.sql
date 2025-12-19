-- Add program field to subcategories table
ALTER TABLE subcategories
ADD COLUMN IF NOT EXISTS program TEXT CHECK (program IN ('ftc', 'fll')) DEFAULT 'ftc';

-- Add program field to lessons table
ALTER TABLE lessons
ADD COLUMN IF NOT EXISTS program TEXT CHECK (program IN ('ftc', 'fll')) DEFAULT 'ftc';

-- Update existing records to have 'ftc' as default (they're all FTC for now)
UPDATE subcategories SET program = 'ftc' WHERE program IS NULL;
UPDATE lessons SET program = 'ftc' WHERE program IS NULL;

-- Make program field NOT NULL after setting defaults
ALTER TABLE subcategories ALTER COLUMN program SET NOT NULL;
ALTER TABLE lessons ALTER COLUMN program SET NOT NULL;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_subcategories_program ON subcategories(program);
CREATE INDEX IF NOT EXISTS idx_subcategories_program_category ON subcategories(program, category);
CREATE INDEX IF NOT EXISTS idx_lessons_program ON lessons(program);
CREATE INDEX IF NOT EXISTS idx_lessons_program_status ON lessons(program, status);
