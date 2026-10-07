"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { 
  Check, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2,
} from "lucide-react";
import Aurora from "@/components/reactbits/Aurora";
import LiquidEther from "@/components/reactbits/LiquidEther";
import LightPillar from "@/components/reactbits/LightPillar";
import LightRays from "@/components/reactbits/LightRays";
import AnimatedPriceNumber from "@/components/AnimatedPriceNumber";
import { useToast } from "@/components/ToastProvider";

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);
  const [proShader, setProShader] = useState<"liquid" | "pillar" | "rays">("liquid");
  const [loadingTier, setLoadingTier] = useState<string | null>(null);
  const { showToast } = useToast();

  const handleSubscribe = async (tier: "pro" = "pro") => {
    setLoadingTier(tier);
    const planKey = isYearly ? "pro_annual" : "pro_monthly";

    showToast({
      title: "Initiating UAE Secure Checkout",
      description: "Preparing your Pro Scholar subscription...",
      fuseColor: "#10b981",
      duration: 3500,
    });

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planTier: planKey,
          customerEmail: "student@masaruae.ae",
          successUrl: `${window.location.origin}/dashboard?payment=success`,
          cancelUrl: `${window.location.origin}/pricing?payment=cancelled`,
        }),
      });

      const data = await res.json();
      if (data.checkoutUrl) {
        showToast({
          title: "Redirecting to Payment Gateway",
          description: "Stripe UAE sandbox secure checkout loaded.",
          fuseColor: "#2563eb",
          duration: 3000,
        });
        window.location.href = data.checkoutUrl;
      } else {
        showToast({
          title: "Checkout Activated",
          description: "Your subscription has been simulated successfully in sandbox mode.",
          fuseColor: "#10b981",
          duration: 4000,
        });
      }
    } catch (e) {
      showToast({
        title: "Checkout Notice",
        description: "Sandbox checkout ready. You can test your upgrade anytime.",
        fuseColor: "#2563eb",
        duration: 3500,
      });
    } finally {
      setLoadingTier(null);
    }
  };

  return (
    <div className="relative min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-white transition-colors duration-300 overflow-hidden">
      {/* Background Aurora Effect */}
      <div className="absolute top-0 left-0 right-0 h-[680px] overflow-hidden pointer-events-none opacity-40 dark:opacity-30 z-0">
        <Aurora
          colorStops={["#2563eb", "#10b981", "#14FFEC"]}
          amplitude={1.2}
          blend={0.65}
          speed={0.6}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 dark:via-black/50 to-white dark:to-black pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-24">
        
        {/* Top Trust Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-zinc-100/90 dark:bg-white/5 backdrop-blur-md border border-zinc-200/80 dark:border-white/10 text-xs font-semibold text-zinc-700 dark:text-zinc-300 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Trusted by 12,000+ Students across Dubai, Abu Dhabi & Sharjah</span>
          </div>
        </div>

        {/* Huge Bold Title behind cards */}
        <div className="text-center relative select-none">
          <h1 className="text-7xl sm:text-8xl md:text-9xl lg:text-[145px] font-black tracking-tighter text-zinc-900/90 dark:text-white transition-colors leading-none">
            Pricing
          </h1>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto font-medium">
            Transparent, student-first plans to ace your British, IB, CBSE, or American exams and secure admission into top UAE universities.
          </p>
        </div>

        {/* Monthly / Yearly Toggle Switch with Animated Sliding Pill */}
        <div className="flex justify-center items-center mt-8 mb-12 sm:mb-16">
          <div className="relative inline-flex items-center p-1.5 rounded-full bg-zinc-100/90 dark:bg-zinc-900/90 backdrop-blur-md border border-zinc-200/80 dark:border-white/10 shadow-inner">
            <button
              onClick={() => setIsYearly(false)}
              className="relative px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-colors duration-200 cursor-pointer"
            >
              {!isYearly && (
                <motion.div
                  layoutId="billingTogglePill"
                  className="absolute inset-0 bg-white dark:bg-zinc-800 rounded-full shadow-sm"
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                />
              )}
              <span className={`relative z-10 transition-colors duration-200 ${!isYearly ? "text-zinc-900 dark:text-white" : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"}`}>
                Monthly
              </span>
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className="relative flex items-center space-x-1.5 px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-colors duration-200 cursor-pointer"
            >
              {isYearly && (
                <motion.div
                  layoutId="billingTogglePill"
                  className="absolute inset-0 bg-white dark:bg-zinc-800 rounded-full shadow-sm"
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                />
              )}
              <span className={`relative z-10 transition-colors duration-200 ${isYearly ? "text-zinc-900 dark:text-white" : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"}`}>
                Yearly
              </span>
              <span className="relative z-10 px-2 py-0.5 text-[10px] font-extrabold uppercase rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                Save 25%
              </span>
            </button>
          </div>
        </div>

        {/* 2 Frosted Glass Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch pt-2 max-w-5xl mx-auto">
          
          {/* CARD 1: Free / Starter */}
          <div className="relative rounded-3xl bg-zinc-50/80 dark:bg-zinc-950/60 backdrop-blur-2xl border border-zinc-200/90 dark:border-white/10 p-7 sm:p-8 flex flex-col justify-between shadow-xl hover:border-zinc-300 dark:hover:border-white/20 transition-all duration-300 overflow-hidden">
            {/* Background LightRays Effect */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none opacity-15 dark:opacity-20 z-0">
              <LightRays
                raysOrigin="top-center"
                raysColor="#0bc7ed"
                raysSpeed={0.6}
                lightSpread={1.0}
                rayLength={2.2}
                pulsing={false}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/70 to-white/95 dark:from-zinc-950/30 dark:via-zinc-950/70 dark:to-zinc-950/95 pointer-events-none" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  Starter Plan
                </span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200/60 dark:border-white/5">
                  Free Forever
                </span>
              </div>

              <div className="mt-5 flex items-baseline">
                <span className="text-4xl sm:text-5xl font-black text-zinc-900 dark:text-white tracking-tight">
                  AED 0
                </span>
                <span className="ml-2 text-xs sm:text-sm text-zinc-400 font-medium">
                  /month
                </span>
              </div>

              <p className="mt-3 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed min-h-[40px]">
                Ideal for students wanting to practice past questions and explore UAE university eligibility.
              </p>

              {/* Features List (Unconstrained height, crisp text) */}
              <div className="relative mt-6 pt-5 border-t border-zinc-100 dark:border-white/5 space-y-3">
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  Included in Free:
                </p>

                <ul className="space-y-2.5 text-[11px] sm:text-xs text-zinc-600 dark:text-zinc-300 font-medium leading-normal">
                  <li className="flex items-start space-x-2.5">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>5 AI Past Paper Evaluations per month</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Cambridge, IB & CBSE past paper question bank</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>UAE University Eligibility Calculator (Top 25)</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>MOE Mu&apos;adala certificate equivalency checklist</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>1 Academic CV Export (PDF format)</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Standard community Q&A access</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Curriculum syllabus search & topics index</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Predicted GPA calculation & subject tracking</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-4">
              <Link
                href="/dashboard"
                className="w-full flex items-center justify-center py-3.5 px-6 rounded-2xl text-xs sm:text-sm font-bold text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200/80 dark:border-white/10 transition-all cursor-pointer shadow-xs"
              >
                Get Started Free
              </Link>
              <p className="text-[11px] text-center text-zinc-400 mt-2.5 font-medium">
                No credit card required
              </p>
            </div>
          </div>

          {/* CARD 2: Pro Scholar (Featured Card with Soft Ambient React Bits Shader) */}
          <div className="relative rounded-3xl bg-white/95 dark:bg-zinc-950/85 backdrop-blur-2xl border-2 border-emerald-500/40 dark:border-emerald-400/35 p-7 sm:p-8 flex flex-col justify-between shadow-xl shadow-emerald-500/5 dark:shadow-emerald-500/10 lg:-translate-y-3 hover:-translate-y-5 lg:hover:-translate-y-6 hover:shadow-2xl hover:shadow-emerald-500/15 transition-all duration-300 group overflow-hidden">
            {/* Live React Bits Shader Effect INSIDE the Pro Card */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none opacity-20 dark:opacity-25 z-0">
              {proShader === "liquid" && (
                <LiquidEther
                  colors={["#3b82f6", "#06b6d4", "#10b981"]}
                  mouseForce={15}
                  cursorSize={90}
                  isViscous={false}
                  viscous={30}
                  iterationsViscous={32}
                  iterationsPoisson={32}
                  resolution={0.5}
                  isBounce={false}
                  autoDemo={true}
                  autoSpeed={0.35}
                  autoIntensity={1.5}
                  takeoverDuration={0.25}
                  autoResumeDelay={2000}
                  autoRampDuration={0.6}
                  style={{ width: "100%", height: "100%" }}
                />
              )}
              {proShader === "pillar" && (
                <LightPillar
                  topColor="#06b6d4"
                  bottomColor="#10b981"
                  intensity={0.6}
                  rotationSpeed={0.3}
                  glowAmount={0.004}
                  pillarWidth={2.4}
                  pillarHeight={0.4}
                />
              )}
              {proShader === "rays" && (
                <LightRays
                  raysOrigin="top-center"
                  raysColor="#06b6d4"
                  raysSpeed={0.6}
                  lightSpread={1.0}
                  rayLength={2.5}
                  pulsing={false}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-white/35 via-white/75 to-white/95 dark:from-zinc-950/35 dark:via-zinc-950/75 dark:to-zinc-950/95 pointer-events-none" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Pro Scholar
                </span>
                <span className="inline-flex items-center space-x-1 text-[11px] font-bold uppercase px-3 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 shadow-xs">
                  <Sparkles className="w-3 h-3 text-emerald-500 dark:text-emerald-400" />
                  <span>Most Popular</span>
                </span>
              </div>

              <div className="mt-4 flex items-baseline">
                <span className="text-4xl sm:text-5xl font-black text-zinc-900 dark:text-white tracking-tight flex items-baseline">
                  <span>AED&nbsp;</span>
                  <AnimatedPriceNumber value={isYearly ? 29 : 39} />
                </span>
                <span className="ml-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-medium">
                  /month
                </span>
              </div>

              <p className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
                {isYearly ? "Billed AED 299 annually (Save 25%)" : "Billed monthly • Cancel anytime"}
              </p>

              <p className="mt-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed min-h-[40px]">
                Best for high schoolers aiming for top UAE & global universities with maximum marks and scholarships.
              </p>

              {/* Features List (Unconstrained height, crisp text) */}
              <div className="relative mt-6 pt-5 border-t border-zinc-200/60 dark:border-white/10 space-y-3">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-emerald-400">
                  Everything in Free, plus:
                </span>

                <ul className="space-y-2.5 text-[11px] sm:text-xs text-zinc-700 dark:text-zinc-200 font-medium leading-normal">
                  <li className="flex items-start space-x-2.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Unlimited AI Past Paper grading</strong> with instant mark criteria breakdown</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Handwritten OCR Photo & PDF upload</strong> of exam workings</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Personalized UAE University & Scholarship Matching</strong> (70+ campuses)</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>MOE Mu&apos;adala Document Audit</strong> & Equivalency check</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Multi-Format CV Exports</strong> (Word .docx, PDF, ATS .txt, JSON)</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>EmSAT, SAT & IELTS target score converters</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>Priority admissions portal deadline alerts</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>Official examiner mark scheme step marks (M1, A1, B1) breakdown</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>Scholarship application guidance & deadline alerts</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="relative z-10 mt-8 pt-4">
              <button
                onClick={() => handleSubscribe("pro")}
                disabled={loadingTier === "pro"}
                className="w-full flex items-center justify-center space-x-2 py-3.5 px-6 rounded-2xl text-xs sm:text-sm font-bold text-white dark:text-zinc-950 bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-100 shadow-xl hover:scale-[1.01] active:scale-95 transition-all cursor-pointer disabled:opacity-50"
              >
                <span>{loadingTier === "pro" ? "Preparing Checkout..." : "Upgrade to Pro"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[11px] text-center text-zinc-500 dark:text-zinc-400 mt-2.5 font-medium">
                14-day money-back guarantee • No questions asked
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
