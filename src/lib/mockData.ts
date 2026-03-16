import { Category, Product } from "./types";

export const mockCategories: Category[] = [
    { id: "cat-1", created_at: new Date().toISOString(), updated_at: new Date().toISOString(), name: "Электроинструмент", slug: "power-tools", parent_id: null, image: null, sort_order: 1 },
    { id: "cat-2", created_at: new Date().toISOString(), updated_at: new Date().toISOString(), name: "Ручной инструмент", slug: "hand-tools", parent_id: null, image: null, sort_order: 2 },
    { id: "cat-3", created_at: new Date().toISOString(), updated_at: new Date().toISOString(), name: "Измерительный инструмент", slug: "measuring-tools", parent_id: null, image: null, sort_order: 3 },
    { id: "cat-4", created_at: new Date().toISOString(), updated_at: new Date().toISOString(), name: "Расходные материалы", slug: "accessories", parent_id: null, image: null, sort_order: 4 },
    { id: "cat-5", created_at: new Date().toISOString(), updated_at: new Date().toISOString(), name: "Садовая техника", slug: "sadovaya-tekhnika", parent_id: null, image: null, sort_order: 5 },
    { id: "cat-6", created_at: new Date().toISOString(), updated_at: new Date().toISOString(), name: "Спецодежда и СИЗ", slug: "spetsodezhda", parent_id: null, image: null, sort_order: 6 },
    { id: "cat-7", created_at: new Date().toISOString(), updated_at: new Date().toISOString(), name: "Сварочное оборудование", slug: "welding", parent_id: null, image: null, sort_order: 7 },
    { id: "cat-8", created_at: new Date().toISOString(), updated_at: new Date().toISOString(), name: "Строительное оборудование", slug: "construction", parent_id: null, image: null, sort_order: 8 },
];

const mockBrands = ["BOSCH", "MAKITA", "DEWALT", "MILWAUKEE", "HILTI", "ЗУБР", "METABO", "HUSQVARNA", "STIHL", "FUBAG", "РЕСАНТА", "ИНТЕРСКОЛ"];

const powers = ["500 Вт", "750 Вт", "1000 Вт", "1200 Вт", "1500 Вт", "1800 Вт", "2000 Вт", "2200 Вт", "2500 Вт", null];
const voltages = ["220 В", "12 В", "18 В", "36 В", "40 В", null];
const materials = ["Сталь", "Хром-ванадий", "Алюминий", "Пластик ABS", "Карбон", "Нержавеющая сталь", null];
const countries = ["Германия", "Япония", "Китай", "Россия", "Швеция", "США"];
const warranties = ["1 год", "2 года", "3 года", "5 лет"];
const purposes = ["Профессиональный", "Бытовой", "Полупрофессиональный", "Промышленный"];

const productNames: Record<string, string[]> = {
    "power-tools": ["Дрель-шуруповёрт", "Перфоратор", "Болгарка УШМ", "Электролобзик", "Циркулярная пила", "Фрезер", "Шлифмашина", "Строительный фен", "Электрорубанок", "Отбойный молоток", "Цепная пила", "Реноватор", "Гайковёрт", "Миксер строительный", "Штроборез", "Полировальная машина", "Торцовочная пила", "Рейсмусовый станок", "Ленточная пила", "Сабельная пила"],
    "hand-tools": ["Молоток слесарный", "Набор отвёрток", "Ключ разводной", "Набор гаечных ключей", "Плоскогубцы", "Бокорезы", "Ножовка по дереву", "Ножовка по металлу", "Набор шестигранников", "Стамеска", "Рубанок ручной", "Напильник", "Клещи", "Труборез", "Ключ трубный", "Набор торцевых головок", "Кусачки", "Тиски слесарные", "Струбцина", "Топор"],
    "measuring-tools": ["Лазерный уровень", "Рулетка 5м", "Рулетка 10м", "Штангенциркуль", "Угольник строительный", "Дальномер лазерный", "Нивелир оптический", "Линейка металлическая", "Микрометр", "Уровень пузырьковый", "Транспортир", "Глубиномер", "Толщиномер", "Тахеометр", "Детектор проводки", "Термометр инфракрасный", "Влагомер", "Анемометр", "Люксметр", "Мультиметр"],
    "accessories": ["Свёрла по металлу набор", "Свёрла по бетону набор", "Диск отрезной по металлу", "Диск алмазный", "Биты для шуруповёрта", "Буры SDS-plus", "Коронки по дереву", "Фрезы по дереву", "Наждачная бумага", "Шлифовальные круги", "Полотна для лобзика", "Ленты шлифовальные", "Патрон для дрели", "Удлинитель магнитный", "Переходник SDS", "Набор коронок", "Цепь для пилы", "Диск пильный", "Клей строительный", "Герметик силиконовый"],
    "sadovaya-tekhnika": ["Газонокосилка бензиновая", "Газонокосилка электрическая", "Триммер бензиновый", "Триммер электрический", "Кусторез", "Воздуходувка", "Мотокультиватор", "Мотоблок", "Опрыскиватель", "Измельчитель садовый", "Снегоуборщик", "Высоторез", "Насос садовый", "Аэратор газона", "Скарификатор", "Садовый пылесос", "Бензопила", "Электропила", "Садовый шланг 50м", "Разбрызгиватель"],
    "spetsodezhda": ["Каска строительная", "Очки защитные", "Перчатки рабочие", "Наушники защитные", "Респиратор", "Ботинки рабочие", "Комбинезон рабочий", "Куртка утеплённая", "Жилет сигнальный", "Наколенники", "Пояс монтажный", "Страховочная привязь", "Щиток защитный", "Фартук сварщика", "Краги сварочные", "Маска сварщика", "Костюм рабочий", "Нарукавники", "Беруши", "Противогаз"],
    "welding": ["Инвертор сварочный MMA", "Полуавтомат MIG/MAG", "Аргонодуговой аппарат TIG", "Плазморез", "Электроды МР-3", "Электроды УОНИ", "Проволока сварочная", "Газовый баллон", "Редуктор кислородный", "Горелка газовая", "Маска сварщика хамелеон", "Клеммы заземления", "Кабель сварочный", "Держатель электродов", "Сопло для полуавтомата", "Флюс", "Припой", "Паяльная станция", "Газовый резак", "Осушитель газа"],
    "construction": ["Бетономешалка", "Вибратор для бетона", "Виброплита", "Генератор бензиновый", "Генератор дизельный", "Компрессор поршневой", "Компрессор винтовой", "Тепловая пушка газовая", "Тепловая пушка электрическая", "Штукатурная станция", "Лебёдка", "Домкрат гидравлический", "Стремянка алюминиевая", "Лестница-трансформер", "Строительные леса", "Тележка строительная", "Ведро строительное", "Кельма", "Правило алюминиевое", "Уровень магнитный"],
};

