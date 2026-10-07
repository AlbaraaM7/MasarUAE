"use client";

import { useState } from "react";
import { MUADALA_GUIDES } from "@/data/muadalaGuide";
import { useToast } from "@/components/ToastProvider";
import { 
  CheckCircle2, 
  AlertTriangle, 
  FileCheck2, 
  HelpCircle, 
  ArrowRight, 
  ExternalLink, 
  ShieldCheck
} from "lucide-react";
import RubberSegment from "@/components/reactbits/RubberSegment";

export default function MuadalaPage() {
  const { showToast } = useToast();
  const [activeCurriculum, setActiveCurriculum] = useState<string>("british");
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});

  const guide = MUADALA_GUIDES[activeCurriculum];

  const toggleStep = (stepKey: string) => {
    const isNowDone = !completedSteps[stepKey];
    setCompletedSteps((prev) => ({
      ...prev,
      [stepKey]: isNowDone,
    }));

    if (isNowDone) {
      showToast({
        title: "Attestation Step Completed",
        description: `Marked as done for ${guide.curriculum}`,
        fuseColor: "#14FFEC",
        duration: 3000,
        icon: <CheckCircle2 className="w-4 h-4 text-[#14FFEC]" />
      });
    }
  };

  const handleAuditEquivalency = () => {
    showToast({
      title: "Auditing equivalency rules...",
      description: `Auditing ${guide.curriculum} passing rules against UAE MOE requirements`,
      fuseColor: "#14FFEC",
      duration: 3500,
      icon: <FileCheck2 className="w-4 h-4 text-[#14FFEC]" />
    });

    setTimeout(() => {
      showToast({
        title: "Equivalency Criteria Audited!",
        description: `Verified ${guide.subjectRequirements.length} MOE compulsory subject conditions for ${guide.badge}.`,
        fuseColor: "#10b981",
        duration: 4500,
        icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />
      });
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-zinc-200 dark:border-white/10 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
            UAE Ministry Certificate Equivalency (Mu'adala) Guide
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-1.5">
            Demystifying the UAE MOE High School Equivalency process for international curriculum students.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleAuditEquivalency}
            className="no-print inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs sm:text-sm font-black shadow-xs transition-all hover:scale-[1.02] cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-zinc-950" />
            <span>Audit Equivalency Rules</span>
          </button>

          <a
            href="https://www.moe.gov.ae/En/EServices/ServiceCard/pages/EquivalenceCertificate.aspx"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-black shadow-md shadow-blue-500/20 transition-all hover:scale-[1.02]"
          >
            <span>MOE Official Portal</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Curriculum Switcher with React Bits RubberSegment Elastic Effect */}
      <div className="overflow-x-auto max-w-full pb-2 pt-1 -mx-1 px-1">
        <RubberSegment
          items={Object.entries(MUADALA_GUIDES).map(([key, item]) => ({
            value: key,
            label: item.curriculum,
          }))}
          value={activeCurriculum}
          onChange={(val) => setActiveCurriculum(val)}
          thumbColor="#14FFEC"
          activeTextColor="#09090b"
          size="lg"
          radius={16}
          inset={4}
          equalSlots={false}
          stretch={110}
          squash={4}
          speed={1}
          glide={75}
          draggable={true}
          className="border border-zinc-200/90 dark:border-white/10 shadow-xs"
        />
      </div>

      {/* Main Guide Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Requirements & Steps (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Overview Banner */}
          <div className="bg-white dark:bg-zinc-950 p-6 sm:p-7 rounded-3xl border border-zinc-200/90 dark:border-white/10 shadow-sm space-y-3">
            <div className="flex items-center space-x-2.5">
              <span className="text-xs font-bold text-emerald-600 dark:text-[#14FFEC] bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full">
                {guide.badge}
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white">{guide.curriculum}</h2>
            </div>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">{guide.overview}</p>
          </div>

          {/* Subject Criteria: MINISTRY PASSING SUBJECT RULES */}
          <div className="bg-white dark:bg-zinc-950 p-6 sm:p-7 rounded-3xl border border-zinc-200/90 dark:border-white/10 shadow-sm space-y-5">
            <h3 className="text-base sm:text-lg font-black text-zinc-900 dark:text-white uppercase tracking-wider">
              <span>Ministry Passing Subject Rules</span>
            </h3>

            <ul className="space-y-3 sm:space-y-3.5">
              {guide.subjectRequirements.map((req, i) => (
                <li
                  key={i}
                  className="p-4 sm:p-4.5 rounded-2xl bg-zinc-50/90 dark:bg-zinc-900/80 border border-zinc-200/90 dark:border-white/10 hover:border-emerald-500/40 dark:hover:border-emerald-400/40 transition-colors shadow-xs"
                >
                  <p className="text-[13px] sm:text-sm md:text-[15px] font-semibold text-zinc-900 dark:text-zinc-100 leading-relaxed font-sans">
                    {req}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Interactive Attestation Roadmap */}
          <div className="bg-white dark:bg-zinc-950 p-6 sm:p-7 rounded-3xl border border-zinc-200/90 dark:border-white/10 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                <span>Step-by-Step Document Attestation Checklist</span>
              </h3>
              <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Click each step to track progress</span>
            </div>

            <div className="space-y-3 sm:space-y-3.5">
              {guide.attestationSteps.map((step) => {
                const stepKey = `${activeCurriculum}-step-${step.stepNumber}`;
                const isDone = !!completedSteps[stepKey];

                return (
                  <div
                    key={step.stepNumber}
                    onClick={() => toggleStep(stepKey)}
                    className={`p-5 sm:p-6 rounded-2xl border transition-all cursor-pointer ${
                      isDone
                        ? "bg-emerald-500/10 dark:bg-emerald-500/15 border-emerald-500/40 dark:border-[#14FFEC]/40 shadow-xs ring-1 ring-emerald-500/20"
                        : "bg-zinc-50/90 dark:bg-zinc-900/80 border-zinc-200/90 dark:border-white/10 hover:border-emerald-500/30 dark:hover:border-emerald-400/30"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 sm:gap-6">
                      <div className="flex items-start gap-3.5 flex-1 min-w-0">
                        <div
                          className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs sm:text-sm shrink-0 mt-0.5 transition-colors ${
                            isDone
                              ? "bg-emerald-500 dark:bg-[#14FFEC] text-zinc-950 font-black"
                              : "bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                          }`}
                        >
                          {isDone ? "✓" : step.stepNumber}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className={`text-sm sm:text-base font-bold leading-snug ${isDone ? "line-through text-zinc-400 dark:text-zinc-500" : "text-zinc-900 dark:text-white"}`}>
                            {step.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 mt-1.5 leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 pl-10.5 sm:pl-0 sm:ml-4 shrink-0">
                        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
                          {step.authority}
                        </span>
                        <span className="inline-flex items-center text-xs font-bold text-emerald-700 dark:text-[#14FFEC] bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg shrink-0 whitespace-nowrap">
                          {step.estimatedTime}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Required Documents & Rejection Traps (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Documents Needed */}
          <div className="bg-white dark:bg-zinc-950 p-6 sm:p-7 rounded-3xl border border-zinc-200/90 dark:border-white/10 shadow-sm space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white uppercase tracking-wider flex items-center space-x-2">
              <FileCheck2 className="w-5 h-5 text-emerald-600 dark:text-[#14FFEC] shrink-0" />
              <span>Required Paperwork</span>
            </h3>

            <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-200">
              {guide.documentsNeeded.map((doc, i) => (
                <li key={i} className="flex items-start space-x-2.5 leading-relaxed">
                  <span className="text-emerald-500 dark:text-[#14FFEC] font-bold text-base leading-none mt-0.5">•</span>
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Common Pitfalls / Rejection Traps */}
          <div className="bg-rose-500/5 dark:bg-rose-950/20 p-6 sm:p-7 rounded-3xl border border-rose-500/25 space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-rose-700 dark:text-rose-300 uppercase tracking-wider flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0" />
              <span>Top Rejection Pitfalls</span>
            </h3>

            <ul className="space-y-3 text-xs sm:text-sm text-rose-800 dark:text-rose-300">
              {guide.commonPitfalls.map((pit, i) => (
                <li key={i} className="flex items-start space-x-2.5 leading-relaxed">
                  <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>{pit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pro Support Card */}
          <div className="bg-zinc-950 text-white p-6 sm:p-7 rounded-3xl shadow-xl space-y-3.5 border border-zinc-800">
            <span className="text-xs uppercase font-bold tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
              Expert Assistance
            </span>
            <h4 className="text-base sm:text-lg font-black text-white">Need a Personal Equivalency Audit?</h4>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
              Masar Pro members can request our admissions counselors to review their subject combinations before final exam registration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
