"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Category } from "@/lib/types";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("categories")
      .select("*")
      .order("sort_order");
    setCategories(data || []);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Удалить категорию?")) return;
    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (!error) {
      fetchCategories();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-display text-3xl font-bold">Категории</h1>
        <Button onClick={() => {
          setEditingCategory(null);
          setShowDialog(true);
        }}>
          <Plus className="h-5 w-5 mr-2" />
          Добавить категорию
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-12">Загрузка...</div>
      ) : (
        <div className="space-y-4">
          {categories.map((category) => (
            <Card key={category.id}>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Slug: {category.slug}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditingCategory(category);
                      setShowDialog(true);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(category.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {categories.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Категорий пока нет</p>
            </div>
          )}
        </div>
      )}

      {showDialog && (
        <CategoryDialog
          category={editingCategory}
          onClose={() => {
            setShowDialog(false);
            fetchCategories();
          }}
        />
      )}
    </div>
  );
}

function CategoryDialog({
  category,
  onClose,
}: {
  category: Category | null;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    name: category?.name || "",
    slug: category?.slug || "",
    sort_order: category?.sort_order || 0,
  });
  const [loading, setLoading] = useState(false);

  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (category) {
      await supabase.from("categories").update(formData).eq("id", category.id);
    } else {
      await supabase.from("categories").insert(formData);
    }

    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <h2 className="font-display text-2xl font-bold mb-6">
            {category ? "Редактировать категорию" : "Новая категория"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Название *</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 border rounded bg-background"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
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
              <label className="block text-sm font-medium mb-2">
                Порядок сортировки
              </label>
              <input
                type="number"
                className="w-full px-4 py-2 border rounded bg-background"
                value={formData.sort_order}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sort_order: parseInt(e.target.value) || 0,
                  })
                }
              />
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
