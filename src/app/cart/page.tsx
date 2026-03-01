"use client";

import { useCart } from "@/store/cart";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Minus, Plus } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="font-display text-4xl font-bold mb-4">Корзина пуста</h1>
        <p className="text-muted-foreground mb-8">
          Добавьте товары из каталога
        </p>
        <Link href="/catalog">
          <Button size="lg">Перейти в каталог</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-display text-4xl font-bold">Корзина</h1>
        <Button variant="outline" onClick={clearCart}>
          Очистить корзину
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={item.product.id}>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="w-24 h-24 bg-secondary rounded flex-shrink-0">
                    {item.product.images[0] ? (
                      <img
                        src={item.product.images[0]}
                        alt={item.product.title}
                        className="w-full h-full object-cover rounded"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                        Нет фото
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{item.product.title}</h3>
                    {item.product.brand && (
                      <p className="text-sm text-muted-foreground mb-2">
                        {item.product.brand}
                      </p>
                    )}

                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-12 text-center">{item.quantity}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          disabled={item.quantity >= item.product.stock}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      <span className="font-bold text-lg ml-auto">
                        {(item.product.price * item.quantity).toLocaleString()} ₽
                      </span>

                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeItem(item.product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="font-semibold text-xl mb-4">Итого</h2>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Товары:</span>
                  <span>{getTotal().toLocaleString()} ₽</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Доставка:</span>
                  <span>Рассчитается при оформлении</span>
                </div>
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between items-baseline">
                  <span className="font-semibold text-lg">Всего:</span>
                  <span className="font-bold text-2xl">{getTotal().toLocaleString()} ₽</span>
                </div>
              </div>

              <Link href="/checkout" className="block">
                <Button size="lg" className="w-full">
                  Оформить заказ
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
