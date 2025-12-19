"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Users as UsersIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { TeamMemberCard } from "@/components/features/team-member-card";
import { getActiveTeamMembers } from "@/lib/supabase-data";
import type { Database } from "@/types/database";

type TeamMember = Database['public']['Tables']['team_members']['Row'];

export default function TeamPage() {
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);

    // Scroll to top when component mounts - useLayoutEffect runs before paint
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    }, []);

    useEffect(() => {
        async function fetchData() {
            const members = await getActiveTeamMembers();
            setTeamMembers(members);
            setLoading(false);
        }
        fetchData();
    }, []);

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
                {loading ? (
                    <div className="text-center text-muted-foreground">Загрузка...</div>
                ) : teamMembers.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {teamMembers.map((member, index) => (
                            <TeamMemberCard key={member.id} member={member} index={index} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-muted-foreground">
                        Информация о команде скоро появится...
                    </div>
                )}
            </Section>
        </>
    );
}