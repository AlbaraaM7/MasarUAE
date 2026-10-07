"use client";

import { useState } from "react";
import Image from "next/image";
import { UAE_UNIVERSITIES, SCHOLARSHIPS_LIST, University } from "@/data/universities";
import { useToast } from "@/components/ToastProvider";
import { 
  GraduationCap, 
  Search, 
  Filter, 
  MapPin, 
  Coins, 
  Award, 
  CheckCircle2, 
  ExternalLink, 
  Info,
  ChevronLeft,
  ChevronRight,
  Layers,
  X,
  ArrowRight
} from "lucide-react";
import GlideSelect from "@/components/reactbits/GlideSelect";

const EMIRATE_OPTIONS = [
  { value: "All", label: "All Emirates", tag: "UAE Wide" },
  { value: "Dubai", label: "Dubai", tag: "DXB" },
  { value: "Abu Dhabi", label: "Abu Dhabi", tag: "AUH" },
  { value: "Sharjah", label: "Sharjah", tag: "SHJ" },
  { value: "Ajman", label: "Ajman", tag: "AJM" },
  { value: "Ras Al Khaimah", label: "Ras Al Khaimah", tag: "RAK" },
  { value: "Fujairah", label: "Fujairah", tag: "FUJ" },
  { value: "Umm Al Quwain", label: "Umm Al Quwain", tag: "UAQ" },
  { value: "Al Ain", label: "Al Ain", tag: "AAN" },
];

const CURRICULUM_OPTIONS = [
  { value: "british", label: "British (IGCSE/A-Level)", tag: "UK System" },
  { value: "ib", label: "IB Diploma Programme", tag: "IB DP" },
  { value: "cbse", label: "CBSE Board India", tag: "Grade 12" },
  { value: "american", label: "American High School", tag: "GPA / SAT" },
];

