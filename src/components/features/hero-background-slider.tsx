"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HeroBackgroundSliderProps {
  images: string[];
  interval?: number; // in milliseconds
}

export function HeroBackgroundSlider({
  images,
  interval = 15000 // default 15 seconds
}: HeroBackgroundSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className="absolute inset-0 -z-10">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${images[currentIndex]})`,
            }}
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40" />
          {/* Gradient overlay for smooth blending */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
