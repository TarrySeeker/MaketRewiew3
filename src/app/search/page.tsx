import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q || "";

  const supabase = await createClient();

  let products = [];

  if (query.length >= 2) {
    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("is_active", true)
      .or(`title.ilike.%${query}%,brand.ilike.%${query}%,description.ilike.%${query}%`)
      .limit(50);

    products = data || [];
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-display text-4xl font-bold mb-8">Поиск</h1>

      <div className="mb-6">
        <form action="/search" method="GET">
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Поиск товаров..."
            className="w-full max-w-2xl px-4 py-3 border rounded bg-background text-lg"
            autoFocus
          />
        </form>
      </div>

      {query.length < 2 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Введите минимум 2 символа для поиска</p>
        </div>
      ) : products.length > 0 ? (
        <div>
          <p className="text-sm text-muted-foreground mb-6">
            Найдено товаров: {products.length}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="flex flex-col">
                <CardContent className="p-4 flex-1 flex flex-col">
                  <div className="aspect-square bg-secondary rounded mb-4 flex items-center justify-center">
                    {product.images[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="object-cover w-full h-full rounded"
                      />
                    ) : (
                      <span className="text-muted-foreground text-sm">Нет фото</span>
                    )}
                  </div>

                  <h3 className="font-semibold mb-2 line-clamp-2">{product.title}</h3>

                  {product.brand && (
                    <p className="text-xs text-muted-foreground mb-2">{product.brand}</p>
                  )}

                  <div className="mt-auto">
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-2xl font-bold">
                        {product.price.toLocaleString()} ₽
                      </span>
                      {product.old_price && (
                        <span className="text-sm line-through text-muted-foreground">
                          {product.old_price.toLocaleString()} ₽
                        </span>
                      )}
                    </div>

                    <Link href={`/product/${product.id}`}>
                      <Button className="w-full">Подробнее</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">По запросу &quot;{query}&quot; ничего не найдено</p>
        </div>
      )}
    </div>
  );
}
