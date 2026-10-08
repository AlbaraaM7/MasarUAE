# Product Feature Inventory — Masar UAE

This document provides a technical inventory of all existing features verified directly in the Masar UAE codebase.

---

## Verified Feature Matrix

| Feature Name | Status | Frontend Location | Backend / API Location | Database Dependencies | External API Dependencies | Auth Required | Known Limitations |
| :--- | :---: | :--- | :--- | :--- | :--- | :---: | :--- |
| **Landing & Discovery Home** | Working | `src/app/page.tsx` | N/A (Static SSR) | None | None | No | Visual showcase of all tools. |
| **UAE Universities Directory (79 Unis)** | Working | `src/app/universities/page.tsx` | `src/app/api/universities/eligibility/route.ts` | Static dataset `src/data/universities.ts` | None (Local dataset) | No | Filters across all 7 emirates, tuition, majors, and rankings. |
| **AI Past Paper Coach** | Working | `src/app/coach/page.tsx` | `src/app/api/grade/route.ts` | `public.exam_sessions` (optional logging) | Gemini/OpenAI (optional fallback rubric active) | Optional | Evaluates Cambridge, IB, CBSE, and AP past paper answers. |
| **UAE Admissions CV Builder** | Working | `src/app/cv-builder/page.tsx` | `src/app/api/activities/route.ts` | `public.student_activities`, `public.profiles` | None (uses html2canvas/jspdf for PDF export) | Optional | Generates formatted 1-page PDF resumes optimized for UAE scholarship boards. |
| **Mu'adala Equivalency Guide** | Working | `src/app/muadala/page.tsx` | `src/app/api/muadala/route.ts` | `public.muadala_progress` | None (static guide `src/data/muadalaGuide.ts`) | Optional | Step-by-step document preparation checklist for MOE equivalency certificates. |
| **Student Dashboard** | Working | `src/app/dashboard/page.tsx` | `src/app/api/activities/route.ts` | `public.profiles`, `student_activities` | None | Yes | Tracks study streak, volunteer hours, and saved university applications. |
| **Authentication System** | Working | `src/components/AuthCard.tsx` (`/login`, `/signup`) | Supabase Auth API | `auth.users`, `public.profiles` | Supabase Cloud | Optional for browsing, required for saved data | Supports email/password, session persistence, and password reset. |
| **Pricing & Membership** | Working | `src/app/pricing/page.tsx` | `src/app/api/stripe/checkout/route.ts` | `public.subscriptions` | Stripe (sandbox simulation active) | Optional | $0 cost sandbox mode active; live Stripe keys required for production payments. |
| **Telemetry & Analytics** | Working | `src/app/layout.tsx` | `@vercel/analytics/react` | None | Vercel Analytics | No | Measures Core Web Vitals and route views without cookies. |
| **Legal Suite** | Working | `src/app/privacy/page.tsx`, `terms`, `disclaimer` | N/A | None | None | No | Full educational and admissions disclaimers in place. |
