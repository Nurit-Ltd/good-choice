const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
const API_BASE = `${STRAPI_URL}/api/v1`;


const CATEGORIES = [
  { name: 'Sofas', slug: 'sofas', description: 'Curved and minimalist luxury sofas' },
  { name: 'Beds', slug: 'beds', description: 'Bespoke bedroom designs' },
  { name: 'Chairs', slug: 'chairs', description: 'Armchairs, lounge chairs & dining chairs' },
  { name: 'Wardrobes', slug: 'wardrobes', description: 'Modern storage & wardrobes' },
  { name: 'Living Room', slug: 'living-room', description: 'Sideboards, coffee tables & living furniture' },
  { name: 'Dining Room', slug: 'dining-room', description: 'Dining tables, chairs & benches' },
  { name: 'Lighting', slug: 'lighting', description: 'Floor lamps, pendants & ambient lighting' },
  { name: 'Home Decor', slug: 'home-decor', description: 'Mirrors, rugs & interior accents' },
  { name: 'Outdoor', slug: 'outdoor', description: 'Patio sets & outdoor lounge' },
];

const BRANDS = [
  { name: 'Good Choice Exclusive', slug: 'good-choice-exclusive', description: 'In-house luxury curved furniture' },
  { name: 'Scandinavian Atelier', slug: 'scandinavian-atelier', description: 'Nordic minimalist craftsmanship' },
  { name: 'Nordic Craft', slug: 'nordic-craft', description: 'Sustainable eco-friendly furniture' },
];

const RAW_PRODUCTS_DATA = [
  { name: "Gauguin", category: "Sofas", subcategory: "sofas", tag: "Made to order", price: 1450 },
  { name: "Zola", category: "Beds", subcategory: "beds", tag: "Made to order", price: 1200 },
  { name: "Bonaparte", category: "Chairs", subcategory: "lounge", tag: "Made to order", price: 1850 },
  { name: "Camus", category: "Wardrobes", subcategory: "wardrobes", tag: "Made to order", price: 2100 },
  { name: "Aura", category: "Chairs", subcategory: "armchairs", tag: "Made to order", price: 850 },
  { name: "Nordic", category: "Chairs", subcategory: "dining-chairs", tag: "Made to order", price: 620 },
  { name: "Solace", category: "Living Room", subcategory: "sideboards", tag: "Made to order", price: 1350 },
  { name: "Bello", category: "Home Decor", subcategory: "mirror", tag: "Made to order", price: 950 },
  { name: "Monet", category: "Sofas", subcategory: "sofas", tag: "Made to order", price: 1600 },
  { name: "Picasso", category: "Chairs", subcategory: "armchairs", tag: "Made to order", price: 890 },
  { name: "Dali", category: "Beds", subcategory: "beds", tag: "Made to order", price: 1380 },
  { name: "Rodin", category: "Living Room", subcategory: "coffee-tables", tag: "Made to order", price: 740 },
  { name: "Chagall", category: "Lighting", subcategory: "floor-lamps", tag: "Made to order", price: 420 },
  { name: "Klimt", category: "Home Decor", subcategory: "rugs", tag: "Made to order", price: 580 },
  { name: "Matisse", category: "Outdoor", subcategory: "loungers", tag: "Made to order", price: 1150 },
  { name: "Vermeer", category: "Dining Room", subcategory: "benches", tag: "Made to order", price: 690 },
];

const SITE_SETTING_DATA = {
  site_name: "Good Choice Furniture",
  announcement_text: "✨ Express Shipping Available Across Bangladesh | Free Delivery on Orders Over ৳25,000",
  support_phone: "+880 1700-000000",
  whatsapp_number: "8801700000000",
  support_email: "support@goodchoice.com",
  footer_bio: "Good Choice Furniture — Scandinavian minimalist design and luxury curved furniture crafted with premium materials.",
  copyright_text: "© 2026 Good Choice Furniture. All rights reserved.",
  social_links: {
    facebook: "https://facebook.com/goodchoice",
    instagram: "https://instagram.com/goodchoice",
    twitter: "https://twitter.com/goodchoice",
  },
  navigation_links: [
    { label: "Home", href: "/" },
    { label: "Product", href: "/products", hasDropdown: true, isMegaMenu: true },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
};

async function postData(endpoint, payload) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: payload }),
    });
    const json = await res.json();
    if (!res.ok) {
      console.warn(`[WARN] Failed to post to ${endpoint}:`, json?.error?.message || res.statusText);
      return null;
    }
    return json?.data;
  } catch (err) {
    console.error(`[ERR] Error posting to ${endpoint}:`, err.message);
    return null;
  }
}

async function seed() {
  console.log('🌱 Starting Strapi Data Seeding script...');

  // 1. Seed Categories
  const categoryMap = {};
  for (const cat of CATEGORIES) {
    console.log(`Seeding Category: ${cat.name}`);
    const created = await postData('/categories', {
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
      is_active: true,
    });
    if (created) {
      categoryMap[cat.name] = created.id;
    }
  }

  // 2. Seed Brands
  let brandId = null;
  for (const b of BRANDS) {
    console.log(`Seeding Brand: ${b.name}`);
    const created = await postData('/brands', {
      name: b.name,
      slug: b.slug,
      description: b.description,
      is_active: true,
    });
    if (created && !brandId) {
      brandId = created.id;
    }
  }

  // 3. Seed Products
  for (let i = 0; i < RAW_PRODUCTS_DATA.length; i++) {
    const p = RAW_PRODUCTS_DATA[i];
    const slug = p.name.toLowerCase().replace(/\s+/g, '-');
    console.log(`Seeding Product: ${p.name}`);

    const catId = categoryMap[p.category];
    await postData('/products', {
      name: p.name,
      slug: `${slug}-${i + 1}`,
      short_description: `Handcrafted modern ${p.category.toLowerCase()} piece designed with curved silhouette and minimalist Scandinavian aesthetics.`,
      description: `This modern curved ${p.category.toLowerCase()} piece features a soft, flowing profile with clean lines and precision craftsmanship. Upholstered in premium light-toned fabric, it blends seamlessly into sophisticated living spaces.`,
      base_price: p.price,
      base_stock_quantity: 15 + i,
      sku: `GC-${p.category.substring(0, 3).toUpperCase()}-${100 + i}`,
      catalog_status: 'available',
      is_active: true,
      feature_product: i < 6,
      trending_product: i % 2 === 0,
      specifications: {
        style: 'Modern Contemporary',
        seatingCapacity: p.category === 'Sofas' ? '3-4 Seater' : 'Standard Unit',
        upholstery: 'Premium Fabric',
      },
      categories: catId ? [catId] : [],
      brand: brandId || undefined,
    });
  }

  // 4. Seed Site Setting
  console.log('Seeding Site Settings, Navbar Links & Footer Details...');
  try {
    const res = await fetch(`${API_BASE}/site-setting`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: SITE_SETTING_DATA }),
    });
    if (!res.ok) {
      // Try POST if PUT fails on single type
      await postData('/site-setting', SITE_SETTING_DATA);
    }
  } catch {
    await postData('/site-setting', SITE_SETTING_DATA);
  }

  console.log('✅ Strapi Data Seeding Complete!');
}

seed();
