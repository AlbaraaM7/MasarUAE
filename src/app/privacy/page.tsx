import React from "react";
import Link from "next/link";
import { Shield, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy",
  description: "Masar UAE Privacy Policy - How we handle student data with privacy by design.",
};

export default function PrivacyPolicyPage() {
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
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
              <p className="text-sm text-zinc-500">Last updated: October 2026</p>
            </div>
          </div>
        </div>

        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-6 text-sm sm:text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">1. Overview</h2>
            <p>
              Masar UAE (&quot;Masar&quot;, &quot;we&quot;, &quot;our&quot;) is dedicated to helping students across the United Arab Emirates navigate high school curricula, Ministry of Education equivalency (Mu&apos;adala), past paper practice, and university admissions. This policy describes how we collect, store, and protect your information.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">2. Information We Collect</h2>
            <p>
              We collect only the information necessary to provide academic guidance and admissions planning tools:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Account Information:</strong> Student name, email address, school curriculum, grade level, and optional contact details provided during registration.</li>
              <li><strong>Academic & Activity Data:</strong> Volunteer hours, extracurricular leadership roles, past paper practice answers, and saved university preferences you enter into your dashboard or CV builder.</li>
              <li><strong>Technical Diagnostics:</strong> Anonymous browser telemetry and performance metrics collected via privacy-preserving analytics to ensure platform stability.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">3. How Your Information Is Used</h2>
            <p>
              Your data is used solely to:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Generate structured student resumes in the CV Builder.</li>
              <li>Deliver automated feedback and score past paper answers in the AI Exam Coach.</li>
              <li>Calculate volunteer hours and university admission eligibility matching.</li>
              <li>Authenticate your account and protect your personal records.</li>
            </ul>
            <p>
              We do <strong>not</strong> sell, rent, or monetize your personal student data with third-party advertising brokers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">4. Data Security & Storage</h2>
            <p>
              Your data is stored using secure cloud infrastructure with encrypted transport (HTTPS/TLS) and database-level Row Level Security (RLS) to ensure that only you can access your personal student records.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">5. Data Retention & Deletion</h2>
            <p>
              You maintain ownership of your student profile and academic entries. You may request account deletion and removal of your stored records at any time by contacting our support team.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">6. Contact</h2>
            <p>
              For questions regarding this Privacy Policy or your student data, contact us at <a href="mailto:support@masaruae.com" className="text-blue-600 dark:text-blue-400 underline">support@masaruae.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
