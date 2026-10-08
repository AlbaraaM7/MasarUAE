import React from "react";
import Link from "next/link";
import { AlertTriangle, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Educational & Admissions Disclaimer",
  description: "Masar UAE Educational and Ministry of Education equivalency disclaimer.",
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Academic Disclaimer</h1>
              <p className="text-sm text-zinc-500">Last updated: October 2026</p>
            </div>
          </div>
        </div>

        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-6 text-sm sm:text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">1. Not Official Government or University Advice</h2>
            <p>
              Masar UAE is an independent educational co-pilot designed to assist high school and university students. The platform is <strong>not affiliated with, endorsed by, or operated by</strong> the UAE Ministry of Education (MOE), the Commission for Academic Accreditation (CAA), the Knowledge and Human Development Authority (KHDA), or any university admissions board.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">2. Ministry of Education Equivalency (Mu&apos;adala)</h2>
            <p>
              The Mu&apos;adala step-by-step guidance, checklists, and document roadmaps provided on Masar UAE are intended for informational guidance based on publicly available MOE regulations. Official high school equivalency certificates are issued solely by the UAE Ministry of Education through their official portal (moe.gov.ae). Students must always consult official MOE channels for definitive regulatory rulings.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">3. University Admissions & Tuition Fees</h2>
            <p>
              Admission grade requirements, application deadlines, standardized testing expectations (EmSAT, IELTS, TOEFL, SAT), and tuition rates displayed in our 79 UAE university database are collected from university publications. Because institutions modify policies each academic cycle, applicants should directly verify current requirements with institutional admissions departments before submitting formal applications.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">4. AI Exam Coach Feedback</h2>
            <p>
              The AI Exam Coach provides automated mark scheme alignment and pedagogical suggestions to assist exam revision. AI-generated grades are simulations intended for study guidance and do not guarantee official examination results awarded by Pearson Edexcel, Cambridge Assessment International Education, the International Baccalaureate Organization, or CBSE.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
