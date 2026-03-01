"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { Product, Category } from "@/lib/types";

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Фильтры
  const [priceMin, setPriceMin] = useState<number>(0);
  const [priceMax, setPriceMax] = useState<number>(0);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("created_at_desc");

  const [brands, setBrands] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const supabase = createClient();

  useEffect(() => {
    fetchData();
  }, [slug]);

  const fetchData = async () => {
    setLoading(true);

    // Загружаем категорию
    const { data: cat } = await supabase
      .from("categories")
      .select("*")
      .eq("slug", slug)
      .single();

    if (!cat) {
      setLoading(false);
      return;
    }

    setCategory(cat);

    // Загружаем товары
    const { data: prods } = await supabase
      .from("products")
      .select("*")
      .eq("category_id", cat.id)
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (prods) {
      setProducts(prods);

      // Извлекаем уникальные бренды
      const uniqueBrands = Array.from(
        new Set(prods.map((p) => p.brand).filter(Boolean))
      ) as string[];
      setBrands(uniqueBrands.sort());

      // Находим мин/макс цену
      const prices = prods.map((p) => p.price);
      const min = Math.floor(Math.min(...prices));
      const max = Math.ceil(Math.max(...prices));
      setMinPrice(min);
      setMaxPrice(max);
      setPriceMin(min);
      setPriceMax(max);
    }

    setLoading(false);
  };

  const filteredProducts = products
    .filter((p) => {
      // Фильтр по цене
      if (p.price < priceMin || p.price > priceMax) return false;

      // Фильтр по бренду
      if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand || "")) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price_asc":
          return a.price - b.price;
        case "price_desc":
          return b.price - a.price;
        case "created_at_desc":
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Загрузка...</div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Категория не найдена</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-display text-4xl font-bold mb-8">{category.name}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Фильтры */}
        <aside className="space-y-6">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-4">Фильтры</h3>

              {/* Цена */}
              <div className="mb-6">
                <h4 className="text-sm font-medium mb-3">Цена</h4>
                <div className="space-y-2">
                  <input
                    type="range"
                    min={minPrice}
                    max={maxPrice}
                    value={priceMin}
                    onChange={(e) => setPriceMin(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <input
                    type="range"
                    min={minPrice}
                    max={maxPrice}
                    value={priceMax}
                    onChange={(e) => setPriceMax(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex items-center gap-2 text-sm">
                    <input
                      type="number"
                      value={priceMin}
                      onChange={(e) => setPriceMin(parseInt(e.target.value) || minPrice)}
                      className="w-full px-2 py-1 border rounded bg-background"
                    />
                    <span>—</span>
                    <input
                      type="number"
                      value={priceMax}
                      onChange={(e) => setPriceMax(parseInt(e.target.value) || maxPrice)}
                      className="w-full px-2 py-1 border rounded bg-background"
                    />
                  </div>
                </div>
              </div>

              {/* Бренды */}
              {brands.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-3">Бренд</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {brands.map((brand) => (
                      <label key={brand} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand)}
                          onChange={() => toggleBrand(brand)}
                        />
                        <span className="text-sm">{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <Button
                variant="outline"
                size="sm"
                className="w-full mt-4"
                onClick={() => {
                  setPriceMin(minPrice);
                  setPriceMax(maxPrice);
                  setSelectedBrands([]);
                }}
              >
                Сбросить фильтры
              </Button>
            </CardContent>
          </Card>
        </aside>

        {/* Товары */}
        <div className="lg:col-span-3">
          {/* Сортировка */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">
              Найдено: {filteredProducts.length}
            </p>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border rounded bg-background text-sm"
            >
              <option value="created_at_desc">Сначала новые</option>
              <option value="price_asc">Сначала дешёвые</option>
              <option value="price_desc">Сначала дорогие</option>
            </select>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
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
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                По вашим фильтрам товары не найдены
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
