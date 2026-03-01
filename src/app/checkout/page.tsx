"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/store/cart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

interface DeliveryPoint {
  code: string;
  name: string;
  location: {
    city: string;
    address: string;
    address_full: string;
  };
  work_time: string;
}

interface Tariff {
  tariff_code: number;
  tariff_name: string;
  delivery_sum: number;
  period_min: number;
  period_max: number;
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
    city: "",
  });

  const [deliveryPoints, setDeliveryPoints] = useState<DeliveryPoint[]>([]);
  const [selectedPoint, setSelectedPoint] = useState<DeliveryPoint | null>(null);
  const [tariffs, setTariffs] = useState<Tariff[]>([]);
  const [selectedTariff, setSelectedTariff] = useState<Tariff | null>(null);

  useEffect(() => {
    if (items.length === 0) {
      router.push("/cart");
    }
  }, [items, router]);

  const handleCityChange = async (city: string) => {
    setFormData({ ...formData, city });
    setSelectedPoint(null);
    setSelectedTariff(null);
    
    if (city.length < 3) {
      setDeliveryPoints([]);
      setTariffs([]);
      return;
    }

    setCalculatingDelivery(true);

    try {
      // Рассчитываем тарифы
      const totalWeight = items.reduce(
        (sum, item) => sum + (item.product.weight || 500) * item.quantity,
        0
      );

      const tariffsRes = await fetch("/api/cdek/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          city,
          weight: totalWeight,
          packages: [
            {
              weight: totalWeight,
              length: 30,
              width: 20,
              height: 10,
            },
          ],
        }),
      });

      const tariffsData = await tariffsRes.json();
      setTariffs(tariffsData.tariffs || []);

      // Загружаем ПВЗ (для примера без city_code, можно добавить справочник городов)
      const pointsRes = await fetch(`/api/cdek/points?postal_code=`);
      const pointsData = await pointsRes.json();
      
      // Фильтруем по городу из введённых данных
      const filtered = (pointsData.points || []).filter((p: DeliveryPoint) =>
        p.location.city.toLowerCase().includes(city.toLowerCase())
      );
      setDeliveryPoints(filtered.slice(0, 20)); // первые 20
    } catch (error) {
      console.error("Delivery calc error:", error);
    } finally {
      setCalculatingDelivery(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedPoint) {
      alert("Выберите пункт выдачи СДЭК");
      return;
    }

    if (!selectedTariff) {
      alert("Выберите тариф доставки");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();

      // Создаём заказ в Supabase
      const { data: order, error } = await supabase
        .from("orders")
        .insert({
          customer_info: {
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            city: formData.city,
            address: selectedPoint.location.address_full,
          },
          items: items.map((item) => ({
            product_id: item.product.id,
            title: item.product.title,
            price: item.product.price,
            quantity: item.quantity,
          })),
          total: getTotal() + selectedTariff.delivery_sum,
          delivery_info: {
            cdek_point_code: selectedPoint.code,
            cdek_tariff_code: selectedTariff.tariff_code,
            delivery_sum: selectedTariff.delivery_sum,
            delivery_period: `${selectedTariff.period_min}-${selectedTariff.period_max} дней`,
          },
          status: "new",
        })
        .select()
        .single();

      if (error) throw error;

      clearCart();
      alert(`Заказ #${order.id.slice(0, 8)} успешно оформлен!\n\nМы свяжемся с вами в ближайшее время.`);
      router.push("/");
    } catch (error: any) {
      console.error("Order creation error:", error);
      alert("Ошибка при создании заказа: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return null;
  }

  const subtotal = getTotal();
  const deliveryCost = selectedTariff?.delivery_sum || 0;
  const total = subtotal + deliveryCost;

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
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+7 (XXX) XXX-XX-XX"
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

                <div>
                  <label className="block text-sm font-medium mb-2">Город *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border rounded bg-background"
                    value={formData.city}
                    onChange={(e) => handleCityChange(e.target.value)}
                    placeholder="Начните вводить название города..."
                  />
                  {calculatingDelivery && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Рассчитываем доставку...
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Тарифы доставки */}
            {tariffs.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Выберите способ доставки</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {tariffs.map((tariff) => (
                    <label
                      key={tariff.tariff_code}
                      className={`flex items-center justify-between p-4 border rounded cursor-pointer transition ${
                        selectedTariff?.tariff_code === tariff.tariff_code
                          ? "border-primary bg-primary/5"
                          : "hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="tariff"
                          checked={selectedTariff?.tariff_code === tariff.tariff_code}
                          onChange={() => setSelectedTariff(tariff)}
                        />
                        <div>
                          <p className="font-medium">{tariff.tariff_name}</p>
                          <p className="text-sm text-muted-foreground">
                            {tariff.period_min}-{tariff.period_max} дней
                          </p>
                        </div>
                      </div>
                      <span className="font-semibold">{tariff.delivery_sum.toLocaleString()} ₽</span>
                    </label>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Пункты выдачи */}
            {deliveryPoints.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Выберите пункт выдачи СДЭК</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 max-h-96 overflow-y-auto">
                  {deliveryPoints.map((point) => (
                    <label
                      key={point.code}
                      className={`block p-4 border rounded cursor-pointer transition ${
                        selectedPoint?.code === point.code
                          ? "border-primary bg-primary/5"
                          : "hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="point"
                          checked={selectedPoint?.code === point.code}
                          onChange={() => setSelectedPoint(point)}
                        />
                        <div className="flex-1">
                          <p className="font-medium mb-1">{point.name}</p>
                          <p className="text-sm text-muted-foreground mb-1">
                            {point.location.address_full}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {point.work_time}
                          </p>
                        </div>
                      </div>
                    </label>
                  ))}
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
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Доставка:</span>
                    <span>
                      {selectedTariff
                        ? `${deliveryCost.toLocaleString()} ₽`
                        : "Рассчитается"}
                    </span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-baseline">
                    <span className="font-semibold text-lg">Итого:</span>
                    <span className="font-bold text-2xl">
                      {total.toLocaleString()} ₽
                    </span>
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={loading || !selectedPoint || !selectedTariff}
                >
                  {loading ? "Оформляем..." : "Подтвердить заказ"}
                </Button>

                {!selectedTariff && formData.city && (
                  <p className="text-xs text-center text-muted-foreground">
                    Выберите способ доставки
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
