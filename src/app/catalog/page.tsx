import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockCategories } from "@/lib/mockData";
import { TiltCard } from "@/components/ui/TiltCard";

export default async function CatalogPage() {
  const supabase = await createClient();
  let categories = null;

  try {
    const { data: dbCategories } = await supabase
      .from("categories")
      .select("*")
      .is("parent_id", null)
      .order("sort_order");
    categories = dbCategories && dbCategories.length > 0 ? dbCategories : mockCategories;
  } catch (err) {
    categories = mockCategories;
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 uppercase tracking-wider text-zinc-900">Каталог</h1>
        <div className="w-24 h-1 bg-primary mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories?.map((category) => (
          <Link key={category.id} href={`/catalog/${category.slug}`}>
            <TiltCard>
              <Card className="glass cursor-pointer h-full border-zinc-200 bg-white hover:bg-zinc-50 hover:shadow-neon-red-lg transition-all duration-300 rounded-none group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <CardHeader>
                  <CardTitle className="text-xl uppercase tracking-wider text-zinc-900 group-hover:text-primary transition-colors">{category.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-sans tracking-widest text-zinc-500 group-hover:text-primary transition-colors uppercase mt-4 flex items-center gap-2">
                    Изучить арсенал <span className="text-primary group-hover:translate-x-2 transition-transform">→</span>
                  </p>
                </CardContent>
              </Card>
            </TiltCard>
          </Link>
        ))}
      </div>

      {(!categories || categories.length === 0) && (
        <div className="text-center py-24 border border-zinc-200 bg-white shadow-brutal">
          <p className="text-zinc-500 font-mono text-sm uppercase tracking-widest">
            {">"} БАЗА ДАННЫХ ПУСТА. СИСТЕМА ОЖИДАЕТ ВВОДА {"<"}
          </p>
        </div>
      )}
    </div>
  );
}
