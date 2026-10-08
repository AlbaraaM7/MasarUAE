"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { GraduationCap, ShieldCheck, X, Mail, FileText, CheckCircle2, MessageSquare, Send } from "lucide-react";

export function Footer() {
  const pathname = usePathname();
  const [activeModal, setActiveModal] = useState<"privacy" | "terms" | "support" | null>(null);
  const [supportSubmitted, setSupportSubmitted] = useState(false);
  const [supportMessage, setSupportMessage] = useState({ name: "", email: "", message: "" });

  // Only render footer strictly on the landing page ("/")
  if (pathname !== "/") {
    return null;
  }

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSupportSubmitted(true);
    setTimeout(() => {
      setSupportSubmitted(false);
      setSupportMessage({ name: "", email: "", message: "" });
      setActiveModal(null);
    }, 2000);
  };

  return (
    <footer className="bg-white dark:bg-black text-zinc-600 dark:text-zinc-400 pt-14 pb-3 border-t border-zinc-200 dark:border-white/10 text-sm transition-colors duration-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-emerald-500 flex items-center justify-center text-white font-bold shadow-sm">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-black text-zinc-900 dark:text-white tracking-tight">
                Masar<span className="text-emerald-500">UAE</span>
              </span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Empowering high school and university students across the United Arab Emirates with AI revision, college admissions matching, and certified extracurricular portfolios.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-200 mb-3">Student Tools</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/coach" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">AI Past Paper Coach</Link></li>
              <li><Link href="/cv-builder" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Extracurricular CV Builder</Link></li>
              <li><Link href="/universities" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">UAE University Matcher</Link></li>
              <li><Link href="/muadala" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Mu'adala MOE Checklist</Link></li>
              <li><Link href="/pricing" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Pricing & Plans</Link></li>
            </ul>
          </div>

          {/* Supported Curriculums */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-200 mb-3">Supported Boards</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/coach" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Cambridge (CIE) & Pearson Edexcel</Link></li>
              <li><Link href="/coach" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">International Baccalaureate (IB DP)</Link></li>
              <li><Link href="/coach" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">CBSE / ICSE Board</Link></li>
              <li><Link href="/coach" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">EmSAT Achieve & American AP</Link></li>
            </ul>
          </div>

          {/* Accreditation & Compliance */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-200 mb-3">Regulatory Guides</h4>
            <div className="space-y-2 text-xs">
              <Link href="/muadala" className="flex items-center space-x-1.5 text-zinc-700 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span className="font-semibold">Aligned with MOE & KHDA Criteria</span>
              </Link>
              <p className="text-[11px] text-zinc-400 dark:text-zinc-500 leading-normal">
                All admission criteria, equivalency steps, and scholarship benchmarks are mapped to official UAE educational authorities.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-[#323232] flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 dark:text-zinc-500">
          <p>© {new Date().getFullYear()} Masar UAE. All rights reserved.</p>
          <div className="flex flex-wrap gap-4 sm:gap-6 mt-4 sm:mt-0">
            <Link
              href="/privacy"
              className="hover:text-slate-700 dark:hover:text-zinc-300 hover:underline cursor-pointer transition-colors text-xs font-medium"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-slate-700 dark:hover:text-zinc-300 hover:underline cursor-pointer transition-colors text-xs font-medium"
            >
              Terms of Service
            </Link>
            <Link
              href="/disclaimer"
              className="hover:text-slate-700 dark:hover:text-zinc-300 hover:underline cursor-pointer transition-colors text-xs font-medium"
            >
              Disclaimer
            </Link>
            <button
              onClick={() => setActiveModal("support")}
              className="hover:text-slate-700 dark:hover:text-zinc-300 hover:underline cursor-pointer transition-colors text-xs font-medium"
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>

      {/* Massive Architectural Wordmark with Gradient (Darken Top, Lighter Bottom) */}
      <div className="w-full overflow-hidden select-none pointer-events-none mt-10 sm:mt-14 pt-2 pb-6 flex items-center justify-center">
        <span className="font-black tracking-tighter text-[16vw] sm:text-[17vw] md:text-[17.5vw] leading-[0.85] uppercase select-none block w-full text-center whitespace-nowrap bg-gradient-to-b from-zinc-950/70 via-zinc-900/30 to-zinc-900/[0.02] dark:from-white/[0.03] dark:via-white/[0.14] dark:to-white/[0.36] bg-clip-text text-transparent">
          MasarUAE
        </span>
      </div>

      {/* Interactive Legal & Support Modals */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div 
            className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 shadow-2xl p-6 text-zinc-900 dark:text-white animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-[#333333]">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-[#14FFEC] flex items-center justify-center font-bold">
                  {activeModal === "privacy" && <ShieldCheck className="w-4 h-4" />}
                  {activeModal === "terms" && <FileText className="w-4 h-4" />}
                  {activeModal === "support" && <MessageSquare className="w-4 h-4" />}
                </div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  {activeModal === "privacy" && "Student Privacy Policy"}
                  {activeModal === "terms" && "Terms of Service"}
                  {activeModal === "support" && "Contact Student Support"}
                </h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="py-4 space-y-3.5 text-xs text-zinc-600 dark:text-zinc-300 max-h-[60vh] overflow-y-auto leading-relaxed">
              {activeModal === "privacy" && (
                <>
                  <p className="font-semibold text-zinc-900 dark:text-white">
                    Compliance with UAE Personal Data Protection Law (Federal Decree-Law No. 45 of 2021)
                  </p>
                  <p>
                    Masar UAE is committed to safeguarding student data. Your predicted grades, exam boards, academic CV, and volunteering history are encrypted at rest and in transit.
                  </p>
                  <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/80 dark:border-white/10 space-y-1.5">
                    <p className="font-bold text-zinc-900 dark:text-white flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-[#14FFEC]" />
                      <span>Zero Data Selling</span>
                    </p>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      We never sell, license, or monetize your private student records, transcripts, or contact details to third-party advertisers.
                    </p>
                  </div>
                  <p>
                    Student records are solely utilized to provide real-time eligibility scores, AI revision coaching, and university matching across accredited UAE institutions.
                  </p>
                </>
              )}

              {activeModal === "terms" && (
                <>
                  <p className="font-semibold text-zinc-900 dark:text-white">
                    Educational Co-Pilot Terms & Academic Integrity
                  </p>
                  <p>
                    By using Masar UAE, you agree to utilize AI Past Paper Coach and university matching tools for legitimate educational and test-preparation purposes only.
                  </p>
                  <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/80 dark:border-white/10 space-y-1.5">
                    <p className="font-bold text-zinc-900 dark:text-white">
                      Admissions Cutoff Estimates
                    </p>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      Eligibility calculations are advisory estimates based on publicly published CAA, KHDA, and ADEK admission frameworks. Official admission offers remain under the sole discretion of each respective university.
                    </p>
                  </div>
                  <p>
                    Equivalency checklist steps reflect Ministry of Education (MOE) directives. Students must submit official attested transcripts to the MOE portal for final Mu'adala certification.
                  </p>
                </>
              )}

              {activeModal === "support" && (
                <>
                  {supportSubmitted ? (
                    <div className="py-6 text-center space-y-2">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-[#14FFEC] flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <p className="text-sm font-bold text-zinc-900 dark:text-white">Message Dispatched!</p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        Our Dubai admissions support team will respond to your registered email within 24 hours.
                      </p>
                    </div>
                  ) : (
                    <>
                      <p>
                        Need assistance with university eligibility, equivalency steps, or school portal access? Reach out to our dedicated student advisory team:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <a
                          href="mailto:support@masaruae.ae"
                          className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/80 dark:border-white/10 hover:border-emerald-500/50 transition-all block group"
                        >
                          <div className="flex items-center space-x-1.5 font-bold text-zinc-900 dark:text-white text-xs">
                            <Mail className="w-3.5 h-3.5 text-emerald-500 dark:text-[#14FFEC]" />
                            <span>Student Support</span>
                          </div>
                          <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5 truncate">
                            support@masaruae.ae
                          </p>
                        </a>
                        <a
                          href="mailto:partners@masaruae.com"
                          className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/80 dark:border-white/10 hover:border-emerald-500/50 transition-all block group"
                        >
                          <div className="flex items-center space-x-1.5 font-bold text-zinc-900 dark:text-white text-xs">
                            <GraduationCap className="w-3.5 h-3.5 text-emerald-500 dark:text-[#14FFEC]" />
                            <span>Counselor Network</span>
                          </div>
                          <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5 truncate">
                            partners@masaruae.com
                          </p>
                        </a>
                      </div>

                      {/* Quick message form */}
                      <form onSubmit={handleSupportSubmit} className="space-y-2.5 pt-2 border-t border-zinc-100 dark:border-white/10">
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            required
                            placeholder="Your Name"
                            value={supportMessage.name}
                            onChange={(e) => setSupportMessage({ ...supportMessage, name: e.target.value })}
                            className="px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 text-xs text-zinc-900 dark:text-white outline-none focus:border-emerald-500 transition-all"
                          />
                          <input
                            type="email"
                            required
                            placeholder="Your Email"
                            value={supportMessage.email}
                            onChange={(e) => setSupportMessage({ ...supportMessage, email: e.target.value })}
                            className="px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 text-xs text-zinc-900 dark:text-white outline-none focus:border-emerald-500 transition-all"
                          />
                        </div>
                        <textarea
                          required
                          rows={3}
                          placeholder="How can our student team assist you?"
                          value={supportMessage.message}
                          onChange={(e) => setSupportMessage({ ...supportMessage, message: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 text-xs text-zinc-900 dark:text-white outline-none focus:border-emerald-500 transition-all resize-none"
                        />
                        <button
                          type="submit"
                          className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs flex items-center justify-center space-x-1.5 shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Send Message to Support</span>
                        </button>
                      </form>
                    </>
                  )}
                </>
              )}
            </div>

            {/* Footer close */}
            <div className="pt-3 border-t border-zinc-100 dark:border-white/10 flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-1.5 rounded-xl text-xs font-bold bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
