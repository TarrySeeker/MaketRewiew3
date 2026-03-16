export interface Category {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  slug: string;
  parent_id: string | null;
  image: string | null;
  sort_order: number;
}

export interface Product {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  slug: string;
  sku: string | null;
  brand: string | null;
  price: number;
  old_price: number | null;
  description: string | null;
  images: string[];
  category_id: string | null;
  weight: number | null;
  dimensions: {
    width?: number;
    height?: number;
    depth?: number;
    unit?: string;
  } | null;
  stock: number;
  seo_title: string | null;
  seo_description: string | null;
  is_active: boolean;
  power?: string | null;
  voltage?: string | null;
  material?: string | null;
  country?: string | null;
  warranty?: string | null;
  purpose?: string | null;
  inStock?: boolean;
}

export interface Order {
  id: string;
  created_at: string;
  updated_at: string;
  status: "new" | "processing" | "completed" | "cancelled";
  customer_info: {
    name?: string;
    phone?: string;
    email?: string;
    address?: string;
  };
  items: Array<{
    product_id: string;
    title: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  cdek_order_uuid: string | null;
  cdek_tracking: string | null;
  delivery_info: any;
  user_id: string | null;
}

export interface PromoCode {
  code: string;
  created_at: string;
  updated_at: string;
  discount_type: "fixed" | "percent";
  value: number;
  is_active: boolean;
}

export interface CMSContent {
  key: string;
  created_at: string;
  updated_at: string;
  content: any;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
