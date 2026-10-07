"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  GraduationCap, 
  FileText, 
  ArrowRight, 
  Award, 
  BookOpen, 
  ShieldCheck, 
  Building2,
  CheckCircle2,
  MapPin,
  Zap,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  User,
  Compass,
  Check,
  Download,
  Calendar,
  ExternalLink,
} from "lucide-react";
import ScrollReveal from "@/components/reactbits/ScrollReveal";
import FloatIn from "@/components/reactbits/FloatIn";
import AccordionGallery, { AccordionGalleryItem } from "@/components/reactbits/AccordionGallery";
import StrokeText from "@/components/reactbits/StrokeText";
import CountUp from "@/components/reactbits/CountUp";
import GlareHover from "@/components/reactbits/GlareHover";
import BorderGlow from "@/components/reactbits/BorderGlow";
import Aurora from "@/components/reactbits/Aurora";
import LiquidEther from "@/components/reactbits/LiquidEther";
import LightPillar from "@/components/reactbits/LightPillar";
import LightRays from "@/components/reactbits/LightRays";
import AnimatedPriceNumber from "@/components/AnimatedPriceNumber";

const accordionUniversities: AccordionGalleryItem[] = [
  {
    image: "/images/AUS/campus.jpg",
    label: "American University of Sharjah (AUS)",
    sublabel: "University City, Sharjah • ★ 4.9 (1.8k)",
    emirate: "Sharjah",
    requirement: "Min. BBB / IB 30",
    scholarship: "Up to 50% Merit",
    link: "/universities",
    alt: "American University of Sharjah",
  },
  {
    image: "/images/NYUAD/campus.jpg",
    label: "New York University Abu Dhabi",
    sublabel: "Saadiyat Marina, Abu Dhabi • ★ 4.9 (950)",
    emirate: "Abu Dhabi",
    requirement: "Min. A*AA / IB 38",
    scholarship: "Full Need-Blind Aid",
    link: "/universities",
    alt: "New York University Abu Dhabi",
  },
  {
    image: "/images/heriot-watt/campus.webp",
    label: "Heriot-Watt University Dubai",
    sublabel: "Dubai Knowledge Park • ★ 4.8 (1.4k)",
    emirate: "Dubai",
    requirement: "Min. BBC / IB 28",
    scholarship: "AED 30k Early Bird",
    link: "/universities",
    alt: "Heriot-Watt University Dubai",
  },
  {
    image: "/images/khalifa/campus.jpg",
    label: "Khalifa University (KU)",
    sublabel: "Al Zafranah, Abu Dhabi • ★ 4.9 (1.1k)",
    emirate: "Abu Dhabi",
    requirement: "Min. 85% / A*A",
    scholarship: "Full National Scholarship",
    link: "/universities",
    alt: "Khalifa University of Science and Technology",
  },
  {
    image: "/images/birmingham/campus.jpg",
    label: "University of Birmingham Dubai",
    sublabel: "Dubai Academic City • ★ 4.9 (1.3k)",
    emirate: "Dubai",
    requirement: "Min. AAB / IB 32",
    scholarship: "Up to 50% Provost",
    link: "/universities",
    alt: "University of Birmingham Dubai",
  },
  {
    image: "/images/cud/campus.jpg",
    label: "Canadian University Dubai (CUD)",
    sublabel: "City Walk, Dubai • ★ 4.8 (1.0k)",
    emirate: "Dubai",
    requirement: "Min. 2 A-Levels / IB 24",
    scholarship: "20% to 50% Merit",
    link: "/universities",
    alt: "Canadian University Dubai",
  },
];

const campusShowcaseList = [
  {
    id: "aus",
    shortName: "AUS Sharjah",
    fullName: "American University of Sharjah",
    location: "University City, Sharjah",
    criteria: "Min. BBB / IB 30",
    scholarship: "Up to 50% Merit Scholarship",
    desc: "Premier AACSB-accredited business and ABET-accredited engineering programs with state-of-the-art research laboratories.",
    image: "/images/AUS/campus.jpg",
  },
  {
    id: "nyuad",
    shortName: "NYU Abu Dhabi",
    fullName: "New York University Abu Dhabi",
    location: "Saadiyat Marina, Abu Dhabi",
    criteria: "Min. A*AA / IB 38",
    scholarship: "Full Need-Blind Global Aid",
    desc: "World-class liberal arts and STEM research campus with comprehensive global exchange opportunities and prestigious faculty.",
    image: "/images/NYUAD/campus.jpg",
  },
  {
    id: "heriot-watt",
    shortName: "Heriot-Watt Dubai",
    fullName: "Heriot-Watt University Dubai",
    location: "Dubai Knowledge Park",
    criteria: "Min. BBC / IB 28",
    scholarship: "AED 30,000 Early Bird Grant",
    desc: "Pioneering British higher education in robotics, data science, and business with direct UK degree parity and international mobility.",
    image: "/images/heriot-watt/campus.webp",
  },
  {
    id: "khalifa",
    shortName: "Khalifa University",
    fullName: "Khalifa University of Science & Tech",
    location: "Al Zafranah, Abu Dhabi",
    criteria: "Min. 85% / A*A",
    scholarship: "Full National Scholarship",
    desc: "Top-ranked UAE national research institution dedicated to aerospace engineering, AI, nuclear sciences, and medicine.",
    image: "/images/khalifa/campus.jpg",
  },
  {
    id: "birmingham",
    shortName: "Birmingham Dubai",
    fullName: "University of Birmingham Dubai",
    location: "Dubai Academic City",
    criteria: "Min. AAB / IB 32",
    scholarship: "Up to 50% Provost Scholarship",
    desc: "World top-100 Russell Group institution featuring a state-of-the-art sustainable intelligent campus with global research links.",
    image: "/images/birmingham/campus.jpg",
  },
  {
    id: "cud",
    shortName: "Canadian Uni Dubai",
    fullName: "Canadian University Dubai",
    location: "City Walk, Dubai",
    criteria: "Min. 2 A-Levels / IB 24",
    scholarship: "20% to 50% Academic Merit",
    desc: "Vibrant City Walk campus offering Canadian curriculum pathways and seamless transfer opportunities to premier universities in Canada.",
    image: "/images/cud/campus.jpg",
  },
  {
    id: "uowd",
    shortName: "UOWD",
    fullName: "University of Wollongong in Dubai",
    location: "Dubai Knowledge Park",
    criteria: "Min. CCC / IB 26",
    scholarship: "Up to 50% Academic Excellence",
    desc: "First international Australian university in the UAE with premier computer science, cybersecurity, and finance programs.",
    image: "/images/uowd/campus.jpg",
  },
  {
    id: "uos",
    shortName: "Uni of Sharjah",
    fullName: "University of Sharjah",
    location: "University City, Sharjah",
    criteria: "Min. 80% / BBC",
    scholarship: "Up to 50% Outstanding Student Award",
    desc: "Comprehensive research university with sprawling campus facilities, world-class medical colleges, and cutting-edge health centers.",
    image: "/images/UoS/campus.jpg",
  },
];

