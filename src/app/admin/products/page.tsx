"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import { Product, Category } from "@/lib/types";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("products")
      .select("*, category:categories(name)")
      .order("created_at", { ascending: false });
    setProducts(data || []);
    setLoading(false);
  };

  const fetchCategories = async () => {
    const { data } = await supabase.from("categories").select("*").order("name");
    setCategories(data || []);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Удалить товар?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (!error) {
      fetchProducts();
    }
  };

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-display text-3xl font-bold">Товары</h1>
        <Button onClick={() => {
          setEditingProduct(null);
          setShowDialog(true);
        }}>
          <Plus className="h-5 w-5 mr-2" />
          Добавить товар
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Поиск товаров..."
            className="w-full pl-10 pr-4 py-2 border rounded bg-background"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">Загрузка...</div>
      ) : (
        <div className="space-y-4">
          {filteredProducts.map((product) => (
            <Card key={product.id}>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-secondary rounded flex-shrink-0">
                    {product.images[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-full h-full object-cover rounded"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                        Нет фото
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{product.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {product.brand || "Без бренда"} • SKU: {product.sku || "—"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Категория: {(product as any).category?.name || "Без категории"}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-lg">{product.price.toLocaleString()} ₽</p>
                    <p className="text-sm text-muted-foreground">
                      В наличии: {product.stock} шт
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditingProduct(product);
                        setShowDialog(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Товары не найдены</p>
            </div>
          )}
        </div>
      )}

      {showDialog && (
        <ProductDialog
          product={editingProduct}
          categories={categories}
          onClose={() => {
            setShowDialog(false);
            fetchProducts();
          }}
        />
      )}
    </div>
  );
}

function ProductDialog({
  product,
  categories,
  onClose,
}: {
  product: Product | null;
  categories: Category[];
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    title: product?.title || "",
    slug: product?.slug || "",
    sku: product?.sku || "",
    brand: product?.brand || "",
    price: product?.price || 0,
    old_price: product?.old_price || 0,
    description: product?.description || "",
    category_id: product?.category_id || "",
    stock: product?.stock || 0,
    weight: product?.weight || 0,
    is_active: product?.is_active ?? true,
  });
  const [loading, setLoading] = useState(false);

  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      ...formData,
      images: product?.images || [],
    };

    if (product) {
      await supabase.from("products").update(data).eq("id", product.id);
    } else {
      await supabase.from("products").insert(data);
    }

    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardContent className="p-6">
          <h2 className="font-display text-2xl font-bold mb-6">
            {product ? "Редактировать товар" : "Новый товар"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Название *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border rounded bg-background"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Slug *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border rounded bg-background"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({ ...formData, slug: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">SKU</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded bg-background"
                  value={formData.sku}
                  onChange={(e) =>
                    setFormData({ ...formData, sku: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Бренд</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded bg-background"
                  value={formData.brand}
                  onChange={(e) =>
                    setFormData({ ...formData, brand: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Цена *</label>
                <input
                  type="number"
                  required
                  min="0"
                  className="w-full px-4 py-2 border rounded bg-background"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: parseFloat(e.target.value) })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Старая цена</label>
                <input
                  type="number"
                  min="0"
                  className="w-full px-4 py-2 border rounded bg-background"
                  value={formData.old_price || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      old_price: parseFloat(e.target.value) || 0,
                    })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Категория</label>
                <select
                  className="w-full px-4 py-2 border rounded bg-background"
                  value={formData.category_id}
                  onChange={(e) =>
                    setFormData({ ...formData, category_id: e.target.value })
                  }
                >
                  <option value="">Без категории</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Остаток</label>
                <input
                  type="number"
                  min="0"
                  className="w-full px-4 py-2 border rounded bg-background"
                  value={formData.stock}
                  onChange={(e) =>
                    setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })
                  }
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Описание</label>
              <textarea
                className="w-full px-4 py-2 border rounded bg-background"
                rows={4}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="is_active"
                checked={formData.is_active}
                onChange={(e) =>
                  setFormData({ ...formData, is_active: e.target.checked })
                }
              />
              <label htmlFor="is_active" className="text-sm">Активен</label>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" disabled={loading}>
                {loading ? "Сохраняем..." : "Сохранить"}
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Отмена
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
