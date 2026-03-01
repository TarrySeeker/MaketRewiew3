import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/AddToCartButton";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();

  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (!product) {
    return {
      title: "Товар не найден",
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

  const { data: product } = await supabase
    .from("products")
    .select("*, category:categories(*)")
    .eq("id", id)
    .single();

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Images */}
        <div>
          <div className="aspect-square bg-secondary rounded-lg flex items-center justify-center">
            {product.images[0] ? (
              <img
                src={product.images[0]}
                alt={product.title}
                className="object-cover w-full h-full rounded-lg"
              />
            ) : (
              <span className="text-muted-foreground">Нет изображения</span>
            )}
          </div>
        </div>

        {/* Info */}
        <div>
          <h1 className="font-display text-3xl font-bold mb-2">{product.title}</h1>

          {product.brand && (
            <p className="text-muted-foreground mb-4">Бренд: {product.brand}</p>
          )}

          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-4xl font-bold">{product.price.toLocaleString()} ₽</span>
            {product.old_price && (
              <span className="text-xl line-through text-muted-foreground">
                {product.old_price.toLocaleString()} ₽
              </span>
            )}
          </div>

          {product.stock > 0 ? (
            <p className="text-green-500 mb-6">В наличии: {product.stock} шт.</p>
          ) : (
            <p className="text-red-500 mb-6">Нет в наличии</p>
          )}

          <AddToCartButton product={product} />

          {product.description && (
            <div className="mt-8">
              <h2 className="font-semibold text-xl mb-4">Описание</h2>
              <p className="text-muted-foreground whitespace-pre-line">
                {product.description}
              </p>
            </div>
          )}

          {/* Specs */}
          <div className="mt-8">
            <h2 className="font-semibold text-xl mb-4">Характеристики</h2>
            <dl className="space-y-2">
              {product.sku && (
                <div className="flex justify-between border-b pb-2">
                  <dt className="text-muted-foreground">Артикул:</dt>
                  <dd className="font-medium">{product.sku}</dd>
                </div>
              )}
              {product.brand && (
                <div className="flex justify-between border-b pb-2">
                  <dt className="text-muted-foreground">Бренд:</dt>
                  <dd className="font-medium">{product.brand}</dd>
                </div>
              )}
              {product.weight && (
                <div className="flex justify-between border-b pb-2">
                  <dt className="text-muted-foreground">Вес:</dt>
                  <dd className="font-medium">{product.weight} кг</dd>
                </div>
              )}
              {product.dimensions && (
                <div className="flex justify-between border-b pb-2">
                  <dt className="text-muted-foreground">Размеры:</dt>
                  <dd className="font-medium">
                    {product.dimensions.width}×{product.dimensions.height}×
                    {product.dimensions.depth} {product.dimensions.unit || "мм"}
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
