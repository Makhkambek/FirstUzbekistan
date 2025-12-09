"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { cn, getTierLabel } from "@/lib/utils";
import { Sponsor } from "@/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SponsorCardProps {
    sponsor: Sponsor;
    index?: number;
}

const tierStyles = {
    platinum: "border-gray-300 dark:border-gray-600 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900",
    gold: "border-yellow-400 dark:border-yellow-600 bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20",
    silver: "border-gray-400 dark:border-gray-500 bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-800/50 dark:to-slate-800/50",
    bronze: "border-orange-400 dark:border-orange-600 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20",
    partner: "border-blue-400 dark:border-blue-600 bg-gradient-to-br from-blue-50 to-sky-50 dark:from-blue-900/20 dark:to-sky-900/20",
};

export function SponsorCard({ sponsor, index = 0 }: SponsorCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
        >
            <a
                href={sponsor.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
            >
                <Card
                    className={cn(
                        "group relative overflow-hidden p-6 transition-all duration-300 hover:shadow-lg border-2",
                        tierStyles[sponsor.tier]
                    )}
                >
                    {/* Logo */}
                    <div className="relative mx-auto h-20 w-40 flex items-center justify-center">
                        {sponsor.logo_url ? (
                            <img
                                src={sponsor.logo_url}
                                alt={sponsor.name}
                                className="max-h-full max-w-full object-contain"
                            />
                        ) : (
                            <div className="text-2xl font-bold text-muted-foreground">
                                {sponsor.name}
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="mt-4 text-center">
                        <Badge variant="outline" className="mb-2">
                            {getTierLabel(sponsor.tier)}
                        </Badge>
                        <h3 className="font-semibold">{sponsor.name}</h3>
                        {sponsor.description && (
                            <p className="mt-2 text-sm text-muted-foreground">
                                {sponsor.description}
                            </p>
                        )}
                    </div>

                    {/* External link indicator */}
                    <div className="absolute right-4 top-4 opacity-0 transition-opacity group-hover:opacity-100">
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </div>
                </Card>
            </a>
        </motion.div>
    );
}