# MASTER PLAN: Dynamic Strapi CMS-Driven Frontend & Zero-Hit DB Caching Strategy

## 📌 Goal & Context
Transform the entire Next.js frontend (`good-choice-ecommerce`) into a **100% Strapi CMS-driven system** (`e-commerce-strapi-backend`). 
Every page, section, text, banner, header/footer configuration, legal doc, and product catalog will be dynamic.

To achieve **lightning-fast speed and 0 unnecessary DB hits**, we employ **On-Demand ISR (Incremental Static Regeneration)** with **Tag-Based Fetch Cache** and **Strapi Webhooks**.

---

## ⚡ Zero-Hit Database & Caching Architecture

### 1. Request Lifecycle
1. **User Request**: Hits Next.js Server Component (RSC).
2. **Data Cache Lookup**: Next.js checks its internal `Data Cache` / `CDN`.
3. **If Cache Hit**: Next.js immediately returns pre-rendered static HTML/JSON. **0 hits to Strapi backend / DB**.
4. **When Strapi Admin updates content**: Strapi fires a Webhook to `POST /api/revalidate?secret=...&tag=<tag_name>`.
5. **On-Demand Cache Purge**: Next.js calls `revalidateTag('<tag_name>')`. The next incoming request updates the cache in the background.

---

## 🏷️ Standard Cache Tag Registry

| Cache Tag | Target Content | Purge Trigger |
| :--- | :--- | :--- |
| `global-settings` | Header, Footer, Logo, Announcement Bar, Social Links | Setting published/updated in Strapi |
| `home-page` | Home Hero, Banners, Featured Categories, Deal of the day | Hero Banner or Ads Banner update |
| `products-list` | Product catalog grid, Category lists, Brand lists | Product created/updated/deleted |
| `product-[slug]` | Specific Product detail page, Variants, Attributes | Specific product updated |
| `legal-pages` | Terms, Privacy Policy, About Us, Contact content | Page Content-Type update |

---

## 🚀 Incremental Execution Roadmap (Page-by-Page)

### Phase 1: Core System Infrastructure & Webhook Hookup
- Setup `Site-Setting` Single Type in Strapi v5.
- Create Next.js `/api/revalidate` route handler with `REVALIDATION_SECRET`.
- Upgrade Layer 1 API services (`src/services/`) with `next.tags` fetch options.

### Phase 2: Home Page (`/`) — Page 1
- Configure dynamic zone components for Home page in Strapi.
- Integrate Home page RSC with `tags: ['home-page', 'global-settings']`.

### Phase 3: Product Catalog (`/products` & `/products/[slug]`) — Pages 4 & 5
- Connect product queries with dynamic tags `products-list` and `product-[slug]`.
- Static Params generation with On-Demand revalidation.

### Phase 4: Cart & Checkout (`/cart` & `/checkout`) — Pages 6 & 7
- Interactive client-side state + TanStack React Query + Coupon API validation.

### Phase 5: Auth & User Account (`/login`, `/register`, `/orders`) — Pages 2, 3 & 8
- Strapi `users-permissions` JWT handling, protected order history endpoints.

### Phase 6: Informational & Legal Pages (`/about`, `/contact`, `/privacy-policy`, `/terms`) — Pages 9 to 13
- Dynamic markdown / Strapi Page content types with `tags: ['legal-pages']`.

---

> [!NOTE]
> This master document is stored in both Frontend and Backend repositories to ensure complete context persistence across AI sessions.
