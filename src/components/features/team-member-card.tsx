"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Send } from "lucide-react";
import { getInitials, getRoleLabel } from "@/lib/utils";
import type { Database } from "@/types/database";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type TeamMember = Database['public']['Tables']['team_members']['Row'];

interface TeamMemberCardProps {
    member: TeamMember;
    index?: number;
}

export function TeamMemberCard({ member, index = 0 }: TeamMemberCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
        >
            <Card className="group h-full overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                {/* Фото - без ограничений размера */}
                <div className="relative w-full overflow-hidden bg-muted">
                    {member.image_url ? (
                        <img
                            src={member.image_url}
                            alt={member.name}
                            className="w-full h-[400px] object-cover object-top group-hover:scale-105 transition-transform duration-500"
                            style={{ imageRendering: 'auto' }}
                        />
                    ) : (
                        <div className="h-[400px] w-full flex items-center justify-center bg-gradient-to-br from-ftc-red to-ftc-blue text-6xl font-bold text-white">
                            {getInitials(member.name)}
                        </div>
                    )}

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Role badge */}
                    <Badge
                        variant="outline"
                        className="absolute top-4 left-4 bg-background/95 backdrop-blur-sm shadow-md border-border"
                    >
                        {getRoleLabel(member.role)}
                    </Badge>

                    {/* Name overlay */}
                    <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="font-bold text-xl text-white drop-shadow-lg">
                            {member.name}
                        </h3>
                        {member.position && (
                            <p className="text-white/90 text-sm mt-1 font-medium drop-shadow">
                                {member.position}
                            </p>
                        )}
                    </div>
                </div>

                <CardContent className="p-5">
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                        {member.bio}
                    </p>

                    {(member.github_url || member.linkedin_url || member.telegram_url) && (
                        <div className="mt-4 pt-4 border-t border-border flex gap-2">
                            {member.github_url && (
                                <a
                                    href={member.github_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-full bg-muted hover:bg-foreground hover:text-background transition-all duration-200"
                                    aria-label="GitHub"
                                >
                                    <Github className="h-4 w-4" />
                                </a>
                            )}
                            {member.linkedin_url && (
                                <a
                                    href={member.linkedin_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-full bg-muted hover:bg-[#0077B5] hover:text-white transition-all duration-200"
                                    aria-label="LinkedIn"
                                >
                                    <Linkedin className="h-4 w-4" />
                                </a>
                            )}
                            {member.telegram_url && (
                                <a
                                    href={member.telegram_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-full bg-muted hover:bg-[#0088cc] hover:text-white transition-all duration-200"
                                    aria-label="Telegram"
                                >
                                    <Send className="h-4 w-4" />
                                </a>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    );
}