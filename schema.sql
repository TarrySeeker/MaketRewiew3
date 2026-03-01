-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CATEGORIES
CREATE TABLE public.categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  parent_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  image TEXT,
  sort_order INTEGER DEFAULT 0
);
CREATE INDEX categories_slug_idx ON public.categories (slug);
CREATE INDEX categories_parent_id_idx ON public.categories (parent_id);

-- PRODUCTS
CREATE TABLE public.products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  sku TEXT UNIQUE,
  brand TEXT,
  price NUMERIC NOT NULL CHECK (price >= 0),
  old_price NUMERIC CHECK (old_price >= 0),
  description TEXT,
  images TEXT[] DEFAULT array[]::text[],
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  weight NUMERIC CHECK (weight >= 0),
  dimensions JSONB, -- {width, height, depth, unit}
  stock INTEGER DEFAULT 0 CHECK (stock >= 0),
  seo_title TEXT,
  seo_description TEXT,
  is_active BOOLEAN DEFAULT true
);
CREATE INDEX products_category_id_idx ON public.products (category_id);
CREATE INDEX products_is_active_idx ON public.products (is_active);
CREATE INDEX products_slug_idx ON public.products (slug);
CREATE INDEX products_sku_idx ON public.products (sku);

-- ORDERS
CREATE TABLE public.orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'processing', 'completed', 'cancelled')),
  customer_info JSONB DEFAULT '{}'::jsonb, -- name, phone, email, address
  items JSONB DEFAULT '[]'::jsonb, -- array of product objects with calculated price
  total NUMERIC NOT NULL DEFAULT 0 CHECK (total >= 0),
  cdek_order_uuid TEXT,
  cdek_tracking TEXT,
  delivery_info JSONB, -- cdek delivery details
  user_id UUID REFERENCES auth.users(id)
);
CREATE INDEX orders_status_idx ON public.orders (status);
CREATE INDEX orders_created_at_idx ON public.orders (created_at);
CREATE INDEX orders_user_id_idx ON public.orders (user_id);

-- PROMO CODES
CREATE TABLE public.promo_codes (
  code TEXT PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  discount_type TEXT CHECK (discount_type IN ('fixed', 'percent')),
  value NUMERIC NOT NULL CHECK (value > 0),
  is_active BOOLEAN DEFAULT true,
  CONSTRAINT value_percent_check CHECK (
    (discount_type = 'percent' AND value <= 100) OR (discount_type = 'fixed')
  )
);
CREATE INDEX promo_codes_code_idx ON public.promo_codes (code);

-- CMS CONTENT
CREATE TABLE public.cms_content (
  key TEXT PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  content JSONB DEFAULT '{}'::jsonb
);

-- STORAGE BUCKETS
INSERT INTO storage.buckets (id, name, public) VALUES ('products', 'products', true)
ON CONFLICT (id) DO NOTHING;

-- ROW LEVEL SECURITY
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promo_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ ACCESS
CREATE POLICY "Enable read access for all users" ON public.products FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON public.cms_content FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON public.promo_codes FOR SELECT USING (true);

-- AUTHENTICATED FULL ACCESS (admin)
CREATE POLICY "Enable all access for authenticated users" ON public.products FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable all access for authenticated users" ON public.categories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable all access for authenticated users" ON public.orders FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable all access for authenticated users" ON public.promo_codes FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable all access for authenticated users" ON public.cms_content FOR ALL USING (auth.role() = 'authenticated');

-- ANYONE CAN CREATE ORDERS
CREATE POLICY "Enable insert for everyone" ON public.orders FOR INSERT WITH CHECK (true);

-- STORAGE POLICIES
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING ( bucket_id = 'products' );
CREATE POLICY "Auth Upload" ON storage.objects FOR INSERT WITH CHECK ( bucket_id = 'products' AND auth.role() = 'authenticated' );

-- UPDATED_AT TRIGGER
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  new.updated_at = now();
  RETURN new;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER handle_updated_at_products BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
CREATE TRIGGER handle_updated_at_orders BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
CREATE TRIGGER handle_updated_at_promo_codes BEFORE UPDATE ON public.promo_codes FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
CREATE TRIGGER handle_updated_at_cms_content BEFORE UPDATE ON public.cms_content FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
CREATE TRIGGER handle_updated_at_categories BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
