import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { TopLogos } from "@/components/layout/top-logos";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { LenisScroll } from "@/components/lenis-scroll";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "FIRST Uzbekistan",
  description: "FIRST Tech Challenge Uzbekistan - Робототехника, инженерия и программирование",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <LenisScroll />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}