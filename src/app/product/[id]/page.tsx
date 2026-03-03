import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/AddToCartButton";
import type { Metadata } from "next";
import { getMockProductById, mockCategories } from "@/lib/mockData";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();

  let product = null;

  try {
    const { data: dbProduct } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();
    product = dbProduct || getMockProductById(id);
  } catch (err) {
    product = getMockProductById(id);
  }

  if (!product) {
    return {
      title: "ОШИБКА 404",
    };
  }

  return {
    title: product.seo_title || `${product.title} — купить в магазине Инструмент`,
    description:
      product.seo_description ||
      product.description ||
      `${product.title} по цене ${product.price} ₽. ${product.brand ? `Бренд: ${product.brand}.` : ""} Доставка СДЭК по России.`,
    openGraph: {
      title: product.title,
      description: product.description || "",
      images: product.images.length > 0 ? [product.images[0]] : [],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  let product = null;

  try {
    const { data: dbProduct } = await supabase
      .from("products")
      .select("*, category:categories(*)")
      .eq("id", id)
      .single();
    product = dbProduct;
  } catch (err) {
    // ignore
  }

  if (!product) {
    const mockProduct = getMockProductById(id);
    if (!mockProduct) notFound();

    // Attach mock category to mock product to satisfy UI expectations
    product = {
      ...mockProduct,
      category: mockCategories.find(c => c.id === mockProduct.category_id)
    };
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      {/* Breadcrumbs / Header area */}
      <div className="mb-8 flex items-center text-sm font-mono text-zinc-500 uppercase tracking-widest">
        <span>КАТАЛОГ</span>
        <span className="mx-3 text-primary">/</span>
        <span>{product.category?.name || "КАТЕГОРИЯ"}</span>
        <span className="mx-3 text-primary">/</span>
        <span className="text-zinc-900 font-bold truncate">{product.title}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        {/* Images */}
        <div className="relative">
          <div className="aspect-square bg-white border-2 border-zinc-200 shadow-brutal flex items-center justify-center p-8 relative group overflow-hidden">
            {product.images[0] ? (
              <img
                src={product.images[0]}
                alt={product.title}
                className="object-contain w-full h-full relative z-10 transition-all duration-500 group-hover:scale-105 group-hover:drop-shadow-[0_10px_10px_rgba(0,0,0,0.1)]"
              />
            ) : (
              <span className="text-zinc-400 font-mono text-sm uppercase tracking-widest border border-dashed border-zinc-300 p-4">NO_IMAGE_DATA</span>
            )}

            {/* Brutalist accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary"></div>
            <div className="absolute top-4 right-4 text-xs font-mono text-zinc-400">ID: {product.id.substring(0, 8)}</div>
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col">
          {product.brand && (
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-2 h-2 bg-primary"></span>
              <p className="text-primary font-mono text-xs uppercase tracking-widest">{product.brand}</p>
            </div>
          )}

          <h1 className="font-display text-4xl lg:text-5xl font-bold mb-6 text-zinc-900 uppercase tracking-wider leading-tight">
            {product.title}
          </h1>

          <div className="mb-8 pb-8 border-b border-zinc-200">
            <div className="flex items-end gap-4 mb-4">
              <span className="text-5xl font-mono font-bold text-zinc-900 tracking-tighter">
                {product.price.toLocaleString()} <span className="text-3xl text-primary">₽</span>
              </span>
              {product.old_price && (
                <span className="text-xl line-through text-zinc-400 font-mono mb-1">
                  {product.old_price.toLocaleString()} ₽
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 font-mono text-sm uppercase tracking-widest mt-6">
              {product.stock > 0 ? (
                <>
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-green-500">В НАЛИЧИИ: {product.stock} ШТ.</span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  <span className="text-red-500">НЕТ В НАЛИЧИИ</span>
                </>
              )}
            </div>
          </div>

          <div className="mb-12">
            <AddToCartButton product={product} />
          </div>

          {/* Tabs / Content (simplified for brutalist aesthetic) */}
          <div className="space-y-12 mt-12">
            {product.description && (
              <div>
                <h2 className="font-display text-2xl text-zinc-900 uppercase tracking-widest mb-6 flex items-center gap-3">
                  <span className="text-primary">/</span> Описание
                </h2>
                <div className="text-zinc-600 font-sans leading-relaxed whitespace-pre-line p-6 bg-zinc-50 border-l-4 border-primary shadow-sm">
                  {product.description}
                </div>
              </div>
            )}

            {/* Specs */}
            <div>
              <h2 className="font-display text-2xl text-zinc-900 uppercase tracking-widest mb-6 flex items-center gap-3">
                <span className="text-primary">/</span> Спецификации
              </h2>
              <dl className="grid grid-cols-1 bg-white border-2 border-zinc-200 shadow-brutal p-6">
                {product.sku && (
                  <div className="py-3 flex justify-between items-center group border-b border-zinc-100 last:border-0">
                    <dt className="text-zinc-500 font-mono text-sm uppercase tracking-widest">Артикул</dt>
                    <dd className="font-mono text-zinc-900 font-bold group-hover:text-primary transition-colors">{product.sku}</dd>
                  </div>
                )}
                {product.brand && (
                  <div className="py-3 flex justify-between items-center group border-b border-zinc-100 last:border-0">
                    <dt className="text-zinc-500 font-mono text-sm uppercase tracking-widest">Тег бренда</dt>
                    <dd className="font-mono text-zinc-900 font-bold group-hover:text-primary transition-colors">{product.brand}</dd>
                  </div>
                )}
                {product.weight && (
                  <div className="py-3 flex justify-between items-center group border-b border-zinc-100 last:border-0">
                    <dt className="text-zinc-500 font-mono text-sm uppercase tracking-widest">Масса нетто</dt>
                    <dd className="font-mono text-zinc-900 font-bold group-hover:text-primary transition-colors">{product.weight} КГ</dd>
                  </div>
                )}
                {product.dimensions && (
                  <div className="py-3 flex justify-between items-center group border-b border-zinc-100 last:border-0">
                    <dt className="text-zinc-500 font-mono text-sm uppercase tracking-widest">Габариты (В×Ш×Г)</dt>
                    <dd className="font-mono text-zinc-900 font-bold group-hover:text-primary transition-colors">
                      {product.dimensions.width}×{product.dimensions.height}×
                      {product.dimensions.depth} {product.dimensions.unit || "ММ"}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
