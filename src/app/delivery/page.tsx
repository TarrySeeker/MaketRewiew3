export default function DeliveryPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="text-center mb-16">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 uppercase tracking-wider text-zinc-900">Доставка и оплата</h1>
        <div className="w-24 h-1 bg-primary mx-auto"></div>
      </div>

      <div className="space-y-12">
        <section className="border-l-4 border-primary pl-6">
          <h2 className="font-display text-2xl font-bold mb-4 uppercase tracking-wider text-zinc-900">Доставка</h2>
          <div className="space-y-4 text-zinc-600 font-sans text-lg">
            <p><strong>Бесплатная доставка</strong> при заказе от 5 000 ₽ по всей России.</p>
            <p><strong>Курьерская доставка по Екатеринбургу:</strong> 1-2 рабочих дня. Стоимость — 300 ₽ (бесплатно от 5 000 ₽).</p>
            <p><strong>Доставка по России (СДЭК, Деловые Линии):</strong> 3-7 рабочих дней в зависимости от региона.</p>
            <p><strong>Самовывоз:</strong> бесплатно со склада по адресу г. Екатеринбург, ул. Промышленная, 1. Пн-Пт 9:00-18:00, Сб 10:00-15:00.</p>
          </div>
        </section>

        <section className="border-l-4 border-primary pl-6">
          <h2 className="font-display text-2xl font-bold mb-4 uppercase tracking-wider text-zinc-900">Оплата</h2>
          <div className="space-y-4 text-zinc-600 font-sans text-lg">
            <p><strong>Банковская карта</strong> — Visa, MasterCard, МИР. Оплата через защищённый платёжный шлюз.</p>
            <p><strong>Наличные</strong> — при самовывозе или курьерской доставке по Екатеринбургу.</p>
            <p><strong>Безналичный расчёт</strong> — для юридических лиц. Выставляем счёт, работаем с НДС.</p>
            <p><strong>Рассрочка</strong> — доступна для заказов от 10 000 ₽ через партнёрские банки.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
