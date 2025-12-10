"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function LenisScroll() {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2, // Увеличил с 1.2 до 1.8 (чем больше, тем плавнее)
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Плавная easing функция
            wheelMultiplier: 1, // Уменьшил чувствительность колеса мыши
            touchMultiplier: 1.3, // Чувствительность тач-скролла
            infinite: false,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return null;
}