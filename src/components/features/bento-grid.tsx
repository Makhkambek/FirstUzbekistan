"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface BentoItemProps {
    title: string;
    description: string;
    icon: LucideIcon;
    className?: string;
    index?: number;
}

export function BentoItem({
    title,
    description,
    icon: Icon,
    className,
    index = 0,
}: BentoItemProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className={cn(
                "group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-ftc-red/50 hover:shadow-lg",
                className
            )}
        >
            <div className="relative z-10">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-ftc-red/10 text-ftc-red transition-colors group-hover:bg-ftc-red group-hover:text-white">
                    <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{description}</p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-ftc-red/5 to-ftc-blue/5 opacity-0 transition-opacity group-hover:opacity-100" />
        </motion.div>
    );
}

interface BentoGridProps {
    children: React.ReactNode;
    className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
    return (
        <div className={cn("grid gap-4 md:grid-cols-2 lg:grid-cols-3", className)}>
            {children}
        </div>
    );
}