const categoryImagePools: Record<string, string[]> = {
    "power-tools": ["/images/tools/drill.png"],
    "hand-tools": ["/images/tools/hammer.png"],
    "measuring-tools": ["/images/tools/ruler.png"],
    "accessories": ["/images/tools/accessories.png"],
    "sadovaya-tekhnika": ["/images/tools/drill.png"],
    "spetsodezhda": ["/images/tools/accessories.png"],
    "welding": ["/images/tools/drill.png"],
    "construction": ["/images/tools/hammer.png"],
};

export const mockProducts: Product[] = mockCategories.flatMap((category) => {
    const names = productNames[category.slug] || productNames["hand-tools"];
    return names.map((productName, index) => {
        const brand = mockBrands[index % mockBrands.length];
        const price = Math.floor(Math.random() * 45000) + 1500;
        const isDiscounted = Math.random() > 0.6;
        const imagePool = categoryImagePools[category.slug] || ["/images/tools/hammer.png"];
        const primaryImage = imagePool[0];

        return {
            id: `prod-${category.id}-${index + 1}`,
            created_at: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
            updated_at: new Date().toISOString(),
            title: `${productName} ${brand}`,
            slug: `${category.slug}-${brand.toLowerCase()}-${index + 1}`,
            sku: `SKU-${brand.substring(0, 3)}-${category.sort_order}${String(index + 1).padStart(2, '0')}`,
            brand,
            price,
            old_price: isDiscounted ? price + Math.floor(price * 0.25) : null,
            description: `${productName} от ${brand}. Профессиональная модель для интенсивного использования. Увеличенный ресурс работы, эргономичная конструкция, соответствие промышленным стандартам качества. Гарантия производителя.`,
            images: [primaryImage, primaryImage],
            category_id: category.id,
            weight: parseFloat((Math.random() * 8 + 0.5).toFixed(1)),
            dimensions: {
                width: Math.floor(Math.random() * 300) + 50,
                height: Math.floor(Math.random() * 300) + 50,
                depth: Math.floor(Math.random() * 300) + 50,
                unit: "мм",
            },
            stock: Math.floor(Math.random() * 100) + 1,
            seo_title: `${productName} ${brand} — купить в интернет-магазине`,
            seo_description: `Купить ${productName.toLowerCase()} ${brand} по выгодной цене. Доставка по России. Гарантия.`,
            is_active: true,
            power: powers[index % powers.length],
            voltage: voltages[index % voltages.length],
            material: materials[index % materials.length],
            country: countries[index % countries.length],
            warranty: warranties[index % warranties.length],
            purpose: purposes[index % purposes.length],
            inStock: Math.random() > 0.15,
        };
    });
});

export const getMockCategoryBySlug = (slug: string) => {
    return mockCategories.find((c) => c.slug === slug) || null;
};

export const getMockProductsByCategoryId = (categoryId: string) => {
    return mockProducts.filter((p) => p.category_id === categoryId);
};

export const getMockProductById = (id: string) => {
    return mockProducts.find((p) => p.id === id) || null;
};
