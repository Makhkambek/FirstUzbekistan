import Link from "next/link";
import { Github, Instagram, Send, Youtube, Mail } from "lucide-react";
import { Container } from "@/components/ui/container";
import { NAVIGATION, SOCIAL_LINKS } from "@/lib/constants";

const socialIcons = {
    telegram: Send,
    instagram: Instagram,
    youtube: Youtube,
    github: Github,
};

export function Footer() {
    return (
        <footer className="border-t border-border bg-card">
            <Container>
                <div className="py-12 md:py-16">
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {/* Brand */}
                        <div className="lg:col-span-2">
                            <Link href="/" className="flex items-center gap-2">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-ftc-red">
                                    <span className="text-lg font-bold text-white">F</span>
                                </div>
                                <span className="font-semibold">FIRST Uzbekistan</span>
                            </Link>
                            <p className="mt-4 max-w-md text-sm text-muted-foreground">
                                Развиваем молодых инженеров и программистов через участие в
                                международных робототехнических соревнованиях FIRST Tech Challenge.
                            </p>
                            {/* Social Links */}
                            <div className="mt-6 flex gap-4">
                                {Object.entries(SOCIAL_LINKS).map(([key, url]) => {
                                    const Icon = socialIcons[key as keyof typeof socialIcons];
                                    if (!Icon) return null;
                                    return (
                                        <a
                                            key={key}
                                            href={url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-muted-foreground transition-colors hover:text-ftc-red"
                                            aria-label={key}
                                        >
                                            <Icon className="h-5 w-5" />
                                        </a>
                                    );
                                })}
                                <a
                                    href="mailto:teshabayevmakhkambek@gmail.com"
                                    className="text-muted-foreground transition-colors hover:text-ftc-red"
                                    aria-label="email"
                                >
                                    <Mail className="h-5 w-5" />
                                </a>
                            </div>
                        </div>

                        {/* Navigation */}
                        <div>
                            <h4 className="font-semibold">Навигация</h4>
                            <ul className="mt-4 space-y-2">
                                {NAVIGATION.map((item) => (
                                    <li key={item.href}>
                                        <Link
                                            href={item.href}
                                            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h4 className="font-semibold">Контакты</h4>
                            <ul className="mt-4 space-y-2">
                                <li>
                                    <a
                                        href="mailto:teshabayevmakhkambek@gmail.com"
                                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                                    >
                                        Email
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://t.me/firstuzbekistan"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                                    >
                                        Telegram
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-border py-6">
                    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                        <p className="text-sm text-muted-foreground">
                            © {new Date().getFullYear()} FIRST Uzbekistan. Все права защищены.
                        </p>
                    </div>
                </div>
            </Container>
        </footer>
    );
}