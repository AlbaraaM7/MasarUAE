# Deployment & Operations Guide — Masar UAE

## 1. Hosting Overview

Masar UAE is architected for zero-configuration deployment to **Vercel** with **Supabase** providing database and authentication services.

- **Frontend & API Runtime**: Vercel Serverless Functions (Node.js 20+ / Next.js 15).
- **Database & Auth**: Supabase Managed PostgreSQL (AWS / Global Edge).
- **Telemetry**: Vercel Analytics.

---

## 2. Deploying to Vercel (Step-by-Step)

### Option A: Vercel Web Dashboard (Recommended)

1. Fork or push the repository to GitHub: `https://github.com/<your-username>/MasarUAE`.
2. Navigate to [vercel.com/new](https://vercel.com/new).
3. Connect your GitHub account and select **MasarUAE**.
4. Set Framework Preset: **Next.js** (detected automatically).
5. Open **Environment Variables** and enter the following:

| Name | Example Value | Description |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain.vercel.app` | Canonical site URL |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxx.supabase.co` | Supabase API endpoint |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOi...` | Public client anon key |
| `GEMINI_API_KEY` | *(Optional)* | Google AI key for dynamic grading |
| `OPENAI_API_KEY` | *(Optional)* | OpenAI key fallback |

6. Click **Deploy**.

---

### Option B: Vercel CLI

```bash
# 1. Install CLI if not present
npm install -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy preview
vercel

# 4. Deploy to production
vercel --prod
```

---

## 3. Pre-Flight Build Verification

Before deploying any production release, ensure local build checks succeed:

```bash
# Install dependencies
npm install

# Test production build
npm run build

# Run linter
npm run lint
```

---

## 4. Rollback & Disaster Recovery

- **Instant Rollback**: If a deployment introduces regressions, navigate to the **Deployments** tab in the Vercel Dashboard, locate the previous green deployment, and click **Promote to Production**.
- **Database Backups**: Managed automatically via Supabase point-in-time recovery and daily snapshot backups.