export default function UniversitiesPage() {
  const { showToast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmirate, setSelectedEmirate] = useState("All");
  const [selectedCurriculum, setSelectedCurriculum] = useState<"british" | "ib" | "cbse" | "american">("british");
  const [maxBudget, setMaxBudget] = useState<number>(150000);
  const [activeTab, setActiveTab] = useState<"universities" | "scholarships">("universities");
  // Active photo index per university card
  const [activePhotoIdx, setActivePhotoIdx] = useState<Record<string, number>>({});
  // Selected university for Details modal pop up
  const [selectedUniForModal, setSelectedUniForModal] = useState<University | null>(null);
  const [modalCurriculum, setModalCurriculum] = useState<"british" | "ib" | "cbse" | "american">("british");

  const openUniModal = (uni: University) => {
    setSelectedUniForModal(uni);
    setModalCurriculum(selectedCurriculum);
  };

  const handleApply = (uni: University) => {
    showToast({
      title: "Application in progress...",
      description: `Preparing your student dossier & grade portfolio for ${uni.name}`,
      fuseColor: "#14FFEC",
      duration: 4000,
      icon: <GraduationCap className="w-4 h-4 text-[#14FFEC]" />
    });

    setTimeout(() => {
      showToast({
        title: "Redirecting to Admissions Portal",
        description: `Connecting you to the official ${uni.acronym} portal. Check requirements before submitting.`,
        fuseColor: "#10b981",
        duration: 5000,
        icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />
      });
      window.open(uni.websiteUrl, "_blank");
    }, 1200);
  };

  const handleApplyScholarship = (sch: (typeof SCHOLARSHIPS_LIST)[0]) => {
    showToast({
      title: "Scholarship application in progress...",
      description: `Verifying eligibility criteria for ${sch.name} (${sch.provider})`,
      fuseColor: "#f59e0b",
      duration: 4000,
      icon: <Award className="w-4 h-4 text-amber-400" />
    });

    setTimeout(() => {
      showToast({
        title: "Eligibility Verified",
        description: `Directing to ${sch.provider} scholarship portal.`,
        fuseColor: "#10b981",
        duration: 5000,
        icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />
      });
      window.open(sch.url, "_blank");
    }, 1200);
  };

  // Filtering
  const filteredUniversities = UAE_UNIVERSITIES.filter((uni) => {
    const matchesSearch =
      uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      uni.acronym.toLowerCase().includes(searchQuery.toLowerCase()) ||
      uni.popularMajors.some((m) => m.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesEmirate = selectedEmirate === "All" || uni.emirate === selectedEmirate;
    const matchesBudget = uni.annualTuitionAED.min <= maxBudget;

    return matchesSearch && matchesEmirate && matchesBudget;
  });

  const handleNextPhoto = (uniId: string, totalPhotos: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setActivePhotoIdx((prev) => ({
      ...prev,
      [uniId]: ((prev[uniId] || 0) + 1) % totalPhotos,
    }));
  };

  const handlePrevPhoto = (uniId: string, totalPhotos: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setActivePhotoIdx((prev) => ({
      ...prev,
      [uniId]: ((prev[uniId] || 0) - 1 + totalPhotos) % totalPhotos,
    }));
  };

  const budgetPresets = [
    { label: "Under 60k", val: 60000 },
    { label: "Under 85k", val: 85000 },
    { label: "Under 110k", val: 110000 },
    { label: "Under 150k", val: 150000 },
    { label: "All Budgets", val: 230000 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 dark:border-zinc-800 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            UAE University & Scholarship Matcher
          </h1>
          <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1">
            Compare accredited UAE campuses, filter by your school board requirements, and discover available scholarships.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center space-x-1 p-1 bg-slate-200/80 dark:bg-zinc-900 rounded-full max-w-fit">
          <button
            onClick={() => setActiveTab("universities")}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              activeTab === "universities"
                ? "bg-white dark:bg-zinc-800 text-slate-900 dark:text-white shadow-xs"
                : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Universities ({filteredUniversities.length})
          </button>
          <button
            onClick={() => setActiveTab("scholarships")}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              activeTab === "scholarships"
                ? "bg-white dark:bg-zinc-800 text-amber-600 dark:text-amber-400 shadow-xs"
                : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            UAE Scholarships ({SCHOLARSHIPS_LIST.length})
          </button>
        </div>
      </div>

      {activeTab === "scholarships" ? (
        /* Scholarships Directory View */
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 text-xs text-amber-950 dark:text-amber-200 flex items-start space-x-3">
            <Info className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-sm text-amber-950 dark:text-amber-100 mb-0.5">Government & Institutional Sponsorships</p>
              <p className="leading-relaxed text-amber-900/90 dark:text-amber-200/90">
                Many UAE scholarships offer 50% to 100% full-ride funding for students who excel in academics, sports, or STEM competitions. Apply at least 4 to 6 months before the academic intake.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SCHOLARSHIPS_LIST.map((sch, i) => (
              <div key={i} className="bg-white dark:bg-zinc-950 p-6 rounded-3xl border border-slate-200/90 dark:border-zinc-800/90 shadow-sm space-y-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/60 px-2.5 py-0.5 rounded-full">
                      {sch.provider}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">{sch.name}</h3>
                  </div>
                  <Award className="w-6 h-6 text-amber-500 shrink-0" />
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-slate-500 dark:text-zinc-400 font-medium">Eligibility Criteria:</span>
                    <p className="text-slate-800 dark:text-zinc-200 font-medium mt-0.5">{sch.eligibility}</p>
                  </div>

                  <div>
                    <span className="text-slate-500 dark:text-zinc-400 font-medium">Coverage & Benefits:</span>
                    <p className="text-emerald-700 dark:text-emerald-400 font-bold mt-0.5">{sch.benefits}</p>
                  </div>

                  <div>
                    <span className="text-slate-500 dark:text-zinc-400 font-medium">Application Window:</span>
                    <p className="text-slate-700 dark:text-zinc-300 mt-0.5">{sch.deadline}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 dark:text-zinc-500">
                    UAE Ministry & Uni Partner
                  </span>
                  <button
                    type="button"
                    onClick={() => handleApplyScholarship(sch)}
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-black shadow-xs transition-all hover:scale-[1.02] cursor-pointer"
                  >
                    <span>Apply for Scholarship</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Universities Directory View */
        <div className="space-y-8">
          {/* Filter Bar with Intuitively Integrated Budget Slider - Scrolls naturally with content */}
          <div className="bg-white dark:bg-zinc-950 p-5 sm:p-6 rounded-3xl border border-zinc-200/90 dark:border-white/10 shadow-sm space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 sm:gap-4">
              {/* Search */}
              <div className="relative md:col-span-2">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search by university name, acronym (AUS, NYUAD...), or major..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900 text-xs sm:text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:border-blue-600 dark:focus:border-emerald-400 focus:outline-hidden font-sans"
                />
              </div>

              {/* Emirate filter */}
              <div className="w-full">
                <GlideSelect
                  options={EMIRATE_OPTIONS}
                  value={selectedEmirate}
                  onChange={(val) => setSelectedEmirate(val)}
                  ariaLabel="Filter by Emirate"
                  showTags
                  size="lg"
                  radius={14}
                  menuWidth={240}
                  placement="bottom"
                  align="left"
                  popDuration={180}
                  glideDuration={220}
                  rememberPosition
                  className="w-full"
                />
              </div>

              {/* Curriculum Mode */}
              <div className="w-full">
                <GlideSelect
                  options={CURRICULUM_OPTIONS}
                  value={selectedCurriculum}
                  onChange={(val) => setSelectedCurriculum(val as "british" | "ib" | "cbse" | "american")}
                  ariaLabel="Filter by Curriculum Requirements"
                  showTags
                  size="lg"
                  radius={14}
                  menuWidth={280}
                  placement="bottom"
                  align="right"
                  popDuration={180}
                  glideDuration={220}
                  rememberPosition
                  className="w-full"
                />
              </div>
            </div>

            {/* Intuitive Tuition Budget Slider Module (Geist font) */}
            <div className="pt-3 border-t border-zinc-100 dark:border-white/5 font-sans">
              <div className="bg-zinc-50/90 dark:bg-zinc-900/60 p-4 rounded-2xl border border-zinc-200/80 dark:border-white/10 space-y-3 font-sans">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-sans">
                  <div className="flex items-center space-x-2.5">
                    <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      <Coins className="w-4 h-4" />
                    </span>
                    <div>
                      <span className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white block font-sans">
                        Maximum Annual Tuition Budget
                      </span>
                      <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-sans">
                        Move slider or pick a preset to filter universities by your fee limit
                      </span>
                    </div>
                  </div>

                  {/* Prominent Money Display with Geist font */}
                  <div className="flex items-center space-x-2 self-start sm:self-auto bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/25 px-3 py-1.5 rounded-full font-sans">
                    <span className="text-[11px] font-medium text-emerald-800 dark:text-emerald-300 font-sans">Budget Limit:</span>
                    <span className="text-xs font-bold text-emerald-800 dark:text-[#14FFEC] font-sans">
                      AED {maxBudget.toLocaleString()} / yr
                    </span>
                  </div>
                </div>

                {/* Slider with Geist font Min, Current, and Max Labels */}
                <div className="space-y-1.5 pt-1 font-sans">
                  <input
                    type="range"
                    min="40000"
                    max="230000"
                    step="5000"
                    value={maxBudget}
                    onChange={(e) => setMaxBudget(Number(e.target.value))}
                    className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500 dark:accent-[#14FFEC]"
                  />
                  <div className="flex justify-between text-xs font-sans text-zinc-500 dark:text-zinc-400">
                    <span className="font-sans">Min: AED 40,000</span>
                    <span className="text-emerald-600 dark:text-[#14FFEC] font-bold font-sans">
                      Current: AED {maxBudget.toLocaleString()} / year
                    </span>
                    <span className="font-sans">Max: AED 230,000+</span>
                  </div>
                </div>

                {/* Quick Budget Preset Buttons with Geist font */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1 font-sans">
                  <span className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold mr-1 font-sans">
                    Quick Presets:
                  </span>
                  {budgetPresets.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => setMaxBudget(preset.val)}
                      className={`text-xs px-3 py-1 rounded-full font-bold font-sans transition-all cursor-pointer ${
                        maxBudget === preset.val
                          ? "bg-emerald-600 dark:bg-emerald-500 text-white dark:text-zinc-950 shadow-xs scale-105"
                          : "bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-white/10 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Universities List Grid with Campus Images & Scrolling Tours */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredUniversities.map((uni) => {
              const reqText = uni.requirements[selectedCurriculum];
              const gallery = uni.campusGallery || [uni.campusImage];
              const activeIdx = activePhotoIdx[uni.id] || 0;
              const currentImage = gallery[activeIdx] || uni.campusImage;

              return (
                <div
                  key={uni.id}
                  className="bg-white dark:bg-zinc-950 rounded-3xl border border-slate-200/90 dark:border-zinc-800/90 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Campus Image Header with Interactive Gallery Navigation */}
                    <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-950">
                      <img
                        src={currentImage}
                        alt={`${uni.name} campus view`}
                        onError={(e) => {
                          e.currentTarget.src = "/images/AUS/campus.jpg";
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      
                      {/* Gradient Overlay for Text Legibility */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                        <div className="flex items-center space-x-1.5">
                          <span className="text-xs font-black text-amber-300 bg-black/60 backdrop-blur-md border border-amber-400/40 px-2.5 py-0.5 rounded-full">
                            {uni.acronym}
                          </span>
                          <span className="text-[11px] text-white/90 bg-black/50 backdrop-blur-md px-2.5 py-0.5 rounded-full font-medium flex items-center space-x-1">
                            <MapPin className="w-3 h-3 text-emerald-400" />
                            <span>{uni.campusLocation}</span>
                          </span>
                        </div>

                        <span className="text-[10px] font-semibold text-white/90 bg-black/50 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/20">
                          {uni.type}
                        </span>
                      </div>

                      {/* Photo Carousel Nav Arrows (Only if multiple photos) */}
                      {gallery.length > 1 && (
                        <div className="absolute inset-y-0 left-2 right-2 flex items-center justify-between pointer-events-none">
                          <button
                            type="button"
                            onClick={(e) => handlePrevPhoto(uni.id, gallery.length, e)}
                            className="pointer-events-auto p-1.5 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-sm transition-all"
                            aria-label="Previous campus photo"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => handleNextPhoto(uni.id, gallery.length, e)}
                            className="pointer-events-auto p-1.5 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-sm transition-all"
                            aria-label="Next campus photo"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      )}

                      {/* Bottom Banner on Image: University Name & Photo Dots */}
                      <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                        <div>
                          <h3 className="text-lg font-black text-white leading-tight drop-shadow-sm">
                            {uni.name}
                          </h3>
                        </div>

                        {/* Photo indicator dots */}
                        {gallery.length > 1 && (
                          <div className="flex space-x-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">
                            {gallery.map((_, dotIdx) => (
                              <button
                                key={dotIdx}
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActivePhotoIdx((prev) => ({ ...prev, [uni.id]: dotIdx }));
                                }}
                                className={`w-1.5 h-1.5 rounded-full transition-all ${
                                  activeIdx === dotIdx ? "bg-amber-400 w-3" : "bg-white/50"
                                }`}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Card Body Content - Concise wording */}
                    <div className="p-5 space-y-3.5">
                      {/* Quick Stats: Tuition & Acceptance */}
                      <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-100 dark:border-zinc-800/60 text-xs">
                        <div>
                          <span className="text-slate-500 dark:text-zinc-400 text-[11px] block">Annual Tuition</span>
                          <p className="font-extrabold text-slate-900 dark:text-white mt-0.5">
                            AED {uni.annualTuitionAED.min.toLocaleString()} – {uni.annualTuitionAED.max.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <span className="text-slate-500 dark:text-zinc-400 text-[11px] block">Acceptance Rate</span>
                          <p className="font-extrabold text-slate-900 dark:text-white mt-0.5">{uni.acceptanceRate}</p>
                        </div>
                      </div>

                      {/* Brief Key Highlight */}
                      {uni.highlights && uni.highlights.length > 0 && (
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-2">
                          {uni.highlights[0]}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Card Footer with Details Button */}
                  <div className="p-5 pt-0">
                    <div className="pt-3 border-t border-slate-100 dark:border-zinc-800/80 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-slate-400 dark:text-zinc-500 truncate max-w-[170px] sm:max-w-[210px]" title={uni.muadalaNote}>
                        {uni.muadalaNote}
                      </span>
                      <button
                        type="button"
                        onClick={() => openUniModal(uni)}
                        className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-100 dark:text-zinc-950 text-xs font-bold shadow-xs transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
                      >
                        <span>Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* University Details Modal Pop Up */}
      {selectedUniForModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
          onClick={() => setSelectedUniForModal(null)}
        >
          <div 
            className="bg-white dark:bg-zinc-950 rounded-3xl border border-zinc-200 dark:border-white/10 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative my-8 p-6 sm:p-8 space-y-6 font-sans text-zinc-900 dark:text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header: Uni Name, Badges & Close Button */}
            <div className="flex items-start justify-between gap-4 border-b border-zinc-200/80 dark:border-zinc-800 pb-5">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-black text-amber-500 dark:text-amber-300 bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
                    {selectedUniForModal.acronym}
                  </span>
                  <span className="text-xs text-zinc-600 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 px-2.5 py-0.5 rounded-full font-medium">
                    {selectedUniForModal.campusLocation}, {selectedUniForModal.emirate}
                  </span>
                  <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 px-2.5 py-0.5 rounded-full border border-zinc-200 dark:border-white/10">
                    {selectedUniForModal.type}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white tracking-tight">
                  {selectedUniForModal.name}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedUniForModal(null)}
                className="p-2 rounded-xl text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 transition-colors shrink-0 cursor-pointer"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 text-xs">
              <div>
                <span className="text-zinc-500 dark:text-zinc-400 text-[11px] block">Annual Tuition</span>
                <p className="font-extrabold text-zinc-900 dark:text-white text-sm mt-0.5">
                  AED {selectedUniForModal.annualTuitionAED.min.toLocaleString()} – {selectedUniForModal.annualTuitionAED.max.toLocaleString()}
                </p>
              </div>
              <div>
                <span className="text-zinc-500 dark:text-zinc-400 text-[11px] block">Acceptance Rate</span>
                <p className="font-extrabold text-zinc-900 dark:text-white text-sm mt-0.5">{selectedUniForModal.acceptanceRate}</p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="text-zinc-500 dark:text-zinc-400 text-[11px] block">MOE Equivalency</span>
                <p className="font-semibold text-zinc-700 dark:text-zinc-300 text-xs mt-0.5 truncate" title={selectedUniForModal.muadalaNote}>
                  {selectedUniForModal.muadalaNote}
                </p>
              </div>
            </div>

            {/* Small Summary */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Summary & Highlights
              </h3>
              <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">
                {selectedUniForModal.name} is a premier {selectedUniForModal.type.toLowerCase()} university located in {selectedUniForModal.campusLocation}, {selectedUniForModal.emirate}, offering accredited undergraduate degree programs.
              </p>
              {selectedUniForModal.highlights && selectedUniForModal.highlights.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {selectedUniForModal.highlights.map((h, i) => (
                    <span 
                      key={i} 
                      className="text-xs bg-emerald-500/10 text-emerald-800 dark:text-[#14FFEC] border border-emerald-500/25 px-3 py-1 rounded-xl font-medium"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Admission Requirements */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-[#14FFEC]">
                Admission Requirements
              </h3>

              <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/40 space-y-3">
                {/* Curriculum switch buttons */}
                <div className="flex flex-wrap gap-1.5 pb-2 border-b border-emerald-200/60 dark:border-emerald-900/40">
                  {(["british", "ib", "cbse", "american"] as const).map((curr) => (
                    <button
                      key={curr}
                      type="button"
                      onClick={() => setModalCurriculum(curr)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        modalCurriculum === curr
                          ? "bg-emerald-600 dark:bg-[#14FFEC] text-white dark:text-zinc-950 font-black shadow-xs"
                          : "bg-white/80 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                      }`}
                    >
                      {curr.toUpperCase()}
                    </button>
                  ))}
                </div>

                <div>
                  <p className="text-sm font-bold text-zinc-900 dark:text-white leading-relaxed">
                    {selectedUniForModal.requirements[modalCurriculum]}
                  </p>
                  <div className="flex flex-wrap gap-3 text-xs text-zinc-600 dark:text-zinc-400 mt-2.5 pt-2 border-t border-emerald-200/50 dark:border-emerald-900/40">
                    <span>
                      <strong className="text-zinc-900 dark:text-zinc-200">English Proficiency:</strong> IELTS {selectedUniForModal.requirements.ielts}
                    </span>
                    <span>•</span>
                    <span>
                      <strong className="text-zinc-900 dark:text-zinc-200">EmSAT English:</strong> {selectedUniForModal.requirements.emsatEnglish}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Available Scholarships */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                Available Scholarships
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedUniForModal.scholarships.map((sch, i) => (
                  <div 
                    key={i} 
                    className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 space-y-1"
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{sch.title}</span>
                      <span className="text-[10px] font-black text-amber-800 dark:text-amber-300 bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded-full shrink-0">
                        {sch.coverage}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                      {sch.criteria}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Section: Popular Programs on Left (2 rows) & Apply Button on Right */}
            <div className="pt-5 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-2 flex-1 min-w-0 pr-0 sm:pr-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Popular Programs
                </h3>

                <div className="flex flex-wrap gap-1.5">
                  {selectedUniForModal.popularMajors.map((m, i) => (
                    <span 
                      key={i} 
                      className="text-xs bg-zinc-100 dark:bg-zinc-800/80 text-zinc-800 dark:text-zinc-200 px-3 py-1 rounded-xl font-medium border border-zinc-200/70 dark:border-white/5"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              <div className="shrink-0 self-end sm:self-center">
                <button
                  type="button"
                  onClick={() => {
                    const uni = selectedUniForModal;
                    setSelectedUniForModal(null);
                    handleApply(uni);
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3 rounded-2xl bg-[#14FFEC] hover:bg-[#14FFEC]/90 text-zinc-950 font-black text-sm shadow-md shadow-[#14FFEC]/20 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
