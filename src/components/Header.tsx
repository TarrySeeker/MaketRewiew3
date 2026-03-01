"use client";

import Link from "next/link";
import { Wrench, ShoppingCart, Search } from "lucide-react";
import { useCart } from "@/store/cart";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function Header() {
  const itemCount = useCart((state) => state.getItemCount());
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 gap-4">
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <Wrench className="h-6 w-6 text-primary" />
          <span className="font-display text-xl font-bold">ИНСТРУМЕНТ</span>
        </Link>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Поиск товаров..."
              className="w-full pl-10 pr-4 py-2 border rounded bg-secondary text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>

        <nav className="hidden lg:flex items-center gap-6">
          <Link href="/catalog" className="text-sm hover:text-primary transition">
            Каталог
          </Link>
          <Link href="/about" className="text-sm hover:text-primary transition">
            О нас
          </Link>
          <Link href="/contacts" className="text-sm hover:text-primary transition">
            Контакты
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/search" className="md:hidden">
            <Search className="h-5 w-5" />
          </Link>

          <Link href="/cart" className="relative">
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
