"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroOverlay() {
    return (
        <section className="relative min-h-[150vh]">
            <div className="sticky top-0 h-[calc(100vh-8rem)] flex flex-col md:flex-row items-center justify-center md:justify-between px-4 md:px-16 pointer-events-none w-full max-w-[1920px] mx-auto gap-8 md:gap-0 pt-20 md:pt-0">
                {/* Left Side Typography */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="w-full md:w-1/3 text-left pointer-events-auto"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 1 }}
                        className="inline-block mb-6 px-4 py-1.5 border-2 border-zinc-900 bg-zinc-100 text-zinc-900 font-mono text-sm tracking-widest uppercase shadow-brutal"
                    >
                        Industrial Standard
                    </motion.div>

                    <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-4 md:mb-6 tracking-tighter text-primary leading-none uppercase break-words">
                        АБСОЛЮТНЫЙ <br className="hidden sm:block" />
                        <span className="text-zinc-900 underline decoration-8 underline-offset-8">
                            КОНТРОЛЬ
                        </span><br />
                        НАД МАТЕРИАЛОМ
                    </h1>
                </motion.div>

                {/* Right Side Content */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                    className="w-full md:w-1/3 text-left md:text-right flex flex-col md:items-end items-start pointer-events-auto mt-4 md:mt-0"
                >
                    <p className="text-base sm:text-lg md:text-xl text-zinc-600 mb-6 md:mb-10 max-w-md font-sans font-medium bg-zinc-100/90 p-4 md:p-6 border-l-4 md:border-l-0 md:border-r-4 border-primary shadow-brutal text-left">
                        Профессиональный строительный инструмент, созданный для экстремальных нагрузок. Промышленные стандарты качества и безотказность в любых условиях.
                    </p>

                    <Link href="/catalog">
                        <Button size="lg" className="h-14 sm:h-16 px-6 sm:px-12 text-base sm:text-xl border-2 border-zinc-900 rounded-none bg-primary text-white hover:bg-zinc-900 hover:text-white transition-all duration-300 font-display uppercase tracking-widest shadow-brutal hover:translate-y-1 hover:shadow-none w-full sm:w-auto">
                            В КАТАЛОГ СНАРЯЖЕНИЯ
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
