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

import Image from "next/image";

const categories = [
  { name: "Электроинструмент", icon: Zap, slug: "power-tools", color: "text-primary", image: "/images/tools/drill.png" },
  { name: "Ручной инструмент", icon: Hammer, slug: "hand-tools", color: "text-foreground", image: "/images/tools/hammer.png" },
  { name: "Расходные материалы", icon: SeparatorVertical, slug: "accessories", color: "text-muted-foreground", image: "/images/tools/accessories.png" },
  { name: "Измерительный инструмент", icon: Ruler, slug: "measuring-tools", color: "text-primary", image: "/images/tools/ruler.png" },
  { name: "Садовая техника", icon: Wrench, slug: "sadovaya-tekhnika", color: "text-foreground", image: "/images/tools/drill.png" },
  { name: "Спецодежда", icon: Drill, slug: "spetsodezhda", color: "text-muted-foreground", image: "/images/tools/accessories.png" },
];

const advantages = [
  { title: "Бесплатная доставка", description: "От 5000 ₽ по России с трекингом на каждом этапе" },
  { title: "Высокое качество", description: "Официальная гарантия и тест-драйв до 30 дней" },
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
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-widest text-zinc-900 leading-none">
            АРСЕНАЛ
          </h2>
          <div className="hidden md:block text-zinc-500 font-mono text-sm">СЕКТОР: КАТАЛОГ</div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link key={cat.slug} href={`/catalog/${cat.slug}`}>
                <Card className="glass border-2 border-zinc-200 hover:border-zinc-900 hover:shadow-brutal transition-all duration-300 cursor-pointer h-full bg-white group rounded-none overflow-hidden flex flex-col">
                  <div className="relative aspect-[4/3] w-full bg-zinc-100 overflow-hidden border-b-2 border-zinc-200 group-hover:border-zinc-900 transition-colors">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-zinc-900/10 group-hover:bg-transparent transition-colors z-10" />
                    <div className="absolute top-4 left-4 p-2 bg-white border-2 border-zinc-900 z-20 group-hover:bg-primary transition-colors">
                      <Icon className="h-5 w-5 text-zinc-900 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                  <CardContent className="p-6 flex flex-col items-center justify-center flex-grow bg-white">
                    <span className="text-sm md:text-base font-display font-bold uppercase tracking-widest text-zinc-900 text-center">{cat.name}</span>
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
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-black mb-6 md:mb-8 text-white uppercase tracking-widest relative z-10">
            НЕТ НУЖНОГО ТОВАРА?
          </h2>
          <p className="text-zinc-400 mb-8 md:mb-12 text-base md:text-xl font-mono relative z-10">
            Прямая связь с инженерным отделом. Подберем кастомное решение или нужный расходник для ваших задач.
          </p>
          <Link href="/contacts" className="relative z-10">
            <Button variant="outline" size="lg" className="h-14 sm:h-16 px-6 sm:px-12 text-base sm:text-xl bg-primary text-white border-2 border-primary rounded-none hover:bg-white hover:text-black hover:border-white uppercase tracking-widest font-display transition-all shadow-brutal hover:shadow-none hover:translate-y-1 w-full sm:w-auto">
              СВЯЗАТЬСЯ С НАМИ
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
