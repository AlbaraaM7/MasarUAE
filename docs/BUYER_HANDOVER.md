# Buyer Handover & Transfer Guide — Masar UAE (مسار)

> **Important**: This document is prepared for technical acquirers, operators, and engineering leads taking ownership of Masar UAE. It contains operational blueprints and handover protocols with zero personal secrets or hardcoded credentials.

---

## 1. Product Overview
Masar UAE is an educational co-pilot and admissions platform for students in the United Arab Emirates. It features:
- An **AI Past Paper Coach** supporting Cambridge (IGCSE/A-Level), IB Diploma, CBSE, and American AP curricula.
- An **Admissions CV Builder** formatted specifically for UAE university applications, scholarship criteria, and Red Crescent / Dubai Cares volunteering hours.
- A **Directory of 79 UAE Universities & Campuses** with real-time filtering across Emirates (Dubai, Abu Dhabi, Sharjah, Ajman, RAK, Fujairah, Umm Al Quwain), tuition ranges, and curriculum entrance requirements.
- A **Mu'adala (Equivalency) Roadmap** mapping Ministry of Education requirements for overseas and private curriculum certificates.

---

## 2. Code Repository & Source Code
- **Repository**: [https://github.com/AlbaraaM7/MasarUAE](https://github.com/AlbaraaM7/MasarUAE)
- **Primary Branch**: `main`
- **Ownership Transfer**: In a GitHub repository transfer, the original owner transfers the repository directly via **Settings -> General -> Transfer ownership** to the acquirer's GitHub organization or username. No developer passwords or personal credentials are exchanged.

---

## 3. Technology Stack
- **Framework**: Next.js 15.1.7 (React 19, App Router)
- **Language**: TypeScript 5.7+
- **Styling**: Tailwind CSS 3.4.17 with PostCSS and dark/light mode
- **UI & Animations**: Lucide React, Motion (`motion/react`), Canvas Confetti, custom ReactBits primitives
- **Database & Auth**: Supabase PostgreSQL with Row Level Security (RLS)
- **Analytics**: Vercel Analytics (`@vercel/analytics`)

---

## 4. Local Development Setup
```bash
# 1. Clone repository
git clone https://github.com/AlbaraaM7/MasarUAE.git
cd MasarUAE

# 2. Install dependencies
npm install

# 3. Create local environment configuration
cp .env.example .env.local

# 4. Fill in local variables in .env.local (Supabase URL & Anon Key)
# 5. Start development server
npm run dev
```
Access the application locally at `http://localhost:3000`.

---

## 5. Production Deployment
Production is optimized for Vercel. Continuous deployment triggers on git push to `main`.
Build command: `next build`
Output directory: `.next`
Node.js Version: `20.x` or `22.x`

---

## 6. Environment Variables Checklist
The buyer will provision the following variables:
- `NEXT_PUBLIC_SITE_URL`: Primary custom domain (e.g. `https://masaruae.com`).
- `NEXT_PUBLIC_SUPABASE_URL`: Acquirer's Supabase project URL.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Acquirer's Supabase anonymous public key.
- `GEMINI_API_KEY`: *(Optional)* Google AI key for dynamic model-based grading.
- `OPENAI_API_KEY`: *(Optional)* OpenAI fallback key.

---

## 7. Authentication Architecture
- Powered by Supabase Auth.
- Supports email/password registration, login, session persistence, and password reset.
- Client state reacts to `supabase.auth.onAuthStateChange`.
- User profiles are created in `public.profiles` keyed by `auth.users(id)`.

---

## 8. Database Handover & Migration
1. The database schema and policies are fully self-contained in `supabase/schema.sql` and `supabase/migrations/`.
2. The buyer can recreate the exact database on a fresh Supabase project in under 60 seconds by running `supabase/schema.sql` in the Supabase SQL editor.
3. Alternatively, transfer the Supabase project organization via Supabase dashboard (**Organization Settings -> Members -> Transfer Organization**).

---

## 9. AI Engine & Grading Providers
- Route: `src/app/api/grade/route.ts`
- Evaluation logic uses an intelligent structured rubric matching Cambridge CIE, Edexcel, and IB DP assessment criteria.
- Can connect seamlessly to Gemini 1.5/2.0 or OpenAI GPT-4o via API keys, or operate safely on the built-in deterministic rubric engine with zero API costs.

---

## 10. External APIs & Third-Party Services
- **Universities Database**: 100% self-contained in `src/data/universities.ts` (79 verified UAE institutions, no paid external database dependencies).
- **Mu'adala Guide**: Self-contained in `src/data/muadalaGuide.ts`.
- **Payment Processing**: Stripe client stubbed in $0 sandbox simulation mode. Ready for live Stripe keys whenever billing is enabled.

---

## 11. Analytics Property
- Integrated with `@vercel/analytics/react`.
- When the Vercel project is transferred or cloned, analytics will display in the buyer's Vercel dashboard automatically without third-party tracking scripts or cookie banners.

---

## 12. Domain Transfer
If a custom domain (e.g., `masaruae.com`) is transferred:
1. Transfer the domain registrar account (e.g. Cloudflare, Namecheap, GoDaddy) or unlock the domain and supply the EPP authorization code.
2. Update DNS A-records and CNAME records to point to Vercel (`76.76.21.21` and `cname.vercel-dns.com`).

---

## 13. Known Limitations
- The universities database contains 79 institutions; university admission requirements should be reviewed annually for academic cycle updates.
- Stripe billing is currently simulated; live merchant account setup is required before accepting real card transactions.

---

## 14. Buyer Transfer Checklist
- [ ] Receive GitHub repository transfer into buyer's GitHub organization.
- [ ] Connect repository to buyer's Vercel account.
- [ ] Provision or transfer Supabase database project.
- [ ] Run `supabase/schema.sql` to verify tables and RLS policies.
- [ ] Configure environment variables in Vercel.
- [ ] Run production build and verify all 20 routes pass cleanly.
- [ ] Point custom domain DNS records to Vercel.

---

## 15. Future Development Opportunities
1. **University Direct Application Gateway**: Partner with UAE private universities (e.g. AUD, UOWD, Middlesex Dubai) to accept application leads directly.
2. **WhatsApp Bot Integration**: Deliver revision flashcards and equivalency updates via Twilio WhatsApp API.
3. **EmSAT / EmSAT Replacement Modules**: Add targeted mock drills for national standardized exam frameworks.
