"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, Mail } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SponsorCard } from "@/components/features/sponsor-card";
import { getActiveSponsors } from "@/lib/supabase-data";
import type { Database } from "@/types/database";

type Sponsor = Database['public']['Tables']['sponsors']['Row'];

export default function SponsorsPage() {
    const [sponsors, setSponsors] = useState<Sponsor[]>([]);
    const [loading, setLoading] = useState(true);

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, []);

    useEffect(() => {
        async function fetchData() {
            const sponsorsData = await getActiveSponsors();
            setSponsors(sponsorsData);
            setLoading(false);
        }
        fetchData();
    }, []);

    // Group by tier
    const sponsorsByTier = {
        platinum: sponsors.filter(s => s.tier === "platinum"),
        gold: sponsors.filter(s => s.tier === "gold"),
        silver: sponsors.filter(s => s.tier === "silver"),
        bronze: sponsors.filter(s => s.tier === "bronze"),
        partner: sponsors.filter(s => s.tier === "partner"),
    };

    return (
        <>
            <Section className="bg-muted/30 py-16 md:py-24">
                <Container size="sm">
                    <Link
                        href="/about"
                        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        О команде
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <Badge className="mb-4">
                            <Heart className="mr-1 h-3 w-3" />
                            Спонсоры
                        </Badge>
                        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                            Наши спонсоры
                        </h1>
                        <p className="mt-6 text-lg text-muted-foreground">
                            Благодарим компании и организации, поддерживающие нашу миссию
                        </p>
                    </motion.div>
                </Container>
            </Section>

            {loading ? (
                <Section>
                    <div className="text-center text-muted-foreground">Загрузка...</div>
                </Section>
            ) : sponsors.length === 0 ? (
                <Section>
                    <div className="text-center text-muted-foreground">
                        Информация о спонсорах скоро появится...
                    </div>
                </Section>
            ) : (
                <>
                    {/* Platinum */}
                    {sponsorsByTier.platinum.length > 0 && (
                        <Section>
                            <SectionHeader title="Платиновые спонсоры" centered={false} />
                            <div className="grid gap-6 md:grid-cols-2">
                                {sponsorsByTier.platinum.map((sponsor, index) => (
                                    <SponsorCard key={sponsor.id} sponsor={sponsor} index={index} />
                                ))}
                            </div>
                        </Section>
                    )}

                    {/* Gold */}
                    {sponsorsByTier.gold.length > 0 && (
                        <Section className={sponsorsByTier.platinum.length > 0 ? "bg-muted/30" : ""}>
                            <SectionHeader title="Золотые спонсоры" centered={false} />
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {sponsorsByTier.gold.map((sponsor, index) => (
                                    <SponsorCard key={sponsor.id} sponsor={sponsor} index={index} />
                                ))}
                            </div>
                        </Section>
                    )}

                    {/* Silver */}
                    {sponsorsByTier.silver.length > 0 && (
                        <Section>
                            <SectionHeader title="Серебряные спонсоры" centered={false} />
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                {sponsorsByTier.silver.map((sponsor, index) => (
                                    <SponsorCard key={sponsor.id} sponsor={sponsor} index={index} />
                                ))}
                            </div>
                        </Section>
                    )}

                    {/* Bronze & Partners */}
                    {(sponsorsByTier.bronze.length > 0 || sponsorsByTier.partner.length > 0) && (
                        <Section className="bg-muted/30">
                            <SectionHeader title="Партнёры" centered={false} />
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                {[...sponsorsByTier.bronze, ...sponsorsByTier.partner].map((sponsor, index) => (
                                    <SponsorCard key={sponsor.id} sponsor={sponsor} index={index} />
                                ))}
                            </div>
                        </Section>
                    )}
                </>
            )}

            {/* Become a sponsor */}
            <Section className="bg-gradient-to-br from-ftc-red/10 to-ftc-blue/10">
                <Container size="sm">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold sm:text-3xl">
                            Хотите стать спонсором?
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                            Мы всегда открыты для новых партнёрств. Ваша поддержка помогает
                            нам развивать робототехническое образование в Узбекистане и
                            вдохновлять следующее поколение инженеров.
                        </p>
                        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                            <Button asChild size="lg">
                                <a href="mailto:teshabayevmakhkambek@gmail.com">
                                    <Mail className="mr-2 h-5 w-5" />
                                    Связаться с нами
                                </a>
                            </Button>
                            <Button asChild variant="outline" size="lg">
                                <a href="https://t.me/firstuzbekistan" target="_blank" rel="noopener noreferrer">
                                    Telegram
                                </a>
                            </Button>
                        </div>
                    </div>
                </Container>
            </Section>
        </>
    );
}