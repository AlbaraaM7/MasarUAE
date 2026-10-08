# Masar UAE (مسار)

> **The All-in-One UAE Student Academic, Curriculum Equivalency & Admissions Platform**

[![Next.js](https://img.shields.io/badge/Next.js-15.1.7-black.svg?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue.svg?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.17-38bdf8.svg?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Auth%20%26%20Postgres-3ecf8e.svg?style=flat&logo=supabase)](https://supabase.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-black.svg?style=flat&logo=vercel)](https://vercel.com/)

---

## Product Overview

**Masar UAE (مسار)** is an educational technology SaaS co-pilot purpose-built for secondary school and undergraduate students across the United Arab Emirates. It synthesizes past paper exam revision, UAE Ministry of Education (MOE) equivalency (*Mu'adala*), admissions CV generation, and an interactive database of 79 UAE universities and branch campuses into a unified, high-performance web platform.

---

## Problem

The UAE has one of the world's most diverse private education landscapes, with over 17 distinct international curricula (British IGCSE/A-Levels, International Baccalaureate, Indian CBSE/ICSE, American AP/High School Diploma, and Ministry of Education national curriculum). 

Students and parents in the UAE face three critical bottlenecks:
1. **Curriculum Disconnect & MOE Equivalency (Mu'adala)**: Converting international secondary school credentials into an official UAE Ministry of Education high school equivalency certificate involves complex, changing multi-step bureaucratic procedures with high rejection rates.
2. **Scattered University Information**: Over 79 universities operate across the 7 Emirates (Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah, Umm Al Quwain), but admissions criteria, tuition ranges, and curriculum entrance requirements are fragmented across disconnected PDF prospectuses.
3. **Admissions & Extracurricular Presentation**: UAE university admissions and scholarship committees place heavy emphasis on local community engagement (e.g. Red Crescent, Dubai Cares, Model UN, volunteer hours), yet students lack resume tools formatted to UAE institutional standards.

Masar resolves all three bottlenecks in a single, cohesive application.

---

## Core Features

- 🏛️ **UAE Universities Directory (79 Institutions)**: Complete catalog of accredited universities across all 7 Emirates, filterable by location, curriculum prerequisites, tuition tiers, and degree fields.
- 🤖 **AI Past Paper Coach**: Interactive exam simulator offering automated evaluation, mark scheme criteria verification, and constructive feedback for Cambridge CIE, Pearson Edexcel, IB DP, and CBSE exam questions.
- 📄 **UAE Admissions CV Builder**: 1-click student resume creator optimized for UAE admissions committees, highlighting verified volunteer hours, extracurricular leadership, and academic honors, with PDF export.
- 📋 **Mu'adala (Equivalency) Roadmap**: Interactive step-by-step guidance navigating MOE document attestation, minimum subject requirements, and embassy verification protocols.
- 📊 **Student Central Dashboard**: Personal academic hub tracking volunteer hours, daily study streaks, past exam results, and saved university applications.
- 🔐 **Secure Authentication**: Supabase Auth with email/password login, registration, session persistence, and password recovery.
- 🌓 **Dynamic Theming**: Fluid dark and light modes with hardware-accelerated micro-interactions.

---

## Tech Stack

| Layer | Technology | Details |
| :--- | :--- | :--- |
| **Framework** | Next.js 15.1.7 | App Router, Server Components & Route Handlers |
| **Runtime** | React 19.0.0 | Latest concurrent rendering engine |
| **Language** | TypeScript 5.7.3 | Strict type definitions across data models and API contracts |
| **Styling** | Tailwind CSS 3.4.17 | PostCSS, utility-first CSS, custom architectural design tokens |
| **Database** | PostgreSQL 15+ (Supabase) | Row Level Security (RLS) enabled on 100% of tables |
| **Authentication** | Supabase Auth | Session management, JWT verification, and profile association |
| **Animations** | Motion (`motion/react`) | Fluid physics-driven layout transitions and UI feedback |
| **Validation** | Zod 4.6.5 | Schema-level validation on client and server boundaries |
| **Analytics** | `@vercel/analytics` | Lightweight, cookie-free web analytics |
| **Deployment** | Vercel | Global edge CDN, zero-configuration CI/CD |

---

## Architecture

```
User (Browser)
    │
    ├──► Vercel Edge Network (Next.js 15 App Router)
    │        ├── Public Pages (/, /universities, /muadala, /pricing)
    │        ├── Protected Student Views (/dashboard, /coach, /cv-builder)
    │        └── API Route Handlers (/api/grade, /api/activities, etc.)
    │
    └──► Supabase Cloud Infrastructure
             ├── Supabase Auth (JWT Session Management)
             └── PostgreSQL Database (Row Level Security enforced)
```

Detailed architectural diagrams and component specifications are documented in [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

---

## Authentication

Authentication is powered by **Supabase Auth**.
- **Registration**: Validates email/password credentials and automatically provisions a linked profile row in `public.profiles`.
- **Session Management**: Handled via secure client-side storage, reactive `onAuthStateChange` events, and authorization headers.
- **Session Protection**: Protected areas (Dashboard, CV records) verify authentication state before displaying user-specific data.
- **Sign Out**: Fully terminates the Supabase session and clears local application state.

---

## Database

The PostgreSQL database is organized into normalized relational tables protected by strict Row Level Security (RLS) policies:
- `public.profiles`: Core student records keyed by `auth.users(id)`.
- `public.student_activities`: Volunteer and extracurricular records for CV compilation.
- `public.exam_sessions`: AI grading logs, student answers, and awarded marks.
- `public.saved_universities`: University target lists and application statuses.
- `public.muadala_progress`: MOE equivalency checklist tracker.
- `public.subscriptions`: Tier entitlements.

Complete database schema definitions and migration scripts are available in [`supabase/schema.sql`](supabase/schema.sql) and [`docs/DATABASE.md`](docs/DATABASE.md).

---

## AI Integrations

- **Engine**: The AI Past Paper Coach evaluates student answers against authoritative mark scheme criteria.
- **Provider Agnostic**: Supports Google Gemini or OpenAI via server-side environment variables (`GEMINI_API_KEY` / `OPENAI_API_KEY`).
- **Zero-Cost Fallback**: If external API keys are not supplied, the platform automatically engages a built-in pedagogical rubric engine, ensuring uninterrupted functionality at $0 ongoing operating cost.

---

## External APIs

- **Supabase Data API**: Cloud database queries and authentication endpoints.
- **Stripe**: Configured in development sandbox mode ($0 cost simulated checkout).
- **Vercel Analytics**: Privacy-friendly Core Web Vitals telemetry.

---

## Environment Variables

Copy `.env.example` to `.env.local` for local development:

```bash
cp .env.example .env.local
```

### Configuration Variables:
```env
# Public Client Variables
NEXT_PUBLIC_SITE_URL=https://masaruae.com
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Server-Side Only Secrets
GEMINI_API_KEY=your-optional-gemini-key
OPENAI_API_KEY=your-optional-openai-key
STRIPE_SECRET_KEY=your-optional-stripe-key
STRIPE_WEBHOOK_SECRET=your-optional-webhook-secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-optional-stripe-publishable-key
```

*Note: Never commit secrets or service-role keys to Git.*

---

## Local Development

```bash
# 1. Clone the repository
git clone https://github.com/AlbaraaM7/MasarUAE.git
cd MasarUAE

# 2. Install dependencies
npm install

# 3. Configure local environment
cp .env.example .env.local

# 4. Start development server
npm run dev
```

Open `http://localhost:3000` in your browser.

---

## Production Deployment

Masar UAE is optimized for 1-click deployment on **Vercel**:
1. Connect the GitHub repository `AlbaraaM7/MasarUAE` to Vercel.
2. In the Vercel project settings, add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
3. Click **Deploy**.

Detailed deployment and rollback procedures are documented in [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md).

---

## Project Structure

```
MasarUAE/
├── docs/                       # Technical & buyer handover documentation
│   ├── ARCHITECTURE.md         # System diagrams & architectural patterns
│   ├── DATABASE.md             # Data dictionary, relationships & RLS
│   ├── DEPLOYMENT.md           # Vercel setup & release procedures
│   ├── BUYER_HANDOVER.md       # Acquisition & transfer protocol
│   └── PRODUCT_INVENTORY.md    # Feature verification inventory
├── public/                     # Static assets, branding & campus photography
├── src/
│   ├── app/                    # Next.js 15 App Router routes
│   │   ├── api/                # Server route handlers (grade, activities, etc.)
│   │   ├── coach/              # AI Past Paper Coach interface
│   │   ├── cv-builder/         # Admissions CV Builder interface
│   │   ├── dashboard/          # Student analytics dashboard
│   │   ├── muadala/            # MOE Equivalency roadmap
│   │   ├── pricing/            # Tier overview & features
│   │   ├── universities/       # 79 UAE University directory
│   │   ├── privacy/            # Privacy Policy
│   │   ├── terms/              # Terms of Service
│   │   └── disclaimer/         # Educational Disclaimer
│   ├── components/             # Reusable UI components & ReactBits primitives
│   ├── data/                   # Verified static databases (79 unis, past papers)
│   └── lib/                    # Supabase client, validations & helpers
├── supabase/                   # Schema definitions & reproducible migrations
└── next.config.mjs             # Next.js configuration & security headers
```

---

## Security

- **Row Level Security (RLS)**: Enforced on all tables to prevent cross-user data exposure.
- **Client Key Isolation**: Only public `anon` keys are exposed to the browser; no service-role keys or database credentials are used client-side.
- **HTTP Security Headers**: `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, and `Permissions-Policy` configured in `next.config.mjs`.
- **Input Sanitization**: Request bodies validated via Zod schemas prior to database insertion.

---

## Analytics

Integrated with `@vercel/analytics` to measure authentic user engagement and Core Web Vitals with zero tracking cookies and zero third-party script bloat.

---

## Known Limitations

- **Annual University Updates**: UAE university admission criteria and tuition fees are updated annually; institutions should be reviewed prior to each academic cycle.
- **Payment Sandbox**: Stripe is currently configured in sandbox simulation mode. Live payment processing requires attaching merchant credentials.

---

## Future Roadmap

- [ ] **Direct University Application API**: Direct lead integration with university admissions CRM platforms.
- [ ] **WhatsApp Student Revision Bot**: Daily past paper challenge delivered via WhatsApp.
- [ ] **Arabic Localization**: Native bilingual interface (English/Arabic).
- [ ] **EmSAT Replacement Test Drills**: Standardized diagnostic practice modules for UAE national college readiness benchmarks.

---

## Acquisition / Transfer Notes

In the event of a future technical acquisition or handover:
- **Zero Account Dependency**: No personal passwords or private accounts need to be exchanged.
- **Asset Transfer**: Transfer GitHub repository ownership, attach Vercel project, and transfer the Supabase project organization as outlined in [`docs/BUYER_HANDOVER.md`](docs/BUYER_HANDOVER.md).
- **Turnkey Setup**: A new engineer can bring up a full clone of the production environment in under 15 minutes.

---

## License

Proprietary © Masar UAE. All rights reserved.
