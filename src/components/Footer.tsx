import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t bg-card">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-display font-bold mb-4">ИНСТРУМЕНТ</h3>
            <p className="text-sm text-muted-foreground">
              Профессиональный инструмент для профессионалов
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Навигация</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/catalog" className="hover:text-primary transition">
                  Каталог
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition">
                  О нас
                </Link>
              </li>
              <li>
                <Link href="/contacts" className="hover:text-primary transition">
                  Контакты
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Контакты</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Телефон: +7 (XXX) XXX-XX-XX</li>
              <li>Email: info@instrument.ru</li>
              <li>Новосибирск, ул. Примерная, 1</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Инструмент. Все права защищены.
        </div>
      </div>
    </footer>
  );
}
