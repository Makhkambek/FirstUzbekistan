"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAVIGATION, COMPETITIONS, RESOURCES } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ThemeToggle } from "@/components/theme-toggle";
import { NavigationDropdown, NavigationDropdownMobile } from "./navigation-dropdown";

export function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
            <Container>
                <nav className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" scroll={true} className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-ftc-red">
                            <span className="text-lg font-bold text-white">F</span>
                        </div>
                        <span className="hidden font-semibold sm:inline-block">
                            FIRST Uzbekistan
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden items-center gap-1 md:flex">
                        {NAVIGATION.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                scroll={true}
                                className={cn(
                                    "flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent",
                                    pathname === item.href
                                        ? "text-ftc-red"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <NavigationDropdown label="Соревнования" items={COMPETITIONS} />
                        <NavigationDropdown label="Ресурсы" items={RESOURCES} />
                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-2">
                        <ThemeToggle />
                        <Button asChild className="hidden sm:inline-flex">
                            <Link href="/apply" scroll={true}>Подать заявку</Link>
                        </Button>

                        {/* Mobile menu button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </Button>
                    </div>
                </nav>

                {/* Mobile Navigation */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden border-t border-border md:hidden"
                        >
                            <div className="space-y-1 py-4">
                                {NAVIGATION.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        scroll={true}
                                        onClick={() => setIsOpen(false)}
                                        className={cn(
                                            "block rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent",
                                            pathname === item.href
                                                ? "text-ftc-red"
                                                : "text-muted-foreground"
                                        )}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                                <NavigationDropdownMobile label="Соревнования" items={COMPETITIONS} />
                                <NavigationDropdownMobile label="Ресурсы" items={RESOURCES} />
                                <div className="pt-4 px-3">
                                    <Button asChild className="w-full">
                                        <Link href="/apply" scroll={true} onClick={() => setIsOpen(false)}>
                                            Подать заявку
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Container>
        </header>
    );
}