import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t-4 border-zinc-900 bg-white text-zinc-600">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h3 className="font-display font-bold mb-4 text-zinc-900 tracking-widest text-lg">ИНСТРУМЕНТ</h3>
            <p className="text-sm text-zinc-500 font-sans">
              Профессиональный инструмент. Высокое качество. Без компромиссов.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-zinc-900 uppercase tracking-wider text-sm">Навигация</h4>
            <ul className="space-y-3 text-sm font-sans font-bold">
              <li>
                <Link href="/catalog" className="hover:text-primary transition">
                  КАТАЛОГ
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition">
                  О КОМПАНИИ
                </Link>
              </li>
              <li>
                <Link href="/contacts" className="hover:text-primary transition">
                  КОНТАКТЫ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-zinc-900 uppercase tracking-wider text-sm">Информация</h4>
            <ul className="space-y-3 text-sm font-sans font-bold">
              <li>
                <Link href="/delivery" className="hover:text-primary transition">
                  ДОСТАВКА И ОПЛАТА
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-primary transition">
                  ВОЗВРАТ ТОВАРА
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-primary transition">
                  ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-zinc-900 uppercase tracking-wider text-sm">Контакты</h4>
            <ul className="space-y-3 text-sm font-sans font-bold">
              <li className="font-mono"><a href="tel:+73432000000" className="hover:text-primary transition">ТЕЛ: +7 (343) 200-00-00</a></li>
              <li className="font-mono"><a href="mailto:info@instrument.ru" className="hover:text-primary transition">MAIL: INFO@INSTRUMENT.RU</a></li>
              <li>ЕКАТЕРИНБУРГ, УЛ. ПРОМЫШЛЕННАЯ, 1</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t-2 border-zinc-200 flex flex-col md:flex-row justify-between items-center text-xs text-zinc-400 font-mono">
          <div>© {new Date().getFullYear()} ИНСТРУМЕНТ. ВСЕ ПРАВА ЗАЩИЩЕНЫ.</div>
        </div>
      </div>
    </footer>
  );
}
