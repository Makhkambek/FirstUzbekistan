import { LessonForm } from "@/components/admin/lesson-form";

export default function NewLessonPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Новый урок</h1>
                <p className="text-muted-foreground mt-2">
                    Добавьте новый видеоурок в базу знаний
                </p>
            </div>

            <LessonForm mode="create" />
        </div>
    );
}