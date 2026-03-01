export default function ContactsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="font-display text-4xl font-bold mb-8">Контакты</h1>
      <div className="space-y-6">
        <div>
          <h2 className="font-semibold text-xl mb-2">Телефон</h2>
          <p className="text-muted-foreground">+7 (XXX) XXX-XX-XX</p>
        </div>
        <div>
          <h2 className="font-semibold text-xl mb-2">Email</h2>
          <p className="text-muted-foreground">info@instrument.ru</p>
        </div>
        <div>
          <h2 className="font-semibold text-xl mb-2">Адрес</h2>
          <p className="text-muted-foreground">Новосибирск, ул. Примерная, 1</p>
        </div>
        <div>
          <h2 className="font-semibold text-xl mb-2">Режим работы</h2>
          <p className="text-muted-foreground">Пн-Пт: 9:00 - 18:00</p>
          <p className="text-muted-foreground">Сб-Вс: выходной</p>
        </div>
      </div>
    </div>
  );
}
