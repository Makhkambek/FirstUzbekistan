"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Users as UsersIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { TeamMemberCard } from "@/components/features/team-member-card";
import { getActiveTeamMembers } from "@/lib/data";

export default function TeamPage() {
    const teamMembers = getActiveTeamMembers();

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
                            <UsersIcon className="mr-1 h-3 w-3" />
                            Команда
                        </Badge>
                        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                            Наша команда
                        </h1>
                        <p className="mt-6 text-lg text-muted-foreground">
                            Познакомьтесь с людьми, которые делают FIRST Uzbekistan
                        </p>
                    </motion.div>
                </Container>
            </Section>

            <Section>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {teamMembers.map((member, index) => (
                        <TeamMemberCard key={member.id} member={member} index={index} />
                    ))}
                </div>
            </Section>

            {/* Join CTA */}
            <Section className="bg-gradient-to-br from-ftc-red to-ftc-blue text-white">
                <Container size="sm">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <h2 className="text-2xl font-bold sm:text-3xl">
                            Хотите присоединиться?
                        </h2>
                        <p className="mt-4 text-lg text-white/80">
                            Мы всегда рады новым участникам, которые разделяют нашу
                            страсть к робототехнике и инновациям.
                        </p>
                        <div className="mt-8">
                            <Link
                                href="/apply"
                                className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 text-base font-medium text-ftc-red transition-colors hover:bg-white/90"
                            >
                                Подать заявку
                            </Link>
                        </div>
                    </motion.div>
                </Container>
            </Section>
        </>
    );
}