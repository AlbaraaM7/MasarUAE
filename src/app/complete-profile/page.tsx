"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  GraduationCap, 
  School, 
  Phone, 
  Award, 
  MapPin, 
  BookOpen, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  User, 
  Mail,
  ShieldCheck
} from "lucide-react";
import { getStudentProfile, saveStudentProfile, StudentProfile } from "@/lib/studentProfile";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ToastProvider";

const UAE_EMIRATES = [
  "Dubai",
  "Abu Dhabi",
  "Sharjah",
  "Ajman",
  "Ras Al Khaimah",
  "Fujairah",
  "Umm Al Quwain",
];

const CURRICULUM_OPTIONS = [
  "British Curriculum (IGCSE / A-Level)",
  "American Curriculum (High School Diploma / AP)",
  "International Baccalaureate (IB Diploma)",
  "UAE Ministry of Education (MOE / General & Advanced)",
  "CBSE / Indian Board",
  "SABIS Curriculum",
  "Other International Curriculum",
];

export default function CompleteProfilePage() {
  const router = useRouter();
  const { showToast } = useToast();

  const [profile, setProfile] = useState<StudentProfile>(getStudentProfile());
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [school, setSchool] = useState("");
  const [curriculum, setCurriculum] = useState(CURRICULUM_OPTIONS[0]);
  const [grades, setGrades] = useState("");
  const [gpa, setGpa] = useState("3.8");
  const [location, setLocation] = useState("Dubai");
  const [targetMajor, setTargetMajor] = useState("Computer Science & AI");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const current = getStudentProfile();
    setProfile(current);
    setFirstName(current.firstName || "");
    setLastName(current.lastName || "");
    setEmail(current.email || "");
    setPhone(current.phone || "+971 50 ");
    setSchool(current.school && current.school !== "Dubai College" ? current.school : "");
    if (current.curriculum) setCurriculum(current.curriculum);
    if (current.grades && !current.grades.includes("A*AA")) setGrades(current.grades);
    if (current.gpa) setGpa(current.gpa);
    if (current.location) setLocation(current.location);
    if (current.targetMajor) setTargetMajor(current.targetMajor);

    // Also try to read current Supabase user if available
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) {
        const meta = data.user.user_metadata || {};
        if (meta.first_name && !current.firstName) setFirstName(meta.first_name);
        if (meta.last_name && !current.lastName) setLastName(meta.last_name);
        if (data.user.email && !current.email) setEmail(data.user.email);
      }
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    showToast({
      title: "Saving Academic Profile",
      description: "Personalizing your UAE university pathway...",
      fuseColor: "#10b981",
      duration: 2500,
    });

    try {
      const cleanFirstName = firstName.trim() || profile.firstName || "Student";
      const cleanLastName = lastName.trim() || profile.lastName || "";
      const cleanSchool = school.trim() || "UAE High School";
      const cleanGrades = grades.trim() || "Year 12 Predicted";
      const cleanGpa = gpa.trim() || "3.8";
      const cleanPhone = phone.trim() || "+971 50 123 4567";
      const cleanMajor = targetMajor.trim() || "Higher Education";

      const updatedProfile: StudentProfile = {
        ...profile,
        firstName: cleanFirstName,
        lastName: cleanLastName,
        email: email || profile.email,
        phone: cleanPhone,
        school: cleanSchool,
        curriculum,
        grades: cleanGrades,
        gpa: cleanGpa,
        location,
        targetMajor: cleanMajor,
      };

      // Save locally
      saveStudentProfile(updatedProfile);

      // Sync with Supabase profiles table
      try {
        const { data: userData } = await supabase.auth.getUser();
        if (userData?.user) {
          await supabase.from("profiles").upsert({
            id: userData.user.id,
            first_name: cleanFirstName,
            last_name: cleanLastName,
            full_name: `${cleanFirstName} ${cleanLastName}`.trim(),
            email: email || userData.user.email,
            phone: cleanPhone,
            school: cleanSchool,
            curriculum,
            grade_level: cleanGrades,
            location: `${location}, UAE`,
            target_major: cleanMajor,
          });
        }
      } catch (dbErr) {
        console.warn("Could not sync profile to database (non-fatal):", dbErr);
      }

      showToast({
        title: "Profile Completed!",
        description: `Welcome aboard, ${cleanFirstName}! Launching your student dashboard...`,
        fuseColor: "#10b981",
        duration: 3000,
        icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />,
      });

      router.push("/dashboard");
    } catch (err: any) {
      console.error("Profile save error:", err);
      showToast({
        title: "Notice",
        description: "Profile updated locally. Redirecting to dashboard...",
        fuseColor: "#f59e0b",
        duration: 2500,
      });
      router.push("/dashboard");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSkip = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black py-10 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center font-sans">
      <div className="w-full max-w-2xl space-y-6">
        {/* Brand Header & Step Progress */}
        <div className="text-center space-y-3">
          <Link href="/" className="inline-flex items-center space-x-2 text-zinc-900 dark:text-white">
            <span className="text-2xl font-black tracking-tight">مسار Masar</span>
            <span className="text-xs font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              UAE
            </span>
          </Link>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center space-x-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px]">
              ✓
            </span>
            <span className="text-zinc-400">Account Created</span>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 text-white text-[10px]">
              2
            </span>
            <span className="text-blue-600 dark:text-blue-400 font-extrabold">Complete Academic Profile</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
            Welcome, {firstName || "Student"}!
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-md mx-auto leading-relaxed">
            Tell us about your school and grades. We use this to calculate your UAE university eligibility and automatically generate your certified CV.
          </p>
        </div>

        {/* Card Form */}
        <div className="bg-white dark:bg-zinc-950 p-6 sm:p-8 rounded-3xl border border-zinc-200/90 dark:border-white/10 shadow-xl space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* User Identity Confirmation (Readonly / Prefilled) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/60 dark:border-white/5">
              <div>
                <label className="block text-[11px] font-bold text-zinc-500 dark:text-zinc-400 mb-1 flex items-center space-x-1.5">
                  <User className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Full Name</span>
                </label>
                <div className="text-xs sm:text-sm font-bold text-zinc-800 dark:text-zinc-200">
                  {firstName} {lastName}
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-zinc-500 dark:text-zinc-400 mb-1 flex items-center space-x-1.5">
                  <Mail className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Registered Email</span>
                </label>
                <div className="text-xs sm:text-sm font-mono text-zinc-800 dark:text-zinc-200 truncate">
                  {email || "student@school.ae"}
                </div>
              </div>
            </div>

            {/* School / Institution & Phone Number */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1.5 flex items-center space-x-1.5">
                  <School className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>School / Institution *</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dubai College, Gems Wellington"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  className="w-full rounded-2xl bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-white/10 px-4 py-3 text-xs sm:text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-hidden focus:border-blue-600 dark:focus:border-emerald-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1.5 flex items-center space-x-1.5">
                  <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Phone / WhatsApp *</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+971 50 123 4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-2xl bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-white/10 px-4 py-3 text-xs sm:text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-hidden focus:border-blue-600 dark:focus:border-emerald-400 transition-colors font-mono"
                />
              </div>
            </div>

            {/* Curriculum Selection */}
            <div>
              <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1.5 flex items-center space-x-1.5">
                <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Academic Curriculum *</span>
              </label>
              <select
                value={curriculum}
                onChange={(e) => setCurriculum(e.target.value)}
                className="w-full rounded-2xl bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-white/10 px-4 py-3 text-xs sm:text-sm text-zinc-900 dark:text-white focus:outline-hidden focus:border-blue-600 dark:focus:border-emerald-400 transition-colors cursor-pointer"
              >
                {CURRICULUM_OPTIONS.map((c) => (
                  <option key={c} value={c} className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Grades & GPA */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1.5 flex items-center space-x-1.5">
                  <GraduationCap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Current / Predicted Grades *</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. A*AA, 95%+, IB 38, or 4 APs"
                  value={grades}
                  onChange={(e) => setGrades(e.target.value)}
                  className="w-full rounded-2xl bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-white/10 px-4 py-3 text-xs sm:text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-hidden focus:border-blue-600 dark:focus:border-emerald-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1.5 flex items-center space-x-1.5">
                  <Award className="w-4 h-4 text-amber-500" />
                  <span>Cumulative GPA (out of 4.0) *</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 3.9"
                  value={gpa}
                  onChange={(e) => setGpa(e.target.value)}
                  className="w-full rounded-2xl bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-white/10 px-4 py-3 text-xs sm:text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-hidden focus:border-blue-600 dark:focus:border-emerald-400 transition-colors"
                />
              </div>
            </div>

            {/* Emirate Location & Target Major */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1.5 flex items-center space-x-1.5">
                  <MapPin className="w-4 h-4 text-rose-500" />
                  <span>Emirate / City in UAE *</span>
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full rounded-2xl bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-white/10 px-4 py-3 text-xs sm:text-sm text-zinc-900 dark:text-white focus:outline-hidden focus:border-blue-600 dark:focus:border-emerald-400 transition-colors cursor-pointer"
                >
                  {UAE_EMIRATES.map((emirate) => (
                    <option key={emirate} value={emirate} className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">
                      {emirate}, UAE
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1.5 flex items-center space-x-1.5">
                  <Sparkles className="w-4 h-4 text-purple-500" />
                  <span>Target Major / Career Goal *</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Computer Science, Medicine, Business"
                  value={targetMajor}
                  onChange={(e) => setTargetMajor(e.target.value)}
                  className="w-full rounded-2xl bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-white/10 px-4 py-3 text-xs sm:text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-hidden focus:border-blue-600 dark:focus:border-emerald-400 transition-colors"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 space-y-3">
              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center space-x-2 py-3.5 px-6 rounded-2xl text-xs sm:text-sm font-black text-white bg-blue-600 hover:bg-blue-700 dark:bg-emerald-500 dark:hover:bg-emerald-400 dark:text-zinc-950 shadow-lg shadow-blue-600/20 dark:shadow-emerald-500/20 hover:scale-[1.01] active:scale-98 transition-all cursor-pointer disabled:opacity-50"
              >
                <span>{submitting ? "Saving Profile..." : "Complete Profile & Launch Dashboard"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={handleSkip}
                  className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 font-semibold transition-colors cursor-pointer"
                >
                  Skip for now, I&apos;ll complete it later →
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Security badge */}
        <div className="flex items-center justify-center space-x-2 text-zinc-400 dark:text-zinc-500 text-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Encrypted UAE Student Data Security Protocol</span>
        </div>
      </div>
    </div>
  );
}
