"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/store/cart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { CdekWidget } from "@/components/checkout/CdekWidget";

interface SelectedDelivery {
  pointCode: string;
  tariffCode: number;
  deliverySum: number;
  address: string;
  time: string;
}

export default function CheckoutPage() {
  const { items, getTotal, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [calculatingDelivery, setCalculatingDelivery] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [deliveryData, setDeliveryData] = useState<SelectedDelivery | null>(null);

  useEffect(() => {
    if (items.length === 0) {
      router.push("/cart");
    }
  }, [items, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!deliveryData) {
      alert("Пожалуйста, выберите пункт выдачи СДЭК на карте.");
      return;
    }

    // Сохраняем данные для платежной страницы
    const checkoutData = {
      customer: formData,
      delivery: deliveryData,
      total: getTotal() + deliveryData.deliverySum,
    };

    if (typeof window !== "undefined") {
      sessionStorage.setItem("checkoutData", JSON.stringify(checkoutData));
    }

    // Редирект на моковую страницу оплаты
    router.push("/payment");
  };

  if (items.length === 0) {
    return null;
  }

  const subtotal = getTotal();
  const deliveryCost = deliveryData?.deliverySum || 0;
  const total = subtotal + deliveryCost;

  const totalWeight = items.reduce((sum, item) => sum + (item.product.weight || 500) * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-display text-4xl font-bold mb-8">Оформление заказа</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Контактные данные */}
            <Card>
              <CardHeader>
                <CardTitle>Контактные данные</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">ФИО *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border rounded bg-background"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Телефон *</label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-2 border rounded bg-background"
                    value={formData.phone}
                    onChange={(e) => {
                      let val = e.target.value.replace(/\D/g, '');
                      if (val.startsWith('8')) val = '7' + val.slice(1);
                      if (val.startsWith('7')) val = val.slice(0, 11);
                      else val = val.slice(0, 10);
                      let formatted = '';
                      if (val.length > 0) formatted = '+7';
                      if (val.length > 1) formatted += ' (' + val.slice(1, 4);
                      if (val.length > 4) formatted += ') ' + val.slice(4, 7);
                      if (val.length > 7) formatted += '-' + val.slice(7, 9);
                      if (val.length > 9) formatted += '-' + val.slice(9, 11);
                      if (val.length === 1) formatted = '+7';
                      setFormData({ ...formData, phone: formatted });
                    }}
                    placeholder="+7 (___) ___-__-__"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-2 border rounded bg-background"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* CDEK Widget */}
            <Card className="border-2 border-zinc-900 shadow-brutal rounded-none bg-zinc-50 overflow-hidden">
              <CardHeader className="border-b-2 border-zinc-900 bg-zinc-100">
                <CardTitle className="font-display uppercase tracking-widest text-zinc-900">Выберите пункт выдачи СДЭК *</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <CdekWidget onSelect={(data) => setDeliveryData(data)} weight={totalWeight} />
              </CardContent>
            </Card>

            {/* Выбранный пункт выдачи */}
            {deliveryData && (
              <Card className="border-2 border-primary shadow-brutal rounded-none bg-primary/5">
                <CardContent className="p-6">
                  <h3 className="font-display font-bold text-lg mb-2 uppercase text-primary">Выбранный ПВЗ:</h3>
                  <p className="font-mono text-zinc-900 font-bold">{deliveryData.address}</p>
                  <p className="text-sm text-zinc-600 font-mono mt-2">Код: {deliveryData.pointCode}</p>
                  <p className="text-sm text-zinc-600 font-mono">Срок доставки: {deliveryData.time}</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Итого */}
          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Ваш заказ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="flex-1">
                      {item.product.title} × {item.quantity}
                    </span>
                    <span className="font-medium">
                      {(item.product.price * item.quantity).toLocaleString()} ₽
                    </span>
                  </div>
                ))}

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Товары:</span>
                    <span>{subtotal.toLocaleString()} ₽</span>
                  </div>
                  <div className="flex justify-between text-sm font-mono text-zinc-600">
                    <span>Доставка:</span>
                    <span>
                      {deliveryData
                        ? `${deliveryCost.toLocaleString()} ₽`
                        : "Выберите на карте"}
                    </span>
                  </div>
                </div>

                <div className="border-t-2 border-zinc-900 pt-4">
                  <div className="flex justify-between items-baseline text-zinc-900">
                    <span className="font-display font-bold uppercase tracking-widest">Итого:</span>
                    <span className="font-mono font-bold text-2xl">
                      {total.toLocaleString()} ₽
                    </span>
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={!deliveryData}
                >
                  Перейти к оплате
                </Button>

                {!deliveryData && (
                  <p className="text-xs font-mono text-center text-primary font-bold mt-4 uppercase">
                    Выберите пункт выдачи на карте
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
