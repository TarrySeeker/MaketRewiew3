"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { Product, Category } from "@/lib/types";
import { getMockCategoryBySlug, getMockProductsByCategoryId } from "@/lib/mockData";
import { TiltCard } from "@/components/ui/TiltCard";

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

    try {
      const { data: cat } = await supabase
        .from("categories")
        .select("*")
        .eq("slug", slug)
        .single();

      const resolvedCat = cat || getMockCategoryBySlug(slug);

      if (!resolvedCat) {
        setLoading(false);
        return;
      }

      setCategory(resolvedCat);

      const { data: prods } = await supabase
        .from("products")
        .select("*")
        .eq("category_id", resolvedCat.id)
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      const resolvedProds = (prods && prods.length > 0) ? prods : getMockProductsByCategoryId(resolvedCat.id);

      if (resolvedProds) {
        setProducts(resolvedProds);

        const uniqueBrands = Array.from(
          new Set(resolvedProds.map((p) => p.brand).filter(Boolean))
        ) as string[];
        setBrands(uniqueBrands.sort());

        const prices = resolvedProds.map((p) => p.price);
        if (prices.length > 0) {
          const min = Math.floor(Math.min(...prices));
          const max = Math.ceil(Math.max(...prices));
          setMinPrice(min);
          setMaxPrice(max);
          setPriceMin(min);
          setPriceMax(max);
        }
      }
    } catch (err) {
      console.error("Failed to fetch from DB, using mock data", err);
      // Fallback in catch block to be safe
      const mockCat = getMockCategoryBySlug(slug);
      if (mockCat) {
        setCategory(mockCat);
        const mockProds = getMockProductsByCategoryId(mockCat.id);
        setProducts(mockProds);

        const uniqueBrands = Array.from(new Set(mockProds.map(p => p.brand).filter(Boolean))) as string[];
        setBrands(uniqueBrands.sort());

        const prices = mockProds.map(p => p.price);
        if (prices.length > 0) {
          const min = Math.floor(Math.min(...prices));
          const max = Math.ceil(Math.max(...prices));
          setMinPrice(min); setMaxPrice(max); setPriceMin(min); setPriceMax(max);
        }
      }
    }

    setLoading(false);
  };

  const filteredProducts = products
    .filter((p) => {
      if (p.price < priceMin || p.price > priceMax) return false;
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
      <div className="container mx-auto px-4 py-24 flex justify-center items-center">
        <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <p className="text-primary font-mono text-xl tracking-widest">ОШИБКА 404: СЕКТОР НЕ НАЙДЕН</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 border-b border-zinc-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-wider text-zinc-900">
            {category.name}
          </h1>
          <div className="w-20 h-1 bg-primary mt-4"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Фильтры */}
        <aside className="space-y-6">
          <Card className="glass bg-white border-zinc-200 rounded-none rounded-tr-3xl shadow-brutal">
            <CardContent className="p-6">
              <h3 className="font-display uppercase tracking-widest text-lg text-zinc-900 mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-primary"></span>
                Параметры
              </h3>

              {/* Цена */}
              <div className="mb-8">
                <h4 className="text-sm font-sans uppercase tracking-wider text-gray-400 mb-4">Диапазон цен (₽)</h4>
                <div className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <input
                      type="range"
                      min={minPrice}
                      max={maxPrice}
                      value={priceMin}
                      onChange={(e) => setPriceMin(parseInt(e.target.value))}
                      className="w-full h-1 bg-white/10 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-none"
                    />
                    <input
                      type="range"
                      min={minPrice}
                      max={maxPrice}
                      value={priceMax}
                      onChange={(e) => setPriceMax(parseInt(e.target.value))}
                      className="w-full h-1 bg-white/10 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-none"
                    />
                  </div>
                  <div className="flex items-center gap-4 text-sm font-mono">
                    <input
                      type="number"
                      value={priceMin}
                      onChange={(e) => setPriceMin(parseInt(e.target.value) || minPrice)}
                      className="w-full px-3 py-2 border border-zinc-200 bg-zinc-50 text-zinc-900 focus:border-primary/50 focus:outline-none"
                    />
                    <span className="text-zinc-500">—</span>
                    <input
                      type="number"
                      value={priceMax}
                      onChange={(e) => setPriceMax(parseInt(e.target.value) || maxPrice)}
                      className="w-full px-3 py-2 border border-zinc-200 bg-zinc-50 text-zinc-900 focus:border-primary/50 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Бренды */}
              {brands.length > 0 && (
                <div className="mb-8">
                  <h4 className="text-sm font-sans uppercase tracking-wider text-gray-400 mb-4">Производитель</h4>
                  <div className="space-y-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                    {brands.map((brand) => (
                      <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-4 h-4 border flex items-center justify-center transition-colors ${selectedBrands.includes(brand) ? 'bg-primary border-primary' : 'border-zinc-300 group-hover:border-primary/50'}`}>
                          {selectedBrands.includes(brand) && <span className="w-2 h-2 bg-white"></span>}
                        </div>
                        <input
                          type="checkbox"
                          className="hidden"
                          checked={selectedBrands.includes(brand)}
                          onChange={() => toggleBrand(brand)}
                        />
                        <span className="text-sm font-sans text-zinc-600 group-hover:text-zinc-900 transition-colors">{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <Button
                variant="outline"
                className="w-full rounded-none border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:border-zinc-400 hover:bg-zinc-50 uppercase tracking-widest text-xs h-10 transition-all font-mono"
                onClick={() => {
                  setPriceMin(minPrice);
                  setPriceMax(maxPrice);
                  setSelectedBrands([]);
                }}
              >
                [ СБРОСИТЬ ]
              </Button>
            </CardContent>
          </Card>
        </aside>

        {/* Товары */}
        <div className="lg:col-span-3">
          {/* Сортировка */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-4 border-b border-zinc-200 gap-4">
            <p className="text-sm font-mono text-zinc-500 uppercase tracking-widest bg-zinc-100 px-3 py-1 border-l-2 border-primary shadow-sm">
              НАЙДЕНО: <span className="text-zinc-900 font-bold">{filteredProducts.length}</span>
            </p>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-zinc-200 bg-white text-zinc-900 text-sm focus:outline-none focus:border-primary/50 uppercase tracking-wider font-mono cursor-pointer shadow-sm"
            >
              <option value="created_at_desc">Новинки</option>
              <option value="price_asc">По возрастанию цены</option>
              <option value="price_desc">По убыванию цены</option>
            </select>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Link href={`/product/${product.id}`} key={product.id}>
                  <TiltCard intensity={25}>
                    <Card className="group glass border-zinc-200 bg-white hover:bg-zinc-50 hover:shadow-neon-red-lg rounded-none transition-all duration-300 h-full flex flex-col relative overflow-visible">
                      <CardContent className="p-0 flex-1 flex flex-col relative z-10" style={{ transformStyle: "preserve-3d" }}>
                        <div className="aspect-square bg-zinc-50 mb-0 overflow-visible relative flex items-center justify-center">
                          {product.images[0] ? (
                            <img
                              src={product.images[0]}
                              alt={product.title}
                              className="object-cover w-full h-full group-hover:scale-[1.15] hover:-translate-y-4 transition-transform duration-700 ease-out z-20"
                              style={{ transform: "translateZ(40px)" }}
                            />
                          ) : (
                            <span className="text-zinc-400 font-mono text-xs uppercase tracking-widest border border-dashed border-zinc-300 p-2 z-20" style={{ transform: "translateZ(40px)" }}>NO_IMAGE</span>
                          )}
                          {/* Decorative corner brackets */}
                          <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-zinc-300 group-hover:border-primary/50 transition-colors z-10"></div>
                          <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-zinc-300 group-hover:border-primary/50 transition-colors z-10"></div>
                          <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-zinc-300 group-hover:border-primary/50 transition-colors z-10"></div>
                          <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-zinc-300 group-hover:border-primary/50 transition-colors z-10"></div>
                        </div>

                        <div className="p-5 flex flex-col flex-1 bg-white relative z-10">
                          {product.brand && (
                            <p className="text-[10px] uppercase font-mono tracking-widest text-primary mb-2 line-clamp-1">{product.brand}</p>
                          )}
                          <h3 className="font-display font-semibold text-zinc-900 mb-4 line-clamp-2 uppercase tracking-wide group-hover:text-primary transition-colors">{product.title}</h3>

                          <div className="mt-auto pt-4 border-t border-zinc-200">
                            <div className="flex items-end justify-between">
                              <div className="flex flex-col">
                                {product.old_price && (
                                  <span className="text-xs line-through text-zinc-400 font-mono">
                                    {product.old_price.toLocaleString()} ₽
                                  </span>
                                )}
                                <span className="text-xl font-bold text-zinc-900 font-mono">
                                  {product.price.toLocaleString()} ₽
                                </span>
                              </div>

                              <Button
                                variant="ghost"
                                className="w-10 h-10 p-0 rounded-none bg-zinc-100 text-zinc-900 hover:bg-primary hover:text-white transition-all border border-zinc-200"
                              >
                                <span className="text-lg">→</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TiltCard>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 border border-dashed border-white/10 bg-black/20">
              <p className="text-gray-500 font-mono text-sm uppercase tracking-widest">
                {">"} НИЧЕГО НЕ НАЙДЕНО. ИЗМЕНИТЕ ПАРАМЕТРЫ ЗАПРОСА {"<"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
