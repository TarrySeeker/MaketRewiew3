"use client";

import { useState } from "react";
import { useCart } from "@/store/cart";
import { motion } from "framer-motion";
import { Check, ShoppingCart } from "lucide-react";
import { Product } from "@/lib/types";

export function AddToCartButton({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);
  const addItem = useCart((state) => state.addItem);

  const handleAdd = () => {
    if (added || product.stock === 0) return;
    addItem(product, 1);
    setAdded(true);
    // Cold status resets after a while so user can add more if needed
    setTimeout(() => setAdded(false), 3000);
  };

  // Cold Status Success State (User Choice 2: A)
  if (added) {
    return (
      <div className="w-full md:w-auto h-16 px-12 font-display uppercase tracking-widest text-lg border-2 border-zinc-300 bg-transparent text-zinc-400 flex items-center justify-center cursor-not-allowed relative">
        <Check className="mr-3 h-6 w-6" />
        В АРСЕНАЛЕ
        {/* Decorative disabled corners */}
        <span className="absolute top-1 left-1 w-2 h-2 border-t border-l border-zinc-300"></span>
        <span className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-zinc-300"></span>
      </div>
    );
  }

  // Concrete Block Idle State + Spring Only micro-interaction (User Choice 1: A, Choice 3: A)
  return (
    <motion.button
      onClick={handleAdd}
      disabled={product.stock === 0}
      className="w-full md:w-auto h-16 px-12 font-display uppercase tracking-widest text-lg font-bold border-2 border-zinc-900 bg-zinc-200 text-zinc-900 flex items-center justify-center relative shadow-brutal disabled:opacity-50 disabled:cursor-not-allowed"
      whileHover={{ y: -2, boxShadow: "-6px 6px 0px #09090B" }}
      whileTap={{ y: 4, x: -4, boxShadow: "0px 0px 0px #09090B" }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <ShoppingCart className="mr-3 h-6 w-6" />
      В КОРЗИНУ
      {/* Decorative corners */}
      <span className="absolute top-1 left-1 w-2 h-2 border-t border-l border-zinc-900"></span>
      <span className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-zinc-900"></span>
    </motion.button>
  );
}
