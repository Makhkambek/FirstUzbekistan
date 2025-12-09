import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./container";

interface SectionProps extends HTMLAttributes<HTMLElement> {
    container?: boolean;
    containerSize?: "default" | "sm" | "lg" | "full";
}

export function Section({
    className,
    container = true,
    containerSize = "default",
    children,
    ...props
}: SectionProps) {
    return (
        <section
            className={cn("py-16 md:py-24 lg:py-32", className)}
            {...props}
        >
            {container ? (
                <Container size={containerSize}>{children}</Container>
            ) : (
                children
            )}
        </section>
    );
}

interface SectionHeaderProps extends HTMLAttributes<HTMLDivElement> {
    title: string;
    description?: string;
    centered?: boolean;
}

export function SectionHeader({
    title,
    description,
    centered = true,
    className,
    ...props
}: SectionHeaderProps) {
    return (
        <div
            className={cn(
                "mb-12 md:mb-16",
                centered && "text-center",
                className
            )}
            {...props}
        >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                {title}
            </h2>
            {description && (
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                    {description}
                </p>
            )}
        </div>
    );
}