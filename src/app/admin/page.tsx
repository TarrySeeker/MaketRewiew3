import { createClient } from "@/utils/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, FolderTree, ShoppingBag, TrendingUp } from "lucide-react";
import { mockCategories, mockProducts } from "@/lib/mockData";

export default async function AdminDashboard() {
  const supabase = await createClient();

  let productsCount = 0;
  let categoriesCount = 0;
  let ordersCount = 0;
  let recentOrders: any[] | null = [];

  try {
    const [
      productsResponse,
      categoriesResponse,
      ordersResponse,
      recentOrdersResponse,
    ] = await Promise.all([
      supabase.from("products").select("*", { count: "exact", head: true }),
      supabase.from("categories").select("*", { count: "exact", head: true }),
      supabase.from("orders").select("*", { count: "exact", head: true }),
      supabase.from("orders").select("*").order("created_at", { ascending: false }).limit(5),
    ]);

    productsCount = productsResponse.count || mockProducts.length;
    categoriesCount = categoriesResponse.count || mockCategories.length;
    ordersCount = ordersResponse.count || 0;
    recentOrders = recentOrdersResponse.data || [];
  } catch (error) {
    console.error("Supabase Error, using Mock Data:", error);
    productsCount = mockProducts.length;
    categoriesCount = mockCategories.length;
    ordersCount = 0;
    recentOrders = [];
  }

  const stats = [
    {
      title: "Товары",
      value: productsCount || 0,
      icon: Package,
      color: "text-blue-500",
    },
    {
      title: "Категории",
      value: categoriesCount || 0,
      icon: FolderTree,
      color: "text-green-500",
    },
    {
      title: "Заказы",
      value: ordersCount || 0,
      icon: ShoppingBag,
      color: "text-purple-500",
    },
    {
      title: "Выручка",
      value: "0 ₽",
      icon: TrendingUp,
      color: "text-orange-500",
    },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl font-bold mb-8">Дашборд</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Последние заказы</CardTitle>
        </CardHeader>
        <CardContent>
          {recentOrders && recentOrders.length > 0 ? (
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between border-b pb-4 last:border-0"
                >
                  <div>
                    <p className="font-medium">Заказ #{order.id.slice(0, 8)}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.created_at).toLocaleDateString("ru-RU")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{order.total.toLocaleString()} ₽</p>
                    <p className="text-sm text-muted-foreground">{order.status}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-4">
              Заказов пока нет
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
