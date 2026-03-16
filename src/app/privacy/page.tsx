export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="text-center mb-16">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 uppercase tracking-wider text-zinc-900">Политика конфиденциальности</h1>
        <div className="w-24 h-1 bg-primary mx-auto"></div>
      </div>

      <div className="space-y-8 text-zinc-600 font-sans text-base leading-relaxed">
        <section>
          <h2 className="font-display text-xl font-bold mb-3 uppercase tracking-wider text-zinc-900">1. Общие положения</h2>
          <p>Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей интернет-магазина «Инструмент» (далее — Оператор). Оператор обеспечивает защиту обрабатываемых персональных данных от несанкционированного доступа и разглашения в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных».</p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold mb-3 uppercase tracking-wider text-zinc-900">2. Сбор персональных данных</h2>
          <p>Оператор собирает следующие персональные данные: имя, фамилия, номер телефона, адрес электронной почты, адрес доставки, данные о заказах. Сбор данных осуществляется при оформлении заказа, регистрации на сайте, подписке на рассылку и обращении через форму обратной связи.</p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold mb-3 uppercase tracking-wider text-zinc-900">3. Использование данных</h2>
          <p>Персональные данные используются для: обработки и доставки заказов, связи с покупателем, улучшения качества обслуживания, отправки информационных и рекламных сообщений (с согласия пользователя).</p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold mb-3 uppercase tracking-wider text-zinc-900">4. Защита данных</h2>
          <p>Оператор принимает необходимые организационные и технические меры для защиты персональных данных от неправомерного или случайного доступа, уничтожения, изменения, блокирования, копирования, распространения, а также от иных неправомерных действий третьих лиц.</p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold mb-3 uppercase tracking-wider text-zinc-900">5. Передача данных третьим лицам</h2>
          <p>Персональные данные могут быть переданы третьим лицам только в случаях: доставка заказа (курьерские службы), обработка платежей (платёжные системы), требования законодательства РФ.</p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold mb-3 uppercase tracking-wider text-zinc-900">6. Cookies</h2>
          <p>Сайт использует файлы cookies для обеспечения корректной работы, персонализации контента и анализа трафика. Пользователь может отключить cookies в настройках браузера.</p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold mb-3 uppercase tracking-wider text-zinc-900">7. Права пользователя</h2>
          <p>Пользователь имеет право: запросить информацию об обработке своих данных, потребовать их изменения или удаления, отозвать согласие на обработку. Для этого направьте запрос на <a href="mailto:info@instrument.ru" className="text-primary hover:underline">info@instrument.ru</a>.</p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold mb-3 uppercase tracking-wider text-zinc-900">8. Контактная информация</h2>
          <p>По вопросам обработки персональных данных обращайтесь: <a href="mailto:info@instrument.ru" className="text-primary hover:underline">info@instrument.ru</a>, тел. <a href="tel:+73432000000" className="text-primary hover:underline">+7 (343) 200-00-00</a>.</p>
        </section>
      </div>
    </div>
  );
}
