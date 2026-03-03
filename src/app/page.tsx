import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollytellingSceneWrapper } from "@/components/3d/ScrollytellingSceneWrapper";
import { HeroOverlay } from "@/components/home/HeroOverlay";
import {
  Hammer,
  Wrench,
  Drill,
  SeparatorVertical,
  Ruler,
  Zap
} from "lucide-react";

const categories = [
  { name: "Электроинструмент", icon: Zap, slug: "elektroinstrument", color: "text-primary" },
  { name: "Ручной инструмент", icon: Hammer, slug: "ruchnoy-instrument", color: "text-foreground" },
  { name: "Расходные материалы", icon: SeparatorVertical, slug: "raskhodnye", color: "text-muted-foreground" },
  { name: "Измерительный инструмент", icon: Ruler, slug: "izmeritelnyy", color: "text-primary" },
  { name: "Садовая техника", icon: Wrench, slug: "sadovaya-tekhnika", color: "text-foreground" },
  { name: "Спецодежда", icon: Drill, slug: "spetsodezhda", color: "text-muted-foreground" },
];

const advantages = [
  { title: "Бесплатная доставка", description: "От 5000 ₽ по России с трекингом на каждом этапе" },
  { title: "Индустриальное качество", description: "Официальная гарантия и тест-драйв до 30 дней" },
  { title: "Прямые контракты", description: "Оптовые поставки от заводов без наценок дистрибьюторов" },
  { title: "Молниеносная сборка", description: "Отгрузка со склада за 2 часа после подтверждения" },
];

export default function HomePage() {
  return (
    <div className="relative w-full">
      {/* 3D Background Scene (Sticky & Behind) */}
      <ScrollytellingSceneWrapper />

      {/* Hero Content (Over 3D Canvas) */}
      <HeroOverlay />

      {/* Categories (Brutalist Grid) */}
      <section className="relative z-10 container mx-auto px-4 py-24 mt-32">
        <div className="mb-16 border-b-4 border-zinc-900 pb-4 flex items-end justify-between">
          <h2 className="font-display text-5xl md:text-6xl font-black uppercase tracking-widest text-zinc-900 leading-none">
            АРСЕНАЛ
          </h2>
          <div className="hidden md:block text-zinc-500 font-mono text-sm">СЕКТОР: КАТАЛОГ</div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link key={cat.slug} href={`/catalog/${cat.slug}`}>
                <Card className="glass border-2 border-zinc-200 hover:border-zinc-900 hover:shadow-brutal transition-all duration-300 cursor-pointer h-full bg-white group rounded-none">
                  <CardContent className="p-8 flex flex-col items-center text-center gap-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-zinc-50 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                    <div className="p-4 border-2 border-zinc-100 bg-white group-hover:border-primary group-hover:bg-primary/10 transition-colors z-10">
                      <Icon className={`h-8 w-8 text-zinc-800 group-hover:text-primary transition-colors group-hover:scale-110`} />
                    </div>
                    <span className="text-sm font-display font-bold uppercase tracking-widest text-zinc-600 group-hover:text-zinc-900 transition-colors z-10">{cat.name}</span>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Advantages */}
      <section className="relative z-10 bg-white border-y-4 border-zinc-900 py-24 mb-32 shadow-brutal">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {advantages.map((adv, i) => (
              <div key={i} className="text-center md:text-left group relative bg-zinc-50 border-2 border-zinc-200 p-8 hover:border-primary hover:shadow-neon-red transition-all">
                <div className="text-primary font-display text-4xl mb-6 font-black opacity-30 group-hover:opacity-100 transition-opacity">0{i + 1}</div>
                <h3 className="font-display text-2xl uppercase tracking-wider font-bold mb-4 text-zinc-900">{adv.title}</h3>
                <p className="text-sm text-zinc-600 font-mono leading-relaxed">{adv.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 container mx-auto px-4 text-center pb-32">
        <div className="max-w-4xl mx-auto bg-zinc-900 p-16 border-4 border-primary shadow-brutal relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-blueprint opacity-20"></div>
          <h2 className="font-display text-5xl md:text-6xl font-black mb-8 text-white uppercase tracking-widest relative z-10">
            НЕТ НУЖНОЙ ДЕТАЛИ?
          </h2>
          <p className="text-zinc-400 mb-12 text-xl font-mono relative z-10">
            Прямая связь с инженерным отделом. Подберем кастомное решение или нужный расходник для ваших задач.
          </p>
          <Link href="/contacts" className="relative z-10">
            <Button variant="outline" size="lg" className="h-16 px-12 text-xl bg-primary text-white border-2 border-primary rounded-none hover:bg-white hover:text-black hover:border-white uppercase tracking-widest font-display transition-all shadow-brutal hover:shadow-none hover:translate-y-1">
              ИНИЦИИРОВАТЬ СВЯЗЬ
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
