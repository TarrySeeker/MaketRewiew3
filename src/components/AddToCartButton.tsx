"use client";

import { useState } from "react";
import { useCart } from "@/store/cart";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Check } from "lucide-react";
import { Product } from "@/lib/types";

export function AddToCartButton({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);
  const addItem = useCart((state) => state.addItem);

  const handleAdd = () => {
    addItem(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Button
      size="lg"
      onClick={handleAdd}
      disabled={product.stock === 0 || added}
      className="w-full md:w-auto"
    >
      {added ? (
        <>
          <Check className="mr-2 h-5 w-5" />
          Добавлено
        </>
      ) : (
        <>
          <ShoppingCart className="mr-2 h-5 w-5" />
          В корзину
        </>
      )}
    </Button>
  );
}
