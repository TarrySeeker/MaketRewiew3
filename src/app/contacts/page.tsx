export default function ContactsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 uppercase tracking-wider text-zinc-900">Контакты</h1>
        <div className="w-24 h-1 bg-primary mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div className="space-y-8">
          <div className="border-2 border-zinc-200 p-6 hover:border-primary transition-colors">
            <h2 className="font-display font-bold text-xl mb-3 uppercase tracking-wider text-zinc-900">Телефон</h2>
            <a href="tel:+73432000000" className="text-lg text-primary hover:underline font-mono">+7 (343) 200-00-00</a>
          </div>
          <div className="border-2 border-zinc-200 p-6 hover:border-primary transition-colors">
            <h2 className="font-display font-bold text-xl mb-3 uppercase tracking-wider text-zinc-900">Email</h2>
            <a href="mailto:info@instrument.ru" className="text-lg text-primary hover:underline font-mono">info@instrument.ru</a>
          </div>
          <div className="border-2 border-zinc-200 p-6 hover:border-primary transition-colors">
            <h2 className="font-display font-bold text-xl mb-3 uppercase tracking-wider text-zinc-900">Адрес</h2>
            <p className="text-zinc-600 font-sans">г. Екатеринбург, ул. Промышленная, 1</p>
          </div>
          <div className="border-2 border-zinc-200 p-6 hover:border-primary transition-colors">
            <h2 className="font-display font-bold text-xl mb-3 uppercase tracking-wider text-zinc-900">Режим работы</h2>
            <p className="text-zinc-600 font-sans">Пн-Пт: 9:00 - 18:00</p>
            <p className="text-zinc-600 font-sans">Сб: 10:00 - 15:00</p>
            <p className="text-zinc-600 font-sans">Вс: выходной</p>
          </div>
        </div>

        <div className="border-2 border-zinc-200">
          <iframe
            src="https://yandex.ru/map-widget/v1/?um=constructor%3A0a1b2c3d4e5f&source=constructor&ll=60.597465%2C56.838011&z=15"
            width="100%"
            height="100%"
            style={{ minHeight: "500px", border: 0 }}
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}
