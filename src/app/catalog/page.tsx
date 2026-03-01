import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function CatalogPage() {
  const supabase = await createClient();
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .is("parent_id", null)
    .order("sort_order");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-display text-4xl font-bold mb-8">Каталог товаров</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories?.map((category) => (
          <Link key={category.id} href={`/catalog/${category.slug}`}>
            <Card className="hover:border-primary transition cursor-pointer h-full">
              <CardHeader>
                <CardTitle className="text-xl">{category.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Посмотреть товары →
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {(!categories || categories.length === 0) && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            Категории пока не добавлены. Перейдите в админ-панель для добавления.
          </p>
        </div>
      )}
    </div>
  );
}
