export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="font-display text-4xl font-bold mb-8">О компании</h1>
      <div className="prose prose-invert max-w-none">
        <p className="text-muted-foreground text-lg mb-4">
          Интернет-магазин профессионального инструмента.
        </p>
        <p className="text-muted-foreground">
          Мы предлагаем широкий ассортимент ручного и электроинструмента от ведущих
          производителей. Работаем напрямую с поставщиками, что позволяет предложить
          вам лучшие цены на рынке.
        </p>
      </div>
    </div>
  );
}
