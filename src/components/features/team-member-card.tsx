"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Send } from "lucide-react";
import { getInitials, getRoleLabel } from "@/lib/utils";
import { TeamMember } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TeamMemberCardProps {
    member: TeamMember;
    index?: number;
}

export function TeamMemberCard({ member, index = 0 }: TeamMemberCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
        >
            <Card className="overflow-hidden text-center hover:shadow-lg transition-shadow">
                {/* Avatar */}
                <div className="relative mx-auto mt-6 h-24 w-24 overflow-hidden rounded-full bg-muted">
                    {member.image_url ? (
                        <img
                            src={member.image_url}
                            alt={member.name}
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-ftc-red to-ftc-blue text-2xl font-bold text-white">
                            {getInitials(member.name)}
                        </div>
                    )}
                </div>

                <CardContent className="pt-4 pb-6">
                    <Badge variant="outline" className="mb-2">
                        {getRoleLabel(member.role)}
                    </Badge>
                    <h3 className="font-semibold text-lg">{member.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                        {member.bio}
                    </p>

                    {/* Social Links */}
                    {(member.github_url || member.linkedin_url || member.telegram_url) && (
                        <div className="mt-4 flex justify-center gap-3">
                            {member.github_url && (
                                <a
                                    href={member.github_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                    aria-label="GitHub"
                                >
                                    <Github className="h-5 w-5" />
                                </a>
                            )}
                            {member.linkedin_url && (
                                <a
                                    href={member.linkedin_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                    aria-label="LinkedIn"
                                >
                                    <Linkedin className="h-5 w-5" />
                                </a>
                            )}
                            {member.telegram_url && (
                                <a
                                    href={member.telegram_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                    aria-label="Telegram"
                                >
                                    <Send className="h-5 w-5" />
                                </a>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    );
}