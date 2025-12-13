import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  // Отключаем оптимизацию изображений
  images: {
    unoptimized: true,
  },
};

export default nextConfig;