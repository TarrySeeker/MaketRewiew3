export default function ReturnsPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="text-center mb-16">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 uppercase tracking-wider text-zinc-900">Возврат товара</h1>
        <div className="w-24 h-1 bg-primary mx-auto"></div>
      </div>

      <div className="space-y-12">
        <section className="border-l-4 border-primary pl-6">
          <h2 className="font-display text-2xl font-bold mb-4 uppercase tracking-wider text-zinc-900">Условия возврата</h2>
          <div className="space-y-4 text-zinc-600 font-sans text-lg">
            <p>Вы можете вернуть товар надлежащего качества в течение <strong>30 дней</strong> с момента покупки.</p>
            <p>Товар должен сохранять товарный вид, потребительские свойства, фабричную упаковку и ярлыки.</p>
            <p>Возврат товара ненадлежащего качества осуществляется в течение гарантийного срока.</p>
          </div>
        </section>

        <section className="border-l-4 border-primary pl-6">
          <h2 className="font-display text-2xl font-bold mb-4 uppercase tracking-wider text-zinc-900">Как вернуть товар</h2>
          <div className="space-y-4 text-zinc-600 font-sans text-lg">
            <p><strong>1.</strong> Свяжитесь с нами по телефону <a href="tel:+73432000000" className="text-primary hover:underline">+7 (343) 200-00-00</a> или email <a href="mailto:info@instrument.ru" className="text-primary hover:underline">info@instrument.ru</a></p>
            <p><strong>2.</strong> Заполните заявление на возврат (предоставим форму).</p>
            <p><strong>3.</strong> Отправьте товар на наш склад или привезите лично.</p>
            <p><strong>4.</strong> Возврат денежных средств — в течение 10 рабочих дней после получения товара.</p>
          </div>
        </section>

        <section className="border-l-4 border-primary pl-6">
          <h2 className="font-display text-2xl font-bold mb-4 uppercase tracking-wider text-zinc-900">Гарантия</h2>
          <div className="space-y-4 text-zinc-600 font-sans text-lg">
            <p>На весь инструмент распространяется <strong>официальная гарантия производителя</strong>.</p>
            <p>Гарантийный срок указан в карточке каждого товара и составляет от 1 до 5 лет в зависимости от бренда.</p>
            <p>Гарантийный ремонт осуществляется через авторизованные сервисные центры.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