const upperRowUniversities = [
  { name: "American University of Sharjah", location: "University City, Sharjah" },
  { name: "New York University Abu Dhabi", location: "Saadiyat Island, Abu Dhabi" },
  { name: "Heriot-Watt University Dubai", location: "Dubai Knowledge Park, Dubai" },
  { name: "Khalifa University", location: "Al Zafranah, Abu Dhabi" },
  { name: "Canadian University Dubai", location: "City Walk, Dubai" },
  { name: "University of Birmingham Dubai", location: "DIAC, Dubai" },
  { name: "Sorbonne University Abu Dhabi", location: "Al Reem Island, Abu Dhabi" },
  { name: "United Arab Emirates University", location: "Al Ain, Abu Dhabi" },
];

const bottomRowUniversities = [
  { name: "University of Wollongong in Dubai", location: "Dubai Knowledge Park, Dubai" },
  { name: "American University in Dubai", location: "Dubai Media City, Dubai" },
  { name: "Middlesex University Dubai", location: "Dubai Knowledge Park, Dubai" },
  { name: "Rochester Institute of Technology", location: "Dubai Silicon Oasis, Dubai" },
  { name: "University of Sharjah", location: "University City, Sharjah" },
  { name: "Zayed University", location: "Academic City, Dubai & Abu Dhabi" },
  { name: "Gulf Medical University", location: "Al Jurf, Ajman" },
  { name: "Curtin University Dubai", location: "DIAC, Dubai" },
  { name: "Ajman University", location: "Al Jurf, Ajman" },
  { name: "UAE MOE Mu'adala Equivalency", location: "Federal UAE" },
];

const faqList = [
  {
    question: "Is Masar UAE really free to start and to use?",
    answer: "Yes, 100%! All UAE high school students can sign up, access past paper practice questions with our AI coach, build and export certified extracurricular CVs in PDF/DOCX, and search 70+ UAE university campuses completely free of charge. No credit card is ever required to create an account or use our core features."
  },
  {
    question: "What is Masar UAE and who is it designed for?",
    answer: "Masar UAE is an all-in-one academic and university admissions platform built specifically for secondary school students in the United Arab Emirates (Grades 10–12 / Years 11–13) studying Cambridge CIE, Edexcel, IB Diploma, American AP, and CBSE curricula. It unifies past paper exam preparation, extracurricular portfolio building, and intelligent UAE university matching into a single intuitive copilot."
  },
  {
    question: "How does Masar UAE ensure alignment with UAE MOE Mu'adala (Equivalency)?",
    answer: "Our system embeds official UAE Ministry of Education (MOE) equivalency standards. We evaluate your subject combinations, minimum pass criteria, compulsory Arabic and Islamic requirements, and curriculum track (General vs Advanced) in real time so you avoid last-minute equivalency rejection traps."
  },
  {
    question: "Can I find scholarships and financial aid through Masar UAE?",
    answer: "Yes! Masar UAE tracks over AED 50,000,000 in active merit scholarships, early-bird discounts, and financial aid grants across 70+ UAE campuses. By inputting your predicted grades or board marks, we immediately pinpoint the exact scholarship brackets and tuition discounts you qualify for."
  },
  {
    question: "How does the AI Past Paper Coach grade my responses?",
    answer: "Our AI engine is calibrated to official examiner mark schemes from Cambridge CIE, Edexcel, and the International Baccalaureate. Rather than generic feedback, it highlights method marks (M), accuracy marks (A), and independent marks (B), diagnosing missing syllabus keywords and command word traps."
  },
  {
    question: "What formats can I export my extracurricular CV in?",
    answer: "You can instantly export your verified student portfolio as an ATS-optimized, professionally structured PDF or editable Microsoft Word (.docx) document, formatted specifically to meet the admission requirements of UAE universities and global application portals."
  }
];

