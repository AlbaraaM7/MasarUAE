import React from "react";
import Link from "next/link";
import { FileText, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Terms of Service",
  description: "Masar UAE Terms of Service - Educational software usage terms.",
};

export default function TermsPage() {
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
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Terms of Service</h1>
              <p className="text-sm text-zinc-500">Last updated: October 2026</p>
            </div>
          </div>
        </div>

        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-6 text-sm sm:text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">1. Acceptance of Terms</h2>
            <p>
              By accessing or using Masar UAE (&quot;the Platform&quot;), you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use the Platform.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">2. Educational & Informational Purpose</h2>
            <p>
              Masar UAE provides educational planning tools, past paper feedback, CV formatting tools, and university directory overviews. The Platform is an independent student aid and is <strong>not</strong> an official branch of the UAE Ministry of Education, Commission for Academic Accreditation (CAA), or any individual university admissions office.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">3. User Responsibilities & Acceptable Use</h2>
            <p>
              Users agree to:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Provide truthful and accurate academic information.</li>
              <li>Maintain the confidentiality of their login credentials.</li>
              <li>Not attempt to exploit, reverse engineer, or disrupt the software or database services.</li>
              <li>Use AI Exam Coach tools responsibly as a revision study companion.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">4. Intellectual Property</h2>
            <p>
              All software interfaces, proprietary databases, design systems, algorithms, and documentation of Masar UAE remain the intellectual property of Masar UAE. Past examination questions and university trademarks referenced for educational purposes remain the property of their respective examining boards and institutions.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">5. Limitation of Liability</h2>
            <p>
              While we strive for complete accuracy, admission criteria, tuition fee structures, and governmental equivalency rules change periodically. Masar UAE is provided &quot;as is&quot; without warranties of guaranteed university admission, official equivalency approval, or exam outcomes.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">6. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms of Service at any time. Continued use of the platform following updates constitutes acceptance of the modified terms.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
