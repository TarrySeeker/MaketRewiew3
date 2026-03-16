import Link from "next/link";

export default function AboutPage() {
  const stats = [
    { value: "С 1998 года", label: "на рынке" },
    { value: "20 000+", label: "довольных клиентов" },
    { value: "30 дней", label: "гарантия возврата" },
    { value: "15 000+", label: "товаров в каталоге" },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 uppercase tracking-wider text-zinc-900">О компании</h1>
        <div className="w-24 h-1 bg-primary mx-auto"></div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {stats.map((stat, i) => (
          <div key={i} className="border-2 border-zinc-200 p-6 text-center hover:border-primary hover:shadow-brutal transition-all">
            <div className="font-display text-2xl md:text-3xl font-black text-primary mb-2">{stat.value}</div>
            <div className="text-sm text-zinc-500 font-sans uppercase tracking-wider">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto space-y-8 mb-16">
        <div className="border-l-4 border-primary pl-6">
          <h2 className="font-display text-2xl font-bold mb-4 uppercase tracking-wider text-zinc-900">Наша история</h2>
          <p className="text-zinc-600 font-sans text-lg leading-relaxed">
            С 1998 года мы поставляем профессиональный инструмент для строительных компаний, 
            мастерских и частных мастеров по всей России. За более чем 25 лет работы мы выстроили 
            прямые контракты с ведущими производителями инструмента: BOSCH, MAKITA, DEWALT, 
            MILWAUKEE, HILTI и многими другими.
          </p>
        </div>

        <div className="border-l-4 border-primary pl-6">
          <h2 className="font-display text-2xl font-bold mb-4 uppercase tracking-wider text-zinc-900">Почему мы</h2>
          <ul className="text-zinc-600 font-sans text-lg space-y-3">
            <li>✓ Прямые поставки от производителей — без наценок посредников</li>
            <li>✓ Собственный склад в Екатеринбурге — отгрузка в день заказа</li>
            <li>✓ Бесплатная доставка по России от 5 000 ₽</li>
            <li>✓ Профессиональная консультация и подбор инструмента</li>
            <li>✓ Гарантийное и постгарантийное обслуживание</li>
          </ul>
        </div>

        <div className="border-l-4 border-primary pl-6">
          <h2 className="font-display text-2xl font-bold mb-4 uppercase tracking-wider text-zinc-900">Наши клиенты</h2>
          <p className="text-zinc-600 font-sans text-lg leading-relaxed">
            Среди наших клиентов — крупные строительные компании, производственные предприятия, 
            автосервисы и тысячи частных мастеров. Мы гордимся тем, что более 20 000 клиентов 
            доверяют нам выбор инструмента для своих проектов.
          </p>
        </div>
      </div>

      <div className="text-center">
        <Link href="/contacts" className="inline-block px-12 py-4 bg-primary text-white font-display text-xl uppercase tracking-widest border-2 border-primary hover:bg-white hover:text-primary transition-all shadow-brutal hover:shadow-none hover:translate-y-1">
          Связаться с нами
        </Link>
      </div>
    </div>
  );
}
