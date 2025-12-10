"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    Video,
    Bell,
    Users,
    Heart,
    Settings,
    LogOut,
    Menu,
    X,
    FolderOpen  // ← добавьте
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import Cookies from "js-cookie";
import { useState } from "react";

const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Уроки", href: "/admin/lessons", icon: Video },
    { name: "Объявления", href: "/admin/announcements", icon: Bell },
    { name: "Ресурсы", href: "/admin/resources", icon: FolderOpen },
    { name: "Команда", href: "/admin/team", icon: Users },
    { name: "Спонсоры", href: "/admin/sponsors", icon: Heart },
    { name: "Настройки", href: "/admin/settings", icon: Settings },
];

export function AdminNav() {
    const pathname = usePathname();
    const router = useRouter();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        Cookies.remove("admin-authenticated");
        router.push("/admin/login");
    };

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-border bg-card px-6 pb-4">
                    {/* Logo */}
                    <div className="flex h-16 shrink-0 items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ftc-red">
                            <span className="text-lg font-bold text-white">F</span>
                        </div>
                        <div>
                            <p className="font-semibold">FIRST Uzbekistan</p>
                            <p className="text-xs text-muted-foreground">CMS Admin</p>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex flex-1 flex-col">
                        <ul role="list" className="flex flex-1 flex-col gap-y-7">
                            <li>
                                <ul role="list" className="-mx-2 space-y-1">
                                    {navigation.map((item) => (
                                        <li key={item.name}>
                                            <Link
                                                href={item.href}
                                                className={cn(
                                                    pathname === item.href
                                                        ? "bg-accent text-ftc-red"
                                                        : "text-muted-foreground hover:text-foreground hover:bg-accent",
                                                    "group flex gap-x-3 rounded-lg p-3 text-sm font-medium transition-colors"
                                                )}
                                            >
                                                <item.icon className="h-5 w-5 shrink-0" />
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>

                            {/* Bottom actions */}
                            <li className="mt-auto space-y-2">
                                <div className="flex items-center justify-between px-3">
                                    <span className="text-sm text-muted-foreground">Тема</span>
                                    <ThemeToggle />
                                </div>
                                <Button
                                    onClick={handleLogout}
                                    variant="outline"
                                    className="w-full justify-start"
                                >
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Выйти
                                </Button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>

            {/* Mobile header */}
            <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-card px-4 py-4 shadow-sm sm:px-6 lg:hidden border-b border-border">
                <button
                    type="button"
                    className="-m-2.5 p-2.5 text-muted-foreground lg:hidden"
                    onClick={() => setMobileMenuOpen(true)}
                >
                    <Menu className="h-6 w-6" />
                </button>
                <div className="flex-1 text-sm font-semibold">FIRST Uzbekistan CMS</div>
                <ThemeToggle />
            </div>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="relative z-50 lg:hidden">
                    <div className="fixed inset-0 bg-black/80" onClick={() => setMobileMenuOpen(false)} />
                    <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-card p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ftc-red">
                                    <span className="text-lg font-bold text-white">F</span>
                                </div>
                                <div>
                                    <p className="font-semibold">FIRST Uzbekistan</p>
                                    <p className="text-xs text-muted-foreground">CMS Admin</p>
                                </div>
                            </div>
                            <button onClick={() => setMobileMenuOpen(false)}>
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                        <nav className="space-y-1">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={cn(
                                        pathname === item.href
                                            ? "bg-accent text-ftc-red"
                                            : "text-muted-foreground hover:text-foreground hover:bg-accent",
                                        "group flex gap-x-3 rounded-lg p-3 text-sm font-medium"
                                    )}
                                >
                                    <item.icon className="h-5 w-5 shrink-0" />
                                    {item.name}
                                </Link>
                            ))}
                            <Button
                                onClick={handleLogout}
                                variant="outline"
                                className="w-full justify-start mt-4"
                            >
                                <LogOut className="mr-2 h-4 w-4" />
                                Выйти
                            </Button>
                        </nav>
                    </div>
                </div>
            )}
        </>
    );
}