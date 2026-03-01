import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Hammer, 
  Wrench, 
  Drill, 
  SeparatorVertical,
  Ruler,
  Zap 
} from "lucide-react";

const categories = [
  { name: "Электроинструмент", icon: Zap, slug: "elektroinstrument", color: "text-yellow-500" },
  { name: "Ручной инструмент", icon: Hammer, slug: "ruchnoy-instrument", color: "text-blue-500" },
  { name: "Расходные материалы", icon: SeparatorVertical, slug: "raskhodnye", color: "text-green-500" },
  { name: "Измерительный инструмент", icon: Ruler, slug: "izmeritelnyy", color: "text-purple-500" },
  { name: "Садовая техника", icon: Wrench, slug: "sadovaya-tekhnika", color: "text-red-500" },
  { name: "Спецодежда", icon: Drill, slug: "spetsodezhda", color: "text-orange-500" },
];

const advantages = [
  { title: "Бесплатная доставка", description: "От 5000 ₽ по России" },
  { title: "Гарантия качества", description: "Официальная гарантия на все товары" },
  { title: "Низкие цены", description: "Прямые поставки от производителей" },
  { title: "Быстрая доставка", description: "Доставка СДЭК по всей России" },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-background via-secondary to-background py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
            Профессиональный
            <br />
            <span className="text-primary">Инструмент</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Широкий ассортимент ручного и электроинструмента от ведущих производителей
          </p>
          <Link href="/catalog">
            <Button size="lg" className="text-lg px-8">
              Перейти в каталог
            </Button>
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="font-display text-3xl font-bold mb-8 text-center">
          Категории товаров
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link key={cat.slug} href={`/catalog/${cat.slug}`}>
                <Card className="hover:border-primary transition cursor-pointer h-full">
                  <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                    <Icon className={`h-10 w-10 ${cat.color}`} />
                    <span className="text-sm font-medium">{cat.name}</span>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Advantages */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((adv, i) => (
              <div key={i} className="text-center">
                <h3 className="font-semibold mb-2">{adv.title}</h3>
                <p className="text-sm text-muted-foreground">{adv.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="font-display text-3xl font-bold mb-4">
          Не нашли нужный инструмент?
        </h2>
        <p className="text-muted-foreground mb-6">
          Свяжитесь с нами, и мы поможем подобрать оптимальное решение
        </p>
        <Link href="/contacts">
          <Button variant="outline" size="lg">
            Связаться с нами
          </Button>
        </Link>
      </section>
    </div>
  );
}
