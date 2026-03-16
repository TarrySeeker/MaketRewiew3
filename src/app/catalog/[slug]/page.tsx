"use client";

import { useState, useEffect, useMemo } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { Product, Category } from "@/lib/types";
import { getMockCategoryBySlug, getMockProductsByCategoryId } from "@/lib/mockData";
import { TiltCard } from "@/components/ui/TiltCard";
import { ChevronDown, ChevronUp } from "lucide-react";

function FilterSection({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="mb-6">
      <button onClick={() => setOpen(!open)} className="flex items-center justify-between w-full text-sm font-sans uppercase tracking-wider text-zinc-500 mb-3 hover:text-zinc-900 transition-colors">
        {title}
        {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
      {open && children}
    </div>
  );
}

function CheckboxFilter({ items, selected, onToggle }: { items: string[]; selected: string[]; onToggle: (v: string) => void }) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? items : items.slice(0, 6);
  return (
    <div className="space-y-2">
      {visible.map((item) => (
        <label key={item} className="flex items-center gap-3 cursor-pointer group">
          <div className={`w-4 h-4 border flex items-center justify-center transition-colors ${selected.includes(item) ? 'bg-primary border-primary' : 'border-zinc-300 group-hover:border-primary/50'}`}>
            {selected.includes(item) && <span className="w-2 h-2 bg-white"></span>}
          </div>
          <input type="checkbox" className="hidden" checked={selected.includes(item)} onChange={() => onToggle(item)} />
          <span className="text-sm font-sans text-zinc-600 group-hover:text-zinc-900 transition-colors">{item}</span>
        </label>
      ))}
      {items.length > 6 && (
        <button onClick={() => setShowAll(!showAll)} className="text-xs text-primary hover:underline font-mono mt-1">
          {showAll ? "Свернуть" : `Показать все (${items.length})`}
        </button>
      )}
    </div>
  );
}

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [priceMin, setPriceMin] = useState<number>(0);
  const [priceMax, setPriceMax] = useState<number>(0);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedPowers, setSelectedPowers] = useState<string[]>([]);
  const [selectedVoltages, setSelectedVoltages] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedWarranties, setSelectedWarranties] = useState<string[]>([]);
  const [selectedPurposes, setSelectedPurposes] = useState<string[]>([]);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [onlyDiscount, setOnlyDiscount] = useState(false);
  const [sortBy, setSortBy] = useState<string>("created_at_desc");

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const supabase = createClient();

  useEffect(() => { fetchData(); }, [slug]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: cat } = await supabase.from("categories").select("*").eq("slug", slug).single();
      const resolvedCat = cat || getMockCategoryBySlug(slug);
      if (!resolvedCat) { setLoading(false); return; }
      setCategory(resolvedCat);

      const { data: prods } = await supabase.from("products").select("*").eq("category_id", resolvedCat.id).eq("is_active", true).order("created_at", { ascending: false });
      const resolvedProds = (prods && prods.length > 0) ? prods : getMockProductsByCategoryId(resolvedCat.id);

      if (resolvedProds) {
        setProducts(resolvedProds);
        const prices = resolvedProds.map((p) => p.price);
        if (prices.length > 0) {
          const min = Math.floor(Math.min(...prices));
          const max = Math.ceil(Math.max(...prices));
          setMinPrice(min); setMaxPrice(max); setPriceMin(min); setPriceMax(max);
        }
      }
    } catch {
      const mockCat = getMockCategoryBySlug(slug);
      if (mockCat) {
        setCategory(mockCat);
        const mockProds = getMockProductsByCategoryId(mockCat.id);
        setProducts(mockProds);
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

  const uniqueValues = useMemo(() => {
    const extract = (key: keyof Product) => Array.from(new Set(products.map(p => p[key] as string).filter(Boolean))).sort();
    return {
      brands: extract('brand'),
      countries: extract('country'),
      powers: extract('power'),
      voltages: extract('voltage'),
      materials: extract('material'),
      warranties: extract('warranty'),
      purposes: extract('purpose'),
    };
  }, [products]);

  const toggle = (setter: React.Dispatch<React.SetStateAction<string[]>>) => (val: string) => {
    setter(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]);
  };

  const activeFiltersCount = selectedBrands.length + selectedCountries.length + selectedPowers.length + selectedVoltages.length + selectedMaterials.length + selectedWarranties.length + selectedPurposes.length + (onlyInStock ? 1 : 0) + (onlyDiscount ? 1 : 0);

  const filteredProducts = products
    .filter(p => {
      if (p.price < priceMin || p.price > priceMax) return false;
      if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand || "")) return false;
      if (selectedCountries.length > 0 && !selectedCountries.includes(p.country || "")) return false;
      if (selectedPowers.length > 0 && !selectedPowers.includes(p.power || "")) return false;
      if (selectedVoltages.length > 0 && !selectedVoltages.includes(p.voltage || "")) return false;
      if (selectedMaterials.length > 0 && !selectedMaterials.includes(p.material || "")) return false;
      if (selectedWarranties.length > 0 && !selectedWarranties.includes(p.warranty || "")) return false;
      if (selectedPurposes.length > 0 && !selectedPurposes.includes(p.purpose || "")) return false;
      if (onlyInStock && !p.inStock) return false;
      if (onlyDiscount && !p.old_price) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price_asc": return a.price - b.price;
        case "price_desc": return b.price - a.price;
        case "name_asc": return a.title.localeCompare(b.title);
        case "discount": return (b.old_price ? b.old_price - b.price : 0) - (a.old_price ? a.old_price - a.price : 0);
        default: return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });

  const resetFilters = () => {
    setPriceMin(minPrice); setPriceMax(maxPrice);
    setSelectedBrands([]); setSelectedCountries([]); setSelectedPowers([]);
    setSelectedVoltages([]); setSelectedMaterials([]); setSelectedWarranties([]);
    setSelectedPurposes([]); setOnlyInStock(false); setOnlyDiscount(false);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-24 flex justify-center">
        <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <p className="text-primary font-mono text-xl tracking-widest">ОШИБКА 404: КАТЕГОРИЯ НЕ НАЙДЕНА</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 border-b border-zinc-200 pb-6">
        <h1 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-wider text-zinc-900">{category.name}</h1>
        <div className="w-20 h-1 bg-primary mt-4"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Фильтры */}
        <aside className="space-y-4">
          <Card className="glass bg-white border-zinc-200 rounded-none shadow-brutal">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display uppercase tracking-widest text-lg text-zinc-900 flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary"></span> Фильтры
                </h3>
                {activeFiltersCount > 0 && (
                  <span className="text-xs bg-primary text-white px-2 py-0.5 font-mono">{activeFiltersCount}</span>
                )}
              </div>

              {/* Наличие и скидки */}
              <FilterSection title="Наличие">
                <div className="space-y-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-4 h-4 border flex items-center justify-center transition-colors ${onlyInStock ? 'bg-primary border-primary' : 'border-zinc-300'}`}>
                      {onlyInStock && <span className="w-2 h-2 bg-white"></span>}
                    </div>
                    <input type="checkbox" className="hidden" checked={onlyInStock} onChange={() => setOnlyInStock(!onlyInStock)} />
                    <span className="text-sm text-zinc-600">Только в наличии</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-4 h-4 border flex items-center justify-center transition-colors ${onlyDiscount ? 'bg-primary border-primary' : 'border-zinc-300'}`}>
                      {onlyDiscount && <span className="w-2 h-2 bg-white"></span>}
                    </div>
                    <input type="checkbox" className="hidden" checked={onlyDiscount} onChange={() => setOnlyDiscount(!onlyDiscount)} />
                    <span className="text-sm text-zinc-600">Со скидкой</span>
                  </label>
                </div>
              </FilterSection>

              {/* Цена */}
              <FilterSection title="Цена, ₽">
                <div className="space-y-3">
                  <input type="range" min={minPrice} max={maxPrice} value={priceMin} onChange={(e) => setPriceMin(parseInt(e.target.value))}
                    className="w-full h-1 bg-zinc-200 appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-none" />
                  <input type="range" min={minPrice} max={maxPrice} value={priceMax} onChange={(e) => setPriceMax(parseInt(e.target.value))}
                    className="w-full h-1 bg-zinc-200 appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-none" />
                  <div className="flex items-center gap-2 text-sm font-mono">
                    <input type="number" value={priceMin} onChange={(e) => setPriceMin(parseInt(e.target.value) || minPrice)}
                      className="w-full px-2 py-1.5 border border-zinc-200 bg-zinc-50 text-zinc-900 text-xs" />
                    <span className="text-zinc-400">—</span>
                    <input type="number" value={priceMax} onChange={(e) => setPriceMax(parseInt(e.target.value) || maxPrice)}
                      className="w-full px-2 py-1.5 border border-zinc-200 bg-zinc-50 text-zinc-900 text-xs" />
                  </div>
                </div>
              </FilterSection>

              {/* Бренд */}
              {uniqueValues.brands.length > 0 && (
                <FilterSection title="Производитель">
                  <CheckboxFilter items={uniqueValues.brands} selected={selectedBrands} onToggle={toggle(setSelectedBrands)} />
                </FilterSection>
              )}

              {/* Страна */}
              {uniqueValues.countries.length > 0 && (
                <FilterSection title="Страна производства" defaultOpen={false}>
                  <CheckboxFilter items={uniqueValues.countries} selected={selectedCountries} onToggle={toggle(setSelectedCountries)} />
                </FilterSection>
              )}

              {/* Назначение */}
              {uniqueValues.purposes.length > 0 && (
                <FilterSection title="Назначение">
                  <CheckboxFilter items={uniqueValues.purposes} selected={selectedPurposes} onToggle={toggle(setSelectedPurposes)} />
                </FilterSection>
              )}

              {/* Мощность */}
              {uniqueValues.powers.length > 0 && (
                <FilterSection title="Мощность" defaultOpen={false}>
                  <CheckboxFilter items={uniqueValues.powers} selected={selectedPowers} onToggle={toggle(setSelectedPowers)} />
                </FilterSection>
              )}

              {/* Напряжение */}
              {uniqueValues.voltages.length > 0 && (
                <FilterSection title="Напряжение" defaultOpen={false}>
                  <CheckboxFilter items={uniqueValues.voltages} selected={selectedVoltages} onToggle={toggle(setSelectedVoltages)} />
                </FilterSection>
              )}

              {/* Материал */}
              {uniqueValues.materials.length > 0 && (
                <FilterSection title="Материал" defaultOpen={false}>
                  <CheckboxFilter items={uniqueValues.materials} selected={selectedMaterials} onToggle={toggle(setSelectedMaterials)} />
                </FilterSection>
              )}

              {/* Гарантия */}
              {uniqueValues.warranties.length > 0 && (
                <FilterSection title="Гарантия" defaultOpen={false}>
                  <CheckboxFilter items={uniqueValues.warranties} selected={selectedWarranties} onToggle={toggle(setSelectedWarranties)} />
                </FilterSection>
              )}

              <Button variant="outline" onClick={resetFilters}
                className="w-full rounded-none border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:border-zinc-400 hover:bg-zinc-50 uppercase tracking-widest text-xs h-10 transition-all font-mono mt-4">
                [ СБРОСИТЬ ВСЕ ]
              </Button>
            </CardContent>
          </Card>
        </aside>

        {/* Товары */}
        <div className="lg:col-span-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-4 border-b border-zinc-200 gap-4">
            <p className="text-sm font-mono text-zinc-500 uppercase tracking-widest bg-zinc-100 px-3 py-1 border-l-2 border-primary shadow-sm">
              НАЙДЕНО: <span className="text-zinc-900 font-bold">{filteredProducts.length}</span>
            </p>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-zinc-200 bg-white text-zinc-900 text-sm focus:outline-none focus:border-primary/50 uppercase tracking-wider font-mono cursor-pointer shadow-sm">
              <option value="created_at_desc">Новинки</option>
              <option value="price_asc">Цена: по возрастанию</option>
              <option value="price_desc">Цена: по убыванию</option>
              <option value="name_asc">По названию</option>
              <option value="discount">По размеру скидки</option>
            </select>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Link href={`/product/${product.id}`} key={product.id}>
                  <TiltCard intensity={25}>
                    <Card className="group glass border-zinc-200 bg-white hover:bg-zinc-50 hover:shadow-neon-red-lg rounded-none transition-all duration-300 h-full flex flex-col relative overflow-visible">
                      <CardContent className="p-0 flex-1 flex flex-col relative z-10" style={{ transformStyle: "preserve-3d" }}>
                        <div className="aspect-square bg-zinc-50 overflow-visible relative flex items-center justify-center">
                          {product.old_price && (
                            <span className="absolute top-2 right-2 z-30 bg-primary text-white text-[10px] font-bold px-2 py-1 font-mono">
                              -{Math.round((1 - product.price / product.old_price) * 100)}%
                            </span>
                          )}
                          {product.inStock === false && (
                            <span className="absolute top-2 left-2 z-30 bg-zinc-600 text-white text-[10px] font-bold px-2 py-1 font-mono">
                              ПОД ЗАКАЗ
                            </span>
                          )}
                          {product.images[0] ? (
                            <img src={product.images[0]} alt={product.title}
                              className="object-cover w-full h-full group-hover:scale-[1.15] transition-transform duration-700 ease-out z-20"
                              style={{ transform: "translateZ(40px)" }} />
                          ) : (
                            <span className="text-zinc-400 font-mono text-xs z-20">NO_IMAGE</span>
                          )}
                        </div>
                        <div className="p-5 flex flex-col flex-1 bg-white relative z-10">
                          {product.brand && (
                            <p className="text-[10px] uppercase font-mono tracking-widest text-primary mb-1">{product.brand}</p>
                          )}
                          <h3 className="font-display font-semibold text-zinc-900 mb-2 line-clamp-2 uppercase tracking-wide group-hover:text-primary transition-colors text-sm">{product.title}</h3>
                          <div className="flex flex-wrap gap-1 mb-3">
                            {product.purpose && <span className="text-[9px] font-mono bg-zinc-100 text-zinc-500 px-1.5 py-0.5 border border-zinc-200">{product.purpose}</span>}
                            {product.country && <span className="text-[9px] font-mono bg-zinc-100 text-zinc-500 px-1.5 py-0.5 border border-zinc-200">{product.country}</span>}
                            {product.power && <span className="text-[9px] font-mono bg-zinc-100 text-zinc-500 px-1.5 py-0.5 border border-zinc-200">{product.power}</span>}
                          </div>
                          <div className="mt-auto pt-3 border-t border-zinc-200">
                            <div className="flex items-end justify-between">
                              <div className="flex flex-col">
                                {product.old_price && (
                                  <span className="text-xs line-through text-zinc-400 font-mono">{product.old_price.toLocaleString()} ₽</span>
                                )}
                                <span className="text-xl font-bold text-zinc-900 font-mono">{product.price.toLocaleString()} ₽</span>
                              </div>
                              <Button variant="ghost" className="w-10 h-10 p-0 rounded-none bg-zinc-100 text-zinc-900 hover:bg-primary hover:text-white transition-all border border-zinc-200">
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
            <div className="text-center py-24 border border-dashed border-zinc-200">
              <p className="text-zinc-500 font-mono text-sm uppercase tracking-widest">НИЧЕГО НЕ НАЙДЕНО. ИЗМЕНИТЕ ПАРАМЕТРЫ ФИЛЬТРОВ</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
