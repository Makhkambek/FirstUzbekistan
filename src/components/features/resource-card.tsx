"use client";

import { motion } from "framer-motion";
import { Download, ExternalLink, Calendar, Tag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Database } from "@/types/database";

type Resource = Database['public']['Tables']['resources']['Row'];

interface ResourceCardProps {
    resource: Resource;
    index?: number;
}

const categoryLabels: Record<string, string> = {
    cad: "CAD Model",
    code: "Code",
    drawing: "Drawing",
    other: "Other",
};

const categoryColors: Record<string, string> = {
    cad: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    code: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    drawing: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    other: "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400",
};

export function ResourceCard({ resource, index = 0 }: ResourceCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
        >
            <Card className="group h-full overflow-hidden hover:shadow-lg transition-all duration-300">
                {/* Preview Image */}
                {resource.preview_url && (
                    <div className="relative aspect-video overflow-hidden bg-muted">
                        <img
                            src={resource.preview_url}
                            alt={resource.title}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                    </div>
                )}

                <CardContent className="p-5">
                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 mb-3">
                        <Badge className={categoryColors[resource.category]}>
                            {categoryLabels[resource.category]}
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {resource.year}
                        </Badge>
                    </div>

                    {/* Title */}
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-ftc-red transition-colors">
                        {resource.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {resource.description}
                    </p>

                    {/* Tags */}
                    {resource.tags && resource.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                            {resource.tags.slice(0, 3).map((tag) => (
                                <span
                                    key={tag}
                                    className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                                >
                                    <Tag className="h-2.5 w-2.5" />
                                    {tag}
                                </span>
                            ))}
                            {resource.tags.length > 3 && (
                                <span className="text-xs text-muted-foreground">
                                    +{resource.tags.length - 3}
                                </span>
                            )}
                        </div>
                    )}

                    {/* Download Button */}
                    <Button asChild className="w-full">
                        <a
                            href={resource.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {resource.category === 'code' ? (
                                <>
                                    <ExternalLink className="mr-2 h-4 w-4" />
                                    Открыть на GitHub
                                </>
                            ) : (
                                <>
                                    <Download className="mr-2 h-4 w-4" />
                                    Скачать
                                </>
                            )}
                        </a>
                    </Button>
                </CardContent>
            </Card>
        </motion.div>
    );
}