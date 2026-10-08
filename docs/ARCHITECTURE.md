# Technical Architecture — Masar UAE (مسار)

## 1. System Overview

Masar UAE is an educational co-pilot and university admissions platform engineered specifically for high school and undergraduate students across the United Arab Emirates. The platform bridges the gap between disparate secondary school curricula (Cambridge IGCSE/A-Level, IB Diploma, CBSE, American Diploma) and UAE higher education requirements, including Ministry of Education (MOE) high school equivalency (*Mu'adala*).

```
                             [ Client Browser ]
                                     |
               +---------------------+---------------------+
               |                     |                     |
     (Static & Dynamic SSR)    (Direct Client Auth)    (Next.js App API)
               |                     |                     |
               v                     v                     v
       [ Vercel Edge CDN ]   [ Supabase Auth ]     [ /api/* Endpoints ]
               |              (JWT Management)             |
               v                     |                     v
      [ Next.js 15 App ]             |             [ AI / Validation ]
        React 19 / CSS               |                     |
               \                     |                     /
                +--------------------+--------------------+
                                     |
                         (PostgreSQL + RLS Policies)
                                     v
                        [ Supabase Cloud Database ]
```

---

## 2. Frontend Architecture

- **Framework**: Next.js 15.1.7 with the React 19 App Router.
- **Styling**: Tailwind CSS 3.4.17 with custom architectural UI primitives, dark/light theme support, and responsive typography.
- **Component Systems**: Modular design using Lucide icons, Motion React (`motion/react`) for smooth physics-based micro-interactions, canvas-confetti, and standalone ReactBits presentation modules.
- **State Management**:
  - React Context for lightweight toast notifications (`ToastProvider.tsx`).
  - Browser local persistence for client profile drafts (`studentProfile.ts`).
  - Reactive Supabase Auth session listeners (`onAuthStateChange`) synchronized across browser tabs.

---

## 3. Backend & API Architecture

The application utilizes Next.js Server Route Handlers located under `src/app/api/`:

| Endpoint | Method | Responsibility | Security & Validation |
| :--- | :---: | :--- | :--- |
| `/api/grade` | `POST` | AI-assisted mark scheme evaluation for student past paper answers | Zod input schema validation, model answer comparisons, fallback pedagogical rubric |
| `/api/activities` | `GET`, `POST` | Student volunteer & leadership entry tracking | Zod ActivitySchema, database row creation |
| `/api/activities/[id]` | `DELETE` | Deletion of student activity record | Parameterized ID lookup, database cascade |
| `/api/muadala` | `GET`, `POST` | MOE equivalency document checklist progress | Unique composite key per student/curriculum/step |
| `/api/universities/eligibility` | `POST` | Rules-based eligibility matching against 79 UAE universities | Minimum percentage, subject prerequisites, curriculum translation |
| `/api/stripe/checkout` | `POST` | Subscription intent dispatch | $0 sandbox simulated checkout for non-paid operations |
| `/api/stripe/webhook` | `POST` | Webhook verification endpoint | Cryptographic signature validation |

---

## 4. Database & Row Level Security

- **Database Engine**: PostgreSQL 15+ hosted on Supabase.
- **Access Model**: Client connections leverage `@supabase/supabase-js`.
- **Row Level Security**: Enabled on 100% of public tables.
- **Row Isolation**: Student private data is protected through PostgreSQL Row Level Security policies referencing `auth.uid() = user_id`.

---

## 5. Deployment & Edge Infrastructure

- **Hosting**: Vercel Serverless & Edge Network.
- **Assets**: Optimized static assets and Next.js Image caching.
- **Telemetry**: Privacy-preserving `@vercel/analytics` measuring Core Web Vitals and route traffic with zero tracking cookies.
- **Security Headers**: Injected via `next.config.mjs` (`X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`).
