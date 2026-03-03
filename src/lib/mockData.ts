import { Category, Product } from "./types";

export const mockCategories: Category[] = [
    {
        id: "cat-1",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        name: "Электроинструмент",
        slug: "power-tools",
        parent_id: null,
        image: null,
        sort_order: 1,
    },
    {
        id: "cat-2",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        name: "Ручной инструмент",
        slug: "hand-tools",
        parent_id: null,
        image: null,
        sort_order: 2,
    },
    {
        id: "cat-3",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        name: "Измерительный инструмент",
        slug: "measuring-tools",
        parent_id: null,
        image: null,
        sort_order: 3,
    },
    {
        id: "cat-4",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        name: "Оснастка и расходники",
        slug: "accessories",
        parent_id: null,
        image: null,
        sort_order: 4,
    },
];

const mockBrands = ["BOSCH", "MAKITA", "DEWALT", "MILWAUKEE", "HILTI", "ZUBR"];

export const mockProducts: Product[] = mockCategories.flatMap((category) => {
    return Array.from({ length: 10 }).map((_, index) => {
        const id = `prod-${category.id}-${index + 1}`;
        const brand = mockBrands[index % mockBrands.length];
        const price = Math.floor(Math.random() * 20000) + 2000;
        const isDiscounted = Math.random() > 0.7;

        return {
            id,
            created_at: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
            updated_at: new Date().toISOString(),
            title: `${category.name.split(" ")[0]} ${brand} PRO-${index + 1}000`,
            slug: `${category.slug}-${brand.toLowerCase()}-${index + 1}`,
            sku: `SKU-${brand.substring(0, 3)}-${index + 1}00`,
            brand,
            price,
            old_price: isDiscounted ? price + Math.floor(price * 0.2) : null,
            description: `Высокопроизводительный ${category.name.toLowerCase()} для профессионального использования. Оснащен передовыми системами защиты и увеличенным ресурсом работы. Промышленный стандарт качества.`,
            images: [
                `https://images.unsplash.com/photo-1572981779307-38b8cabb2407?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`,
                `https://images.unsplash.com/photo-1530124566582-a618bc2615dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`
            ],
            category_id: category.id,
            weight: parseFloat((Math.random() * 5 + 1).toFixed(1)),
            dimensions: {
                width: Math.floor(Math.random() * 200) + 50,
                height: Math.floor(Math.random() * 200) + 50,
                depth: Math.floor(Math.random() * 200) + 50,
                unit: "мм",
            },
            stock: Math.floor(Math.random() * 50) + 5,
            seo_title: `${category.name} ${brand} PRO - купить`,
            seo_description: `Купить профессиональный ${category.name.toLowerCase()} от бренда ${brand}. В наличии.`,
            is_active: true,
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
