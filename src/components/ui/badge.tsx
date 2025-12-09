import { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
    {
        variants: {
            variant: {
                default: "bg-ftc-red/10 text-ftc-red",
                secondary: "bg-ftc-blue/10 text-ftc-blue",
                engineering: "bg-engineering-100 text-engineering-700 dark:bg-engineering-900/30 dark:text-engineering-400",
                programming: "bg-programming-100 text-programming-700 dark:bg-programming-900/30 dark:text-programming-400",
                success: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
                warning: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
                danger: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
                outline: "border border-border text-foreground",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

export interface BadgeProps
    extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <span className={cn(badgeVariants({ variant }), className)} {...props} />
    );
}

export { Badge, badgeVariants };