export default function Home() {
  const [selectedCampusIndex, setSelectedCampusIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isYearly, setIsYearly] = useState(false);
  const [proShader, setProShader] = useState<"liquid" | "pillar" | "rays">("liquid");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      if (typeof window !== "undefined") {
        setIsLoggedIn(localStorage.getItem("masar_is_logged_in") === "true");
      }
    };
    checkAuth();
    window.addEventListener("masar_auth_changed", checkAuth);
    window.addEventListener("storage", checkAuth);
    return () => {
      window.removeEventListener("masar_auth_changed", checkAuth);
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  const currentCampus = campusShowcaseList[selectedCampusIndex];

  const handleNextCampus = () => {
    setSelectedCampusIndex((prev) => (prev + 1) % campusShowcaseList.length);
  };

  const handlePrevCampus = () => {
    setSelectedCampusIndex((prev) => (prev - 1 + campusShowcaseList.length) % campusShowcaseList.length);
  };

  return (
    <div className="space-y-20 sm:space-y-28 pb-24 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-black transition-colors duration-200">
      
      {/* 1. HERO SECTION - Framed Minimalist Card Container */}
      <section className="pt-4 sm:pt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[32px] sm:rounded-[40px] border border-zinc-200/90 dark:border-white/10 bg-zinc-50/70 dark:bg-[#070707] px-6 sm:px-12 py-12 sm:py-20 text-center overflow-hidden">
          {/* Subtle Dual Tone Aura */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-r from-blue-500/10 via-emerald-500/10 to-transparent blur-3xl pointer-events-none -z-10" />

          {/* Centered Free Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-xs font-bold text-emerald-600 dark:text-[#14FFEC] shadow-2xs mb-5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>100% Free to Use • No Credit Card Required</span>
          </div>

          {/* Bold, Clean Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-zinc-900 dark:text-white tracking-tight leading-[1.08] max-w-4xl mx-auto">
            Where Futures Grow
          </h1>

          {/* StrokeText Animation */}
          <div className="mt-3 sm:mt-4 max-w-3xl mx-auto flex justify-center px-4">
            <StrokeText
              text="Ace Exams. Build CV. Match Top Unis."
              strokeColor="#00ADB5"
              fillColor="#00ADB5"
              strokeWidth={1.5}
              drawDuration={1.6}
              fillDelay={0.2}
              stagger={0.035}
              ease="power2.out"
              trigger="mount"
              fillMode="wipe"
              fontSize={54}
              fontWeight={900}
              letterSpacing={-1.5}
              className="w-full text-[#00ADB5]"
            />
          </div>

          {/* Minimalist Editorial Subtitle */}
          <p className="mt-4 text-sm sm:text-base lg:text-lg text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed">
            A syllabus-driven, AI-powered platform designed for high school mastery and seamless UAE university admissions.
          </p>

          {/* Minimalist Pill CTA Buttons with High-Contrast Light & Dark Visibility */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href={isLoggedIn ? "/dashboard" : "/signup"}
              className="inline-block rounded-full group hover:scale-[1.02] active:scale-95 transition-transform duration-200"
            >
              <GlareHover
                width="auto"
                height="auto"
                borderRadius="9999px"
                glareColor="#14FFEC"
                glareOpacity={0.35}
                glareAngle={-45}
                glareSize={250}
                transitionDuration={650}
                className="rounded-full px-7 py-3 bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-100 border border-black dark:border-white font-bold text-xs sm:text-sm shadow-md inline-flex items-center space-x-2 transition-colors cursor-pointer"
              >
                <span className="relative z-10 text-white dark:text-black font-extrabold">
                  {isLoggedIn ? "Open Your Dashboard" : "Sign Up Free"}
                </span>
                <ArrowRight className="w-3.5 h-3.5 relative z-10 text-white dark:text-black shrink-0" />
              </GlareHover>
            </Link>

            <Link
              href={isLoggedIn ? "/universities" : "/signup"}
              className="inline-block rounded-full group hover:scale-[1.02] active:scale-95 transition-transform duration-200"
            >
              <GlareHover
                width="auto"
                height="auto"
                borderRadius="9999px"
                glareColor="#a1a1aa"
                glareOpacity={0.25}
                glareAngle={-45}
                glareSize={250}
                transitionDuration={650}
                className="rounded-full px-7 py-3 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 border border-zinc-300 dark:border-white/20 font-bold text-xs sm:text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 shadow-xs transition-colors inline-flex items-center cursor-pointer"
              >
                <span className="relative z-10 text-zinc-900 dark:text-zinc-100 font-bold">Explore 70+ Campuses Free</span>
              </GlareHover>
            </Link>
          </div>

          {/* Free Microcopy Under Buttons */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
            <span className="flex items-center space-x-1.5 text-emerald-600 dark:text-[#14FFEC] font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>100% Free to start & use</span>
            </span>
            <span className="hidden sm:inline">•</span>
            <span>No credit card required</span>
            <span className="hidden sm:inline">•</span>
            <span>Instant access for all UAE students</span>
          </div>

          {/* Trust Alignment Inside Hero Container */}
          <div className="mt-12 pt-6 border-t border-zinc-200/80 dark:border-white/10 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs font-semibold text-zinc-600 dark:text-zinc-400">
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Cambridge CIE</span>
            </div>
            <span className="text-zinc-300 dark:text-zinc-700 font-bold">•</span>
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>IB World Schools</span>
            </div>
            <span className="text-zinc-300 dark:text-zinc-700 font-bold">•</span>
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>UAE MOE Aligned</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CAMPUS SHOWCASE SECTION - In-flow Interactive Card with Fluid Liquidy Switcher */}
      <section id="explore" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="rounded-3xl sm:rounded-[36px] overflow-hidden border border-zinc-200/90 dark:border-white/10 bg-zinc-50/70 dark:bg-[#0a0a0c] p-4 sm:p-7 space-y-5 shadow-sm">
          
          {/* Header & Category Subtitle */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 px-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-emerald-400">
                Live Campus Explorer
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight mt-1">
                Explore Premier UAE Universities
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                Switch between campuses to view verified entry requirements, facilities, and merit scholarships.
              </p>
            </div>
            {/* Quick Prev / Next Controls */}
            <div className="flex items-center space-x-2 shrink-0">
              <button
                onClick={handlePrevCampus}
                className="w-8 h-8 rounded-full border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer shadow-2xs"
                aria-label="Previous Campus"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-bold text-zinc-400 tabular-nums">
                {selectedCampusIndex + 1} / {campusShowcaseList.length}
              </span>
              <button
                onClick={handleNextCampus}
                className="w-8 h-8 rounded-full border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer shadow-2xs"
                aria-label="Next Campus"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Liquid Campus Selector Tabs - Equally Distributed */}
          <div className="w-full grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-1.5 p-1.5 rounded-2xl bg-zinc-200/50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-white/10">
            {campusShowcaseList.map((campus, idx) => {
              const isActive = selectedCampusIndex === idx;
              return (
                <button
                  key={campus.id}
                  onClick={() => setSelectedCampusIndex(idx)}
                  className={`relative w-full py-2 px-1 rounded-xl text-[11px] sm:text-xs font-bold transition-colors cursor-pointer z-10 flex items-center justify-center text-center ${
                    isActive ? "text-white" : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCampusIndicator"
                      className="absolute inset-0 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-xl shadow-xs -z-10"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}
                  <span className="whitespace-nowrap">{campus.shortName}</span>
                </button>
              );
            })}
          </div>

          {/* Fluid Liquidy Campus Card */}
          <div className="relative w-full h-[440px] sm:h-[500px] rounded-2xl sm:rounded-3xl overflow-hidden border border-zinc-200/90 dark:border-white/10 shadow-lg bg-zinc-900">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCampus.id}
                initial={{ opacity: 0, scale: 0.98, filter: "blur(8px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.02, filter: "blur(8px)" }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 w-full h-full"
              >
                {/* Real Campus Image */}
                <img
                  src={currentCampus.image}
                  alt={currentCampus.fullName}
                  className="w-full h-full object-cover select-none"
                />
                
                {/* Subtle Gradient Backdrop */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30 pointer-events-none" />

                {/* Black Oval Contrast Container Behind Text */}
                <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-8">
                  <div className="relative max-w-2xl w-full text-center px-6 py-7 sm:px-10 sm:py-9 rounded-[28px] sm:rounded-[36px] bg-black/80 backdrop-blur-md border border-white/20 text-white space-y-3.5 shadow-2xl">
                    <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-emerald-300 text-xs font-bold">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{currentCampus.location}</span>
                      <span className="opacity-60">•</span>
                      <span>{currentCampus.criteria}</span>
                    </div>

                    <h3 className="text-2xl sm:text-4xl font-black tracking-tight text-white drop-shadow-md">
                      {currentCampus.fullName}
                    </h3>

                    <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed max-w-xl mx-auto font-medium">
                      {currentCampus.desc}
                    </p>

                    <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                      <span className="px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold shadow-xs">
                        {currentCampus.scholarship}
                      </span>
                      <Link
                        href={isLoggedIn ? "/universities" : "/signup"}
                        className="inline-block rounded-full group hover:scale-[1.02] active:scale-95 transition-transform duration-200"
                      >
                        <GlareHover
                          width="auto"
                          height="auto"
                          borderRadius="9999px"
                          glareColor="#14FFEC"
                          glareOpacity={0.35}
                          glareAngle={-45}
                          glareSize={250}
                          transitionDuration={650}
                          className="inline-flex items-center space-x-1 px-5 py-2 rounded-full bg-white text-zinc-950 text-xs font-bold hover:bg-zinc-100 transition-colors shadow-md cursor-pointer"
                        >
                          <span className="relative z-10 text-zinc-950 font-bold">Check Eligibility</span>
                          <ArrowRight className="w-3.5 h-3.5 ml-1 relative z-10 text-zinc-950 shrink-0" />
                        </GlareHover>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 3. KEY METRICS STATS SECTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-6 sm:p-8 bg-zinc-50/70 dark:bg-zinc-950/80 border border-zinc-200/90 dark:border-white/10 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center sm:text-left">
            {/* Stat 1 */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-[#14FFEC] shrink-0">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white tabular-nums tracking-tight">
                  <CountUp to={70} duration={1.8} />+
                </p>
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-medium mt-0.5">
                  UAE Campuses Mapped
                </p>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-[#14FFEC] shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-black text-emerald-600 dark:text-[#14FFEC] tabular-nums tracking-tight">
                  <CountUp to={100} duration={2} />%
                </p>
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-medium mt-0.5">
                  MOE Mu'adala Aligned
                </p>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white tabular-nums tracking-tight">
                  AED <CountUp to={50} duration={1.8} />k+
                </p>
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-medium mt-0.5">
                  Scholarships Unlocked
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURES SHOWCASE SECTION (ID="features") - 1.5x Spacing & Floating Scroll Reveal */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24 space-y-24 sm:space-y-36 lg:space-y-44">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto space-y-3"
        >
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-emerald-400">
            Platform Capabilities
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-zinc-900 dark:text-white tracking-tight">
            Designed for UAE Academic Excellence
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Four purpose-built tools synchronized around UAE curriculum requirements, university admissions benchmarks, and Ministry regulations.
          </p>
        </motion.div>

        {/* Feature 1: Student Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
        >
          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, x: -30, y: 25 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.75, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-4 text-left"
          >
            <div className="flex items-center space-x-2">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold border border-blue-500/20">
                <Compass className="w-3.5 h-3.5" />
                <span>Student Command Center</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-extrabold uppercase tracking-wider border border-emerald-500/20">
                100% Free
              </span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-black text-zinc-900 dark:text-white tracking-tight">
              All Your Academics & Mu'adala in One Place
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Track your syllabus milestone completion across Cambridge CIE, IB DP, and CBSE. Get real-time predictions of eligible UAE university programs and monitor your MOE Mu'adala certificate equivalency readiness.
            </p>
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center space-x-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Live UAE MOE Mu'adala equivalency score and criteria audit</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Predicted GPA & grade trajectory by curriculum subject</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Official examination countdown timer and key deadlines</span>
              </div>
            </div>
            <div className="pt-3">
              <Link
                href={isLoggedIn ? "/dashboard" : "/signup"}
                className="inline-block rounded-full group hover:scale-[1.02] active:scale-95 transition-transform duration-200"
              >
                <GlareHover
                  width="auto"
                  height="auto"
                  borderRadius="9999px"
                  glareColor="#14FFEC"
                  glareOpacity={0.35}
                  glareAngle={-45}
                  glareSize={250}
                  transitionDuration={650}
                  className="rounded-full px-6 py-2.5 bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-100 border border-black dark:border-white font-bold text-xs shadow-md inline-flex items-center space-x-2 transition-colors cursor-pointer"
                >
                  <span className="relative z-10 text-white dark:text-black font-bold">
                    {isLoggedIn ? "Open Dashboard" : "Open Free Dashboard"}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 relative z-10 text-white dark:text-black shrink-0" />
                </GlareHover>
              </Link>
            </div>
          </motion.div>

          {/* Right UI Screenshot Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30, y: 40, scale: 0.96 }}
            whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="rounded-2xl sm:rounded-3xl border border-zinc-200/90 dark:border-white/10 bg-zinc-100/90 dark:bg-[#0c0c0e] p-3 sm:p-5 shadow-xl space-y-3 hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Browser / Window Header */}
              <div className="flex items-center justify-between px-2 pb-2 border-b border-zinc-200 dark:border-white/10 text-xs text-zinc-400">
                <div className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                </div>
                <span className="font-mono text-[11px]">masar.ae/dashboard</span>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-500 font-bold px-2 py-0.5 rounded-full">Free Live Sync</span>
              </div>

              {/* Mockup Body */}
              <div className="space-y-3 pt-1">
                {/* Profile Banner */}
                <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-white/10 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-emerald-500 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                      RA
                    </div>
                    <div>
                      <p className="text-sm font-bold text-zinc-900 dark:text-white">Rashid Al Nuaimi</p>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Dubai College • Cambridge CIE A-Levels</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Target Major</span>
                    <p className="text-xs font-black text-blue-600 dark:text-emerald-400">Computer Engineering</p>
                  </div>
                </div>

                {/* Dashboard Metrics Grid */}
                <div className="grid grid-cols-3 gap-2.5 text-left">
                  <div className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-white/10">
                    <span className="text-[10px] font-bold uppercase text-zinc-400">Mu'adala Status</span>
                    <p className="text-lg font-black text-emerald-600 dark:text-[#14FFEC]">92% Ready</p>
                    <span className="text-[10px] text-zinc-400">5 of 6 criteria met</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-white/10">
                    <span className="text-[10px] font-bold uppercase text-zinc-400">Uni Matches</span>
                    <p className="text-lg font-black text-zinc-900 dark:text-white">18 Programs</p>
                    <span className="text-[10px] text-blue-500">7 Full Scholarships</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-white/10">
                    <span className="text-[10px] font-bold uppercase text-zinc-400">Exam Countdown</span>
                    <p className="text-lg font-black text-amber-500">18 Days</p>
                    <span className="text-[10px] text-zinc-400">Physics 9702/42</span>
                  </div>
                </div>

                {/* Syllabus Progress */}
                <div className="p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-white/10 space-y-2 text-left">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-zinc-800 dark:text-zinc-200">A-Level Physics 9702 Syllabus Coverage</span>
                    <span className="font-bold text-emerald-500">88%</span>
                  </div>
                  <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-emerald-500 h-full w-[88%] rounded-full" />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Feature 2: AI Past Paper Coach */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
        >
          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, x: 30, y: 25 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.75, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-4 text-left lg:order-2"
          >
            <div className="flex items-center space-x-2">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Official Mark Scheme Engine</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-extrabold uppercase tracking-wider border border-emerald-500/20">
                100% Free
              </span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-black text-zinc-900 dark:text-white tracking-tight">
              AI Past Paper Coach Calibrated to Examiners
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Upload exam questions or write down your step-by-step calculations. Our AI examiner evaluates your working against official CIE, Edexcel, and IB rubrics, pinpointing missing step marks and command word traps.
            </p>
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center space-x-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Step marks breakdown (Method M, Accuracy A, Independent B)</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Official Examiner Report hints and recurring student pitfalls</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Cambridge 9702, Edexcel WMA14, IB DP Physics, Chemistry & Math</span>
              </div>
            </div>
            <div className="pt-3">
              <Link
                href={isLoggedIn ? "/coach" : "/signup"}
                className="inline-block rounded-full group hover:scale-[1.02] active:scale-95 transition-transform duration-200"
              >
                <GlareHover
                  width="auto"
                  height="auto"
                  borderRadius="9999px"
                  glareColor="#14FFEC"
                  glareOpacity={0.35}
                  glareAngle={-45}
                  glareSize={250}
                  transitionDuration={650}
                  className="rounded-full px-6 py-2.5 bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 border border-black dark:border-white font-bold text-xs shadow-md inline-flex items-center space-x-2 transition-colors cursor-pointer"
                >
                  <span className="relative z-10 text-white dark:text-black font-bold">
                    {isLoggedIn ? "Open AI Coach" : "Try AI Coach Free"}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 relative z-10 text-white dark:text-black shrink-0" />
                </GlareHover>
              </Link>
            </div>
          </motion.div>

          {/* Right UI Screenshot Mockup */}
          <motion.div
            initial={{ opacity: 0, x: -30, y: 40, scale: 0.96 }}
            whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 lg:order-1"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
              className="rounded-2xl sm:rounded-3xl border border-zinc-200/90 dark:border-white/10 bg-zinc-100/90 dark:bg-[#0c0c0e] p-3 sm:p-5 shadow-xl space-y-3 hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Window Header */}
              <div className="flex items-center justify-between px-2 pb-2 border-b border-zinc-200 dark:border-white/10 text-xs text-zinc-400">
                <div className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                </div>
                <span className="font-mono text-[11px]">masar.ae/coach</span>
                <span className="text-[10px] bg-blue-500/10 text-blue-500 font-bold px-2 py-0.5 rounded-full">CIE Examiner Calibrated</span>
              </div>

              {/* Mockup Body */}
              <div className="space-y-3 pt-1 text-left">
                {/* Question Box */}
                <div className="p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-white/10 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-blue-600 dark:text-blue-400">Cambridge CIE A-Level Physics • 9702/42</span>
                    <span className="font-bold text-zinc-400">[5 Marks]</span>
                  </div>
                  <p className="text-xs text-zinc-800 dark:text-zinc-200 font-medium">
                    "Define gravitational potential at a point in a gravitational field, and state why its value is always negative."
                  </p>
                </div>

                {/* AI Examiner Feedback Card */}
                <div className="p-4 rounded-xl bg-emerald-500/10 dark:bg-emerald-950/30 border border-emerald-500/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-4 h-4 text-emerald-500" />
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        Mark Scheme Audit: Awarded 4 / 5 Marks
                      </span>
                    </div>
                    <div className="flex space-x-1">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-500">M1 ✓</span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-500">A1 ✓</span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-500">B1 ✓</span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-500">A1 (Missed)</span>
                    </div>
                  </div>
                  <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    <strong>Examiner Note:</strong> You stated "work done to bring a unit mass", but missed stating <em>"from infinity"</em>. CIE examiners deduct 1 mark when the reference zero potential at infinity is omitted.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Feature 3: CV & Extracurricular Builder */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
        >
          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, x: -30, y: 25 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.75, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-4 text-left"
          >
            <div className="flex items-center space-x-2">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold border border-blue-500/20">
                <FileText className="w-3.5 h-3.5" />
                <span>Certified Portfolios</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-extrabold uppercase tracking-wider border border-emerald-500/20">
                Free Export
              </span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-black text-zinc-900 dark:text-white tracking-tight">
              Extracurricular & Volunteering CV Builder
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Log verified community service hours with Dubai Cares, Emirates Red Crescent, and student leadership roles. Generate clean, ATS-optimized student CVs formatted for UAE and global university committees.
            </p>
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center space-x-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Dubai Cares & UAE Red Crescent volunteer hour validation</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>One-click PDF & DOCX export formatted for admissions deans</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Impact quantification tips to stand out in competitive pools</span>
              </div>
            </div>
            <div className="pt-3">
              <Link
                href={isLoggedIn ? "/cv-builder" : "/signup"}
                className="inline-block rounded-full group hover:scale-[1.02] active:scale-95 transition-transform duration-200"
              >
                <GlareHover
                  width="auto"
                  height="auto"
                  borderRadius="9999px"
                  glareColor="#14FFEC"
                  glareOpacity={0.35}
                  glareAngle={-45}
                  glareSize={250}
                  transitionDuration={650}
                  className="rounded-full px-6 py-2.5 bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 border border-black dark:border-white font-bold text-xs shadow-md inline-flex items-center space-x-2 transition-colors cursor-pointer"
                >
                  <span className="relative z-10 text-white dark:text-black font-bold">
                    {isLoggedIn ? "Open CV Builder" : "Build Your CV Free"}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 relative z-10 text-white dark:text-black shrink-0" />
                </GlareHover>
              </Link>
            </div>
          </motion.div>

          {/* Right UI Screenshot Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30, y: 40, scale: 0.96 }}
            whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="rounded-2xl sm:rounded-3xl border border-zinc-200/90 dark:border-white/10 bg-zinc-100/90 dark:bg-[#0c0c0e] p-3 sm:p-5 shadow-xl space-y-3 hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Window Header */}
              <div className="flex items-center justify-between px-2 pb-2 border-b border-zinc-200 dark:border-white/10 text-xs text-zinc-400">
                <div className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                </div>
                <span className="font-mono text-[11px]">masar.ae/cv-builder</span>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">Free PDF • DOCX Export</span>
                </div>
              </div>

              {/* CV Preview Document */}
              <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-white/10 space-y-3 text-left">
                <div className="border-b border-zinc-200 dark:border-zinc-800 pb-3">
                  <h4 className="text-base font-black text-zinc-900 dark:text-white">Rashid Al Nuaimi</h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Dubai, UAE • rashid@email.com • +971 50 123 4567 • Aspiring Software Engineer
                  </p>
                </div>

                {/* Volunteering & Extracurriculars */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-emerald-400">
                    Extracurricular Leadership & Volunteering
                  </span>
                  <div className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/60 dark:border-white/5 space-y-1">
                    <div className="flex justify-between items-center text-xs font-bold text-zinc-800 dark:text-zinc-200">
                      <span>Dubai Cares Volunteer Lead</span>
                      <span className="text-[10px] text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">45 Verified Hours</span>
                    </div>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      Led book collection campaign across 3 schools, mobilizing 1,200+ textbooks for regional youth.
                    </p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/60 dark:border-white/5 space-y-1">
                    <div className="flex justify-between items-center text-xs font-bold text-zinc-800 dark:text-zinc-200">
                      <span>Head of High School Robotics Club</span>
                      <span className="text-[10px] text-blue-500 font-bold bg-blue-500/10 px-2 py-0.5 rounded">VEX UAE Finalist</span>
                    </div>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      Mentored 14 junior students in Python sensor integration and autonomous navigation algorithms.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Feature 4: UAE University & Scholarship Matcher */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
        >
          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, x: 30, y: 25 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.75, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-4 text-left lg:order-2"
          >
            <div className="flex items-center space-x-2">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>70+ UAE Campuses</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-extrabold uppercase tracking-wider border border-emerald-500/20">
                100% Free
              </span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-black text-zinc-900 dark:text-white tracking-tight">
              UAE University & Scholarship Matcher
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Filter 70+ accredited higher education institutions across Abu Dhabi, Dubai, Sharjah, and Ajman. Instantly calculate your admission odds and discover AED 10,000 to AED 100,000+ merit scholarships matching your predicted grades.
            </p>
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center space-x-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Search by British A-Levels, IB Points, CBSE %, or American High School GPA</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Direct scholarship filter with automatic discount calculation</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>CAA & KHDA accreditation badges for verified degree recognition</span>
              </div>
            </div>
            <div className="pt-3">
              <Link
                href={isLoggedIn ? "/universities" : "/signup"}
                className="inline-block rounded-full group hover:scale-[1.02] active:scale-95 transition-transform duration-200"
              >
                <GlareHover
                  width="auto"
                  height="auto"
                  borderRadius="9999px"
                  glareColor="#14FFEC"
                  glareOpacity={0.35}
                  glareAngle={-45}
                  glareSize={250}
                  transitionDuration={650}
                  className="rounded-full px-6 py-2.5 bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 border border-black dark:border-white font-bold text-xs shadow-md inline-flex items-center space-x-2 transition-colors cursor-pointer"
                >
                  <span className="relative z-10 text-white dark:text-black font-bold">
                    {isLoggedIn ? "Explore Universities" : "Match Universities Free"}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 relative z-10 text-white dark:text-black shrink-0" />
                </GlareHover>
              </Link>
            </div>
          </motion.div>

          {/* Right UI Screenshot Mockup */}
          <motion.div
            initial={{ opacity: 0, x: -30, y: 40, scale: 0.96 }}
            whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 lg:order-1"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut" }}
              className="rounded-2xl sm:rounded-3xl border border-zinc-200/90 dark:border-white/10 bg-zinc-100/90 dark:bg-[#0c0c0e] p-3 sm:p-5 shadow-xl space-y-3 hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Window Header */}
              <div className="flex items-center justify-between px-2 pb-2 border-b border-zinc-200 dark:border-white/10 text-xs text-zinc-400">
                <div className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                </div>
                <span className="font-mono text-[11px]">masar.ae/universities</span>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-500 font-bold px-2 py-0.5 rounded-full">70+ Campuses Active</span>
              </div>

              {/* Mockup Campus Cards */}
              <div className="space-y-2 text-left">
                {/* Match 1 */}
                <div className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-white/10 flex items-center space-x-3">
                  <img
                    src="/images/AUS/campus.jpg"
                    alt="American University of Sharjah"
                    className="w-14 h-14 rounded-lg object-cover shrink-0 border border-zinc-200 dark:border-white/10"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-zinc-900 dark:text-white truncate">American University of Sharjah</p>
                      <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">Eligible</span>
                    </div>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Sharjah • Min. BBB / IB 30</p>
                    <p className="text-[11px] font-bold text-blue-600 dark:text-blue-400">Up to 50% Merit Scholarship (AED 45k/yr)</p>
                  </div>
                </div>

                {/* Match 2 */}
                <div className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-white/10 flex items-center space-x-3">
                  <img
                    src="/images/heriot-watt/campus.webp"
                    alt="Heriot-Watt University Dubai"
                    className="w-14 h-14 rounded-lg object-cover shrink-0 border border-zinc-200 dark:border-white/10"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-zinc-900 dark:text-white truncate">Heriot-Watt University Dubai</p>
                      <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">Eligible</span>
                    </div>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Dubai Knowledge Park • Min. BBC / IB 28</p>
                    <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">AED 30,000 Early Bird Grant</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

      </section>

      {/* 5. TOP UAE UNIVERSITIES - ACCORDION GALLERY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[32px] sm:rounded-[40px] border border-zinc-200/90 dark:border-white/10 bg-zinc-50/70 dark:bg-[#070707] p-6 sm:p-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Accredited Campuses
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight mt-1">
                Top UAE Universities
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                From Dubai Knowledge Park to Abu Dhabi, discover accredited institutions with verified admission benchmarks.
              </p>
            </div>
          </div>

          {/* Interactive React Bits AccordionGallery with Local Campus Images */}
          <FloatIn delay={100} distance={20}>
            <div className="w-full">
              <AccordionGallery
                items={accordionUniversities.map((item) => ({
                  ...item,
                  link: isLoggedIn ? "/universities" : "/signup",
                }))}
                defaultIndex={1}
                expandRatio={0.50}
                height={460}
                gap={12}
                radius={20}
                trigger="hover"
                accentColor="#10b981"
                overlayColor="#050508"
                textColor="#ffffff"
                grayscale={true}
                tilt={7}
                parallax={0.45}
              />
            </div>
          </FloatIn>

          <div className="flex items-center justify-end pt-4 border-t border-zinc-200 dark:border-white/10 text-xs">
            <Link
              href={isLoggedIn ? "/universities" : "/signup"}
              className="inline-block rounded-full group hover:scale-[1.02] active:scale-95 transition-transform duration-200"
            >
              <GlareHover
                width="auto"
                height="auto"
                borderRadius="9999px"
                glareColor="#14FFEC"
                glareOpacity={0.35}
                glareAngle={-45}
                glareSize={250}
                transitionDuration={650}
                className="rounded-full px-5 py-2.5 bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 border border-black dark:border-white font-bold text-xs shadow-md inline-flex items-center space-x-2 transition-colors cursor-pointer"
              >
                <span className="relative z-10 text-white dark:text-black font-bold">View all 70+ campuses</span>
                <ArrowRight className="w-3.5 h-3.5 relative z-10 text-white dark:text-black shrink-0" />
              </GlareHover>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. CONTINUOUS LOOPING UNIVERSITY STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10 sm:my-14">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-emerald-400">
            Higher Education Network
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white">
            Built for Every Top UAE University & Campus
          </h3>
        </div>

        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] py-6 sm:py-8 space-y-5 sm:space-y-6">
            {/* Upper Row: Left */}
            <div className="flex overflow-hidden py-3 sm:py-4">
              <div className="animate-marquee-left flex items-center space-x-5">
                {[...upperRowUniversities, ...upperRowUniversities].map((uni, idx) => (
                  <Link
                    key={`upper-${uni.name}-${idx}`}
                    href={isLoggedIn ? "/universities" : "/signup"}
                    className="shrink-0 flex flex-col justify-center px-6 sm:px-7 py-3.5 sm:py-4 rounded-2xl bg-zinc-50 dark:bg-[#0c0c0e] border border-zinc-200 dark:border-white/15 hover:border-emerald-500/50 hover:scale-[1.02] shadow-xs hover:shadow-md transition-all cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white tracking-tight whitespace-nowrap">
                      {uni.name}
                    </span>
                    <span className="text-xs sm:text-[13px] text-zinc-500 dark:text-zinc-400 font-medium whitespace-nowrap mt-1">
                      {uni.location}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Bottom Row: Right */}
            <div className="flex overflow-hidden py-3 sm:py-4">
              <div className="animate-marquee-right flex items-center space-x-5">
                {[...bottomRowUniversities, ...bottomRowUniversities].map((uni, idx) => (
                  <Link
                    key={`bottom-${uni.name}-${idx}`}
                    href={isLoggedIn ? "/universities" : "/signup"}
                    className="shrink-0 flex flex-col justify-center px-6 sm:px-7 py-3.5 sm:py-4 rounded-2xl bg-zinc-50 dark:bg-[#0c0c0e] border border-zinc-200 dark:border-white/15 hover:border-blue-500/50 hover:scale-[1.02] shadow-xs hover:shadow-md transition-all cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white tracking-tight whitespace-nowrap">
                      {uni.name}
                    </span>
                    <span className="text-xs sm:text-[13px] text-zinc-500 dark:text-zinc-400 font-medium whitespace-nowrap mt-1">
                      {uni.location}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
      </section>

      {/* 7. ADMISSIONS 1-2-3 ROADMAP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-emerald-400">
            Streamlined Roadmap
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-zinc-900 dark:text-white">
            Admissions Made as Easy as 1-2-3
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
            A linear, distraction-free roadmap from secondary school exams to university matriculation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Step 1 */}
          <BorderGlow
            edgeSensitivity={30}
            glowColor="215 90 55"
            backgroundColor="#120F17"
            borderRadius={28}
            glowRadius={40}
            glowIntensity={1.2}
            coneSpread={25}
            animated={false}
            colors={['#2563eb', '#06b6d4', '#3b82f6']}
            className="hover:-translate-y-1 transition-transform duration-300 h-full"
          >
            <div className="p-6 sm:p-7 space-y-4 h-full flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black text-zinc-400 dark:text-zinc-600">01</span>
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 flex items-center justify-center">
                    <BookOpen className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                    Select Curriculum & Targets
                  </h3>
                  <p className="mt-1.5 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Choose Cambridge, IB, or CBSE. Input target subjects and predicted grades to see real-time eligibility across UAE campuses.
                  </p>
                </div>
              </div>
            </div>
          </BorderGlow>

          {/* Step 2 */}
          <BorderGlow
            edgeSensitivity={30}
            glowColor="160 90 45"
            backgroundColor="#120F17"
            borderRadius={28}
            glowRadius={40}
            glowIntensity={1.2}
            coneSpread={25}
            animated={false}
            colors={['#059669', '#10b981', '#14FFEC']}
            className="hover:-translate-y-1 transition-transform duration-300 h-full"
          >
            <div className="p-6 sm:p-7 space-y-4 h-full flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black text-zinc-400 dark:text-zinc-600">02</span>
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                    AI Revision & CV Portfolio
                  </h3>
                  <p className="mt-1.5 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Practice official mark-scheme aligned questions to raise your grades, while logging community volunteering for an admissions-ready resume.
                  </p>
                </div>
              </div>
            </div>
          </BorderGlow>

          {/* Step 3 */}
          <BorderGlow
            edgeSensitivity={30}
            glowColor="280 80 50"
            backgroundColor="#120F17"
            borderRadius={28}
            glowRadius={40}
            glowIntensity={1.2}
            coneSpread={25}
            animated={false}
            colors={['#9333ea', '#a855f7', '#c084fc']}
            className="hover:-translate-y-1 transition-transform duration-300 h-full"
          >
            <div className="p-6 sm:p-7 space-y-4 h-full flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black text-zinc-400 dark:text-zinc-600">03</span>
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 flex items-center justify-center">
                    <Award className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                    Mu'adala & Scholarships
                  </h3>
                  <p className="mt-1.5 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Follow the Ministry of Education certificate equivalency checklist and apply for AED 20,000 to AED 100,000 merit scholarships.
                  </p>
                </div>
              </div>
            </div>
          </BorderGlow>
        </div>
      </section>

      {/* 8. DEDICATED "100% FREE TO USE" CALLOUT BANNER */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-zinc-900 via-[#0a0a0c] to-black border border-zinc-200/90 dark:border-white/10 text-white text-center space-y-5 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-emerald-500/15 blur-3xl rounded-full pointer-events-none -z-10" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-blue-500/15 blur-3xl rounded-full pointer-events-none -z-10" />

          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Zero Cost • Free Forever Tier</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white max-w-2xl mx-auto">
            100% Free to Start. 100% Free to Use.
          </h2>

          <p className="text-sm sm:text-base text-zinc-300 max-w-xl mx-auto leading-relaxed font-normal">
            Join thousands of UAE high school students practicing past papers, tracking their MOE Mu'adala equivalency, and unlocking university scholarships—completely free with zero credit card required.
          </p>

          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href={isLoggedIn ? "/dashboard" : "/signup"}
              className="inline-block rounded-full group hover:scale-[1.02] active:scale-95 transition-transform duration-200"
            >
              <GlareHover
                width="auto"
                height="auto"
                borderRadius="9999px"
                glareColor="#14FFEC"
                glareOpacity={0.35}
                glareAngle={-45}
                glareSize={250}
                transitionDuration={650}
                className="px-8 py-3.5 rounded-full bg-white text-black hover:bg-zinc-100 border border-white font-extrabold text-xs sm:text-sm shadow-lg hover:shadow-md hover:shadow-[#14FFEC]/20 inline-flex items-center space-x-2 transition-all cursor-pointer"
              >
                <span className="relative z-10 text-black font-extrabold">
                  {isLoggedIn ? "Open Your Dashboard" : "Get Started Free"}
                </span>
                <ArrowRight className="w-4 h-4 relative z-10 text-black shrink-0" />
              </GlareHover>
            </Link>
            <Link
              href={isLoggedIn ? "/coach" : "/signup"}
              className="inline-block rounded-full group hover:scale-[1.02] active:scale-95 transition-transform duration-200"
            >
              <GlareHover
                width="auto"
                height="auto"
                borderRadius="9999px"
                glareColor="#ffffff"
                glareOpacity={0.3}
                glareAngle={-45}
                glareSize={250}
                transitionDuration={650}
                className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 inline-flex items-center space-x-2 transition-colors cursor-pointer"
              >
                <span className="relative z-10 text-white font-bold">
                  {isLoggedIn ? "Open AI Coach" : "Try AI Past Paper Coach"}
                </span>
              </GlareHover>
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-zinc-400 pt-3 border-t border-white/10 max-w-lg mx-auto">
            <span className="flex items-center space-x-1">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>No credit card required</span>
            </span>
            <span className="flex items-center space-x-1">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Instant 30-second sign up</span>
            </span>
            <span className="flex items-center space-x-1">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>All UAE curricula supported</span>
            </span>
          </div>
        </div>
      </section>

      {/* 9. PRICING PLANS SECTION (ID="pricing") */}
      <section id="pricing" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24 space-y-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-zinc-100/90 dark:bg-white/5 backdrop-blur-md border border-zinc-200/80 dark:border-white/10 text-xs font-semibold text-zinc-700 dark:text-zinc-300 shadow-xs">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Transparent, Student-First UAE Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-zinc-900 dark:text-white tracking-tight">
            Simple, Transparent Plans
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
            Start 100% free forever, or upgrade for unlimited AI past paper marking and personalized university matching.
          </p>

          {/* Monthly / Yearly Switch */}
          <div className="flex justify-center items-center pt-4">
            <div className="inline-flex items-center p-1.5 rounded-full bg-zinc-100/90 dark:bg-zinc-900/90 backdrop-blur-md border border-zinc-200/80 dark:border-white/10 shadow-inner">
              <button
                type="button"
                onClick={() => setIsYearly(false)}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                  !isYearly
                    ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                    : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setIsYearly(true)}
                className={`flex items-center space-x-1.5 px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                  isYearly
                    ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                    : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                }`}
              >
                <span>Yearly</span>
                <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                  Save 25%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* 2 Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch pt-2 max-w-5xl mx-auto">
          {/* CARD 1: Starter Plan (Free) */}
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
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-zinc-200/80 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-300/60 dark:border-white/5">
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
              <div className="relative mt-6 pt-5 border-t border-zinc-200/60 dark:border-white/5 space-y-3">
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  Included in Free:
                </p>

                <ul className="space-y-2.5 text-[11px] sm:text-xs text-zinc-600 dark:text-zinc-300 leading-normal">
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
                    <span>MOE Mu'adala certificate equivalency checklist</span>
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
                href={isLoggedIn ? "/dashboard" : "/signup"}
                className="w-full inline-block rounded-full group hover:scale-[1.02] active:scale-95 transition-transform duration-200"
              >
                <GlareHover
                  width="100%"
                  height="auto"
                  borderRadius="9999px"
                  glareColor="#14FFEC"
                  glareOpacity={0.35}
                  glareAngle={-45}
                  glareSize={250}
                  transitionDuration={650}
                  className="w-full py-3 px-6 rounded-full bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-100 border border-black dark:border-white font-bold text-xs sm:text-sm shadow-md inline-flex items-center justify-center space-x-2 transition-colors cursor-pointer"
                >
                  <span className="relative z-10 text-white dark:text-black font-bold">
                    {isLoggedIn ? "Open Dashboard" : "Start Free Forever"}
                  </span>
                  <ArrowRight className="w-4 h-4 relative z-10 text-white dark:text-black shrink-0" />
                </GlareHover>
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
                    <span><strong>Unlimited AI Past Paper grading</strong> with step marks breakdown</span>
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
                    <span><strong>MOE Mu'adala Document Audit</strong> & Equivalency check</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Multi-Format CV Exports</strong> (Word .docx, PDF, ATS .txt)</span>
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
              <Link
                href={isLoggedIn ? "/pricing" : "/signup"}
                className="w-full inline-block rounded-full group hover:scale-[1.02] active:scale-95 transition-transform duration-200"
              >
                <GlareHover
                  width="100%"
                  height="auto"
                  borderRadius="9999px"
                  glareColor="#14FFEC"
                  glareOpacity={0.35}
                  glareAngle={-45}
                  glareSize={250}
                  transitionDuration={650}
                  className="w-full py-3 px-6 rounded-full bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-100 border border-black dark:border-white font-bold text-xs sm:text-sm shadow-xl inline-flex items-center justify-center space-x-2 transition-colors cursor-pointer"
                >
                  <span className="relative z-10 text-white dark:text-black font-bold">Start with Pro Scholar</span>
                  <ArrowRight className="w-4 h-4 relative z-10 text-white dark:text-black shrink-0" />
                </GlareHover>
              </Link>
              <p className="text-[11px] text-center text-zinc-500 dark:text-zinc-400 mt-2.5 font-medium">
                14-day money-back guarantee • No questions asked
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. WHY UAE STUDENTS & FAMILIES CHOOSE MASARUAE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-emerald-400">
            Why Masar UAE
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-zinc-900 dark:text-white tracking-tight">
            Why UAE Students & Families Choose MasarUAE
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
            Built specifically around UAE education benchmarks, local university entrance exams, and Ministry of Education equivalency decrees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1 */}
          <BorderGlow
            edgeSensitivity={30}
            glowColor="215 90 55"
            backgroundColor="#120F17"
            borderRadius={28}
            glowRadius={40}
            glowIntensity={1.2}
            coneSpread={25}
            animated={false}
            colors={['#2563eb', '#06b6d4', '#3b82f6']}
            className="hover:-translate-y-1 transition-transform duration-300 h-full"
          >
            <div className="p-6 sm:p-7 space-y-3 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white">Instant Mark Scheme Audits</h3>
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 flex items-center justify-center shrink-0">
                    <Zap className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Receive exact Cambridge, IB, and Edexcel criteria feedback with marks lost, working corrections, and model examiner answers.
                </p>
              </div>
            </div>
          </BorderGlow>

          {/* Card 2 */}
          <BorderGlow
            edgeSensitivity={30}
            glowColor="160 90 45"
            backgroundColor="#120F17"
            borderRadius={28}
            glowRadius={40}
            glowIntensity={1.2}
            coneSpread={25}
            animated={false}
            colors={['#059669', '#10b981', '#14FFEC']}
            className="hover:-translate-y-1 transition-transform duration-300 h-full"
          >
            <div className="p-6 sm:p-7 space-y-3 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white">100% MOE Mu&apos;adala Aligned</h3>
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Ensure your secondary school credentials satisfy the UAE Ministry of Education without last-minute document surprises.
                </p>
              </div>
            </div>
          </BorderGlow>

          {/* Card 3 */}
          <BorderGlow
            edgeSensitivity={30}
            glowColor="280 80 50"
            backgroundColor="#120F17"
            borderRadius={28}
            glowRadius={40}
            glowIntensity={1.2}
            coneSpread={25}
            animated={false}
            colors={['#9333ea', '#a855f7', '#c084fc']}
            className="hover:-translate-y-1 transition-transform duration-300 h-full"
          >
            <div className="p-6 sm:p-7 space-y-3 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white">70+ UAE University Matcher</h3>
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Direct access to minimum GPA cutoffs, tuition fees, and AED 50,000+ merit scholarship deadlines across all 7 emirates.
                </p>
              </div>
            </div>
          </BorderGlow>
        </div>
      </section>

      {/* 11. EXPANDABLE ACCORDION FAQ SECTION (ID="faq") */}
      <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-emerald-400">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-zinc-900 dark:text-white tracking-tight">
            Got Questions? We've Got Answers.
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
            Everything you need to know about Masar UAE, curriculum compatibility, equivalency, and scholarships.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqList.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={`faq-${idx}`}
                className="rounded-2xl border border-zinc-200/90 dark:border-white/10 bg-zinc-50/70 dark:bg-[#0c0c0e] overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-sm sm:text-base text-zinc-900 dark:text-white hover:text-blue-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="pr-4">{faq.question}</span>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 transition-transform duration-200 ${isOpen ? "rotate-180 text-emerald-500" : "text-zinc-400"}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-200/50 dark:border-white/5">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
