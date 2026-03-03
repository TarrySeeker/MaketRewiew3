import type { Metadata } from "next";
import { Oswald, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-jetbrains",
});

const oswald = Oswald({
  subsets: ["latin", "cyrillic"],
  variable: "--font-oswald",
});

export const metadata: Metadata = {
  title: "Инструмент — профессиональный инструмент",
  description: "Интернет-магазин ручного и электроинструмента",
};

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LenisProvider } from "@/components/providers/LenisProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${jetbrainsMono.variable} ${oswald.variable} font-sans min-h-screen flex flex-col bg-background text-foreground`}>
        <LenisProvider>
          <Header />
          <main className="flex-1 min-h-screen pt-[72px] md:pt-[88px]">{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
