import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t-4 border-zinc-900 bg-white text-zinc-600">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-display font-bold mb-4 text-zinc-900 tracking-widest text-lg">ИНСТРУМЕНТ</h3>
            <p className="text-sm text-zinc-500 font-sans">
              Профессиональный инструмент. Промышленные стандарты. Без компромиссов.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-zinc-900 uppercase tracking-wider text-sm">Навигация</h4>
            <ul className="space-y-3 text-sm font-sans font-bold">
              <li>
                <Link href="/catalog" className="hover:text-primary transition">
                  КАТаЛОГ
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition">
                  ЛАБОРАТОРИЯ
                </Link>
              </li>
              <li>
                <Link href="/contacts" className="hover:text-primary transition">
                  СВЯЗЬ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-zinc-900 uppercase tracking-wider text-sm">Контакты</h4>
            <ul className="space-y-3 text-sm font-sans font-bold">
              <li className="font-mono">ТЕЛ: +7 (XXX) XXX-XX-XX</li>
              <li className="font-mono">MAIL: INFO@INSTRUMENT.RU</li>
              <li>НОВОСИБИРСК, УЛ. ПРИМЕРНАЯ, 1</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t-2 border-zinc-200 flex flex-col md:flex-row justify-between items-center text-xs text-zinc-400 font-mono">
          <div>© {new Date().getFullYear()} ИНСТРУМЕНТ. ВСЕ ПРАВА ЗАЩИЩЕНЫ.</div>
          <div className="mt-4 md:mt-0 text-primary font-bold">SYS.VERSION: 3.0.0 - B R U T A L I S M</div>
        </div>
      </div>
    </footer>
  );
}
