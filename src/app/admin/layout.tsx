import { AdminNav } from "@/components/admin/admin-nav";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen">
            <AdminNav />
            <main className="lg:pl-72">
                <div className="px-4 py-8 sm:px-6 lg:px-8">
                    {children}
                </div>
            </main>
        </div>
    );
}