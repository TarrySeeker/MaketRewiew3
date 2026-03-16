"use client";

import Link from "next/link";
import { Wrench, ShoppingCart, Search } from "lucide-react";
import { useCart } from "@/store/cart";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export function Header() {
  const itemCount = useCart((state) => state.getItemCount());
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 border-b-4 border-zinc-900 ${scrolled
        ? "bg-white/90 backdrop-blur-md py-2 shadow-brutal"
        : "bg-white py-4"
        }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 gap-4 sm:gap-8">
        <Link href="/" className="flex items-center gap-2 sm:gap-3 flex-shrink-0 group">
          <div className="p-1.5 sm:p-2 border-2 border-zinc-900 bg-zinc-100 group-hover:bg-primary transition-colors">
            <Wrench className="h-4 w-4 sm:h-5 sm:w-5 text-zinc-900 group-hover:text-white transition-colors" />
          </div>
          <span className="font-display text-lg sm:text-2xl font-bold tracking-wider sm:tracking-widest text-zinc-900 group-hover:text-primary transition-colors">ИНСТРУМЕНТ</span>
        </Link>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 max-w-xl hidden md:block">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Поиск деталей и инструмента..."
              className="w-full pl-12 pr-4 py-3 border-2 border-zinc-300 rounded-none bg-zinc-50 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900 focus:bg-white transition-all font-mono shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>

        <nav className="hidden lg:flex items-center gap-8">
          <Link href="/catalog" className="text-sm font-sans font-bold uppercase tracking-widest text-zinc-600 hover:text-zinc-900 hover:underline decoration-primary decoration-2 underline-offset-8 transition-all">
            КАТАЛОГ
          </Link>
          <Link href="/about" className="text-sm font-sans font-bold uppercase tracking-widest text-zinc-600 hover:text-zinc-900 hover:underline decoration-primary decoration-2 underline-offset-8 transition-all">
            О компании
          </Link>
          <Link href="/contacts" className="text-sm font-sans font-bold uppercase tracking-widest text-zinc-600 hover:text-zinc-900 hover:underline decoration-primary decoration-2 underline-offset-8 transition-all">
            Контакты
          </Link>
        </nav>

        <div className="flex items-center gap-6">
          <Link href="/search" className="md:hidden text-zinc-600 hover:text-zinc-900">
            <Search className="h-5 w-5" />
          </Link>

          <Link href="/cart" className="relative text-zinc-600 hover:text-zinc-900 transition-colors group">
            <ShoppingCart className="h-6 w-6 group-hover:text-primary transition-colors" />
            {itemCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-3 -right-3 flex h-5 w-5 items-center justify-center rounded-none bg-primary text-white text-[10px] font-bold font-mono shadow-sm"
              >
                {itemCount}
              </motion.span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
