"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Order } from "@/lib/types";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    setOrders(data || []);
    setLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-500/10 text-blue-500";
      case "processing":
        return "bg-yellow-500/10 text-yellow-500";
      case "completed":
        return "bg-green-500/10 text-green-500";
      case "cancelled":
        return "bg-red-500/10 text-red-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "new":
        return "Новый";
      case "processing":
        return "В обработке";
      case "completed":
        return "Выполнен";
      case "cancelled":
        return "Отменён";
      default:
        return status;
    }
  };

  return (
    <div>
      <h1 className="font-display text-3xl font-bold mb-8">Заказы</h1>

      {loading ? (
        <div className="text-center py-12">Загрузка...</div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-1">
                      Заказ #{order.id.slice(0, 8)}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.created_at).toLocaleString("ru-RU")}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded text-sm font-medium ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {getStatusLabel(order.status)}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-medium mb-2">Покупатель:</h4>
                    <p className="text-sm">{order.customer_info.name || "—"}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.customer_info.phone || "—"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {order.customer_info.email || "—"}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Доставка:</h4>
                    <p className="text-sm text-muted-foreground">
                      {order.customer_info.address || "Не указан"}
                    </p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Товары:</h4>
                  <div className="space-y-2">
                    {order.items.map((item: any, i: number) => (
                      <div
                        key={i}
                        className="flex justify-between text-sm"
                      >
                        <span>
                          {item.title} × {item.quantity}
                        </span>
                        <span className="font-medium">
                          {(item.price * item.quantity).toLocaleString()} ₽
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between font-semibold text-lg mt-4 pt-4 border-t">
                    <span>Итого:</span>
                    <span>{order.total.toLocaleString()} ₽</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {orders.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Заказов пока нет</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
