# Robotics E-Commerce System Architecture & Context Guidelines

## 1. System Technology Stack
- **Frontend**: Next.js (App Router, React Server Components, ISR / On-Demand Revalidation)
- **Backend (CMS)**: Strapi v5 (Headless CMS, Node.js)
- **Database**: PostgreSQL (Production) / SQLite (Development)
- **Asset Storage & CDN**: Cloudinary / AWS S3
- **Payment Gateways**: SSLCommerz, BKash, Cash on Delivery, Stripe
- **Authentication**: Strapi `users-permissions` (JWT / NextAuth integration)

## 2. Core Architecture Principles
- **Headless & Decoupled**: Next.js handles UI & rendering; Strapi handles Data, CMS Admin, and Auth APIs.
- **10/10 Database Design**: Flawless relational schema mapping between Products, Variants, EAV Attributes, Orders, Multi-target Coupons, Cart, and Wishlist.
- **Dynamic Revalidation**: Strapi Webhooks trigger `revalidateTag` on Next.js frontend upon any content mutation.
- **API Protocol**: Pure Strapi REST API with `/api/v1` root prefix (Filtering, Populate, Pagination, Sorting)
- **Security**: Strict CORS policy, Rate limiting, Token-based Authorization, Input validation.

## 3. Mandatory Frontend 3-Layer Architecture
All frontend components MUST adhere to the 3-Layer Pattern:
- **Layer 1 (`src/services/`)**: Pure API communication layer (Strapi REST API calls).
- **Layer 2 (`src/hooks/`)**: Business logic, **TanStack React Query** (`useQuery`, `useMutation`), and **React Hook Form** + **Zod**.
- **Layer 3 (`src/components/`)**: Pure UI rendering components consuming Layer 2 hooks.
- **Architecture Guidelines Doc**: [frontend-architecture-guidelines.md](file:///d:/Oztor/next.js/good-choice-ecommerce/.agents/frontend-architecture-guidelines.md)

## 4. Database & System Reference Docs
- Primary DB Architecture Doc: `d:\Oztor\backend\good-choice-backend\database-design.md`
- System Architecture Doc: `d:\Oztor\backend\good-choice-backend\system-architecture.md`
- API Design Doc: `d:\Oztor\backend\good-choice-backend\api-design.md`
