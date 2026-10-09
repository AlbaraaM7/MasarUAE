"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  GraduationCap, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck
} from "lucide-react";
import { getStudentProfile, saveStudentProfile, StudentProfile } from "@/lib/studentProfile";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ToastProvider";
import TechText from "@/components/reactbits/TechText";
import GlideSelect, { GlideSelectOption } from "@/components/reactbits/GlideSelect";

const EMIRATE_OPTIONS: GlideSelectOption[] = [
  { value: "Dubai", label: "Dubai", tag: "DXB" },
  { value: "Abu Dhabi", label: "Abu Dhabi", tag: "AUH" },
  { value: "Sharjah", label: "Sharjah", tag: "SHJ" },
  { value: "Ajman", label: "Ajman", tag: "AJM" },
  { value: "Ras Al Khaimah", label: "Ras Al Khaimah", tag: "RAK" },
  { value: "Fujairah", label: "Fujairah", tag: "FUJ" },
  { value: "Umm Al Quwain", label: "Umm Al Quwain", tag: "UAQ" },
];

const CURRICULUM_OPTIONS: GlideSelectOption[] = [
  { value: "British Curriculum (IGCSE / A-Level)", label: "British (IGCSE / A-Level)", tag: "A-Level" },
  { value: "American Curriculum (High School Diploma / AP)", label: "American Diploma (AP)", tag: "AP" },
  { value: "International Baccalaureate (IB Diploma)", label: "IB Diploma Programme", tag: "IB" },
  { value: "UAE Ministry of Education (MOE / General & Advanced)", label: "UAE MOE Curriculum", tag: "MOE" },
  { value: "CBSE / Indian Board", label: "CBSE / Indian Board", tag: "CBSE" },
  { value: "SABIS Curriculum", label: "SABIS Curriculum", tag: "SABIS" },
  { value: "Other International Curriculum", label: "Other International", tag: "Other" },
];

export default function CompleteProfilePage() {
  const router = useRouter();
  const { showToast } = useToast();

  const [profile, setProfile] = useState<StudentProfile>(getStudentProfile());
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("2007-04-15");
  const [school, setSchool] = useState("");
  const [curriculum, setCurriculum] = useState(CURRICULUM_OPTIONS[0].value);
  const [grades, setGrades] = useState("");
  const [gpa, setGpa] = useState("3.8");
  const [location, setLocation] = useState("Dubai");
  const [targetMajor, setTargetMajor] = useState("Computer Science");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const current = getStudentProfile();
    setProfile(current);
    setFirstName(current.firstName || "");
    setLastName(current.lastName || "");
    setEmail(current.email || "");
    setPhone(current.phone && current.phone !== "+971 50 123 4567" ? current.phone : "+971 50 ");
    if (current.dob) setDob(current.dob);
    setSchool(current.school && current.school !== "Dubai College" ? current.school : "");
    if (current.curriculum) setCurriculum(current.curriculum);
    if (current.grades && !current.grades.includes("A*AA")) setGrades(current.grades);
    if (current.gpa) setGpa(current.gpa);
    if (current.location) setLocation(current.location);
    if (current.targetMajor) setTargetMajor(current.targetMajor);

    // Also check current Supabase user session
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
        dob,
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
        {/* Brand Header with ReactBits TechText Logo (No Arabic, Pure MASARUAE) */}
        <div className="text-center space-y-3 flex flex-col items-center">
          <Link href="/" className="inline-flex items-center space-x-3 sm:space-x-3.5 group shrink-0" aria-label="MASARUAE Home">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-blue-600 to-emerald-500 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-200 shrink-0">
              <GraduationCap className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </div>
            <div className="relative h-12 sm:h-14 w-52 sm:w-60 flex items-center select-none overflow-visible">
              <TechText
                text="MASARUAE"
                fontSize={35}
                fontWeight={800}
                reach={75}
                dashLength={3.5}
                dashGap={2}
                specks={12}
                reveal="letter"
                labels={false}
                draggable={true}
                sweep={true}
                speed={0.8}
              />
            </div>
          </Link>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center space-x-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 pt-1">
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
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* First & Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1.5">
                  First Name *
                </label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="e.g. Mohammed"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-[#424242] bg-slate-50 dark:bg-[#1f1f1f] focus:bg-white dark:focus:bg-[#1f1f1f] focus:border-[#0D7377] dark:focus:border-[#14FFEC] focus:ring-2 focus:ring-[#14FFEC]/20 text-xs font-medium text-slate-900 dark:text-white outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1.5">
                  Last Name *
                </label>
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="e.g. Salem"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-[#424242] bg-slate-50 dark:bg-[#1f1f1f] focus:bg-white dark:focus:bg-[#1f1f1f] focus:border-[#0D7377] dark:focus:border-[#14FFEC] focus:ring-2 focus:ring-[#14FFEC]/20 text-xs font-medium text-slate-900 dark:text-white outline-none transition-all"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1.5">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. mohammed.salem@gmail.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-[#424242] bg-slate-50 dark:bg-[#1f1f1f] focus:bg-white dark:focus:bg-[#1f1f1f] focus:border-[#0D7377] dark:focus:border-[#14FFEC] focus:ring-2 focus:ring-[#14FFEC]/20 text-xs font-medium text-slate-900 dark:text-white outline-none transition-all"
              />
            </div>

            {/* Phone / WhatsApp & Date of Birth */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1.5">
                  Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+971 50 123 4567"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-[#424242] bg-slate-50 dark:bg-[#1f1f1f] focus:bg-white dark:focus:bg-[#1f1f1f] focus:border-[#0D7377] dark:focus:border-[#14FFEC] focus:ring-2 focus:ring-[#14FFEC]/20 text-xs font-medium text-slate-900 dark:text-white outline-none transition-all font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1.5">
                  Date of Birth (DOB) *
                </label>
                <input
                  type="date"
                  required
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-[#424242] bg-slate-50 dark:bg-[#1f1f1f] focus:bg-white dark:focus:bg-[#1f1f1f] focus:border-[#0D7377] dark:focus:border-[#14FFEC] focus:ring-2 focus:ring-[#14FFEC]/20 text-xs font-medium text-slate-900 dark:text-white outline-none transition-all"
                />
              </div>
            </div>

            {/* Location / Emirate & Academic Curriculum (ReactBits GlideSelect) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1.5">
                  Location / Emirate *
                </label>
                <GlideSelect
                  options={EMIRATE_OPTIONS}
                  value={location}
                  onChange={(val) => setLocation(val)}
                  ariaLabel="Location / Emirate"
                  showTags
                  size="md"
                  radius={12}
                  menuWidth="100%"
                  placement="bottom"
                  align="left"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1.5">
                  Academic Curriculum *
                </label>
                <GlideSelect
                  options={CURRICULUM_OPTIONS}
                  value={curriculum}
                  onChange={(val) => setCurriculum(val)}
                  ariaLabel="Academic Curriculum"
                  showTags
                  size="md"
                  radius={12}
                  menuWidth="100%"
                  placement="bottom"
                  align="left"
                  className="w-full"
                />
              </div>
            </div>

            {/* Academic Grades & GPA */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1.5">
                  Grades / Syllabus *
                </label>
                <input
                  type="text"
                  required
                  value={grades}
                  onChange={(e) => setGrades(e.target.value)}
                  placeholder="e.g. A*AA, IB 38, or 92%"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-[#424242] bg-slate-50 dark:bg-[#1f1f1f] focus:bg-white dark:focus:bg-[#1f1f1f] focus:border-[#0D7377] dark:focus:border-[#14FFEC] focus:ring-2 focus:ring-[#14FFEC]/20 text-xs font-medium text-slate-900 dark:text-white outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1.5">
                  GPA (out of 4.0) *
                </label>
                <input
                  type="text"
                  required
                  value={gpa}
                  onChange={(e) => setGpa(e.target.value)}
                  placeholder="e.g. 3.9"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-[#424242] bg-slate-50 dark:bg-[#1f1f1f] focus:bg-white dark:focus:bg-[#1f1f1f] focus:border-[#0D7377] dark:focus:border-[#14FFEC] focus:ring-2 focus:ring-[#14FFEC]/20 text-xs font-medium text-slate-900 dark:text-white outline-none transition-all"
                />
              </div>
            </div>

            {/* School & Target Major */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1.5">
                  School / High School
                </label>
                <input
                  type="text"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  placeholder="e.g. Dubai College"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-[#424242] bg-slate-50 dark:bg-[#1f1f1f] focus:bg-white dark:focus:bg-[#1f1f1f] focus:border-[#0D7377] dark:focus:border-[#14FFEC] focus:ring-2 focus:ring-[#14FFEC]/20 text-xs font-medium text-slate-900 dark:text-white outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-1.5">
                  Target Major
                </label>
                <input
                  type="text"
                  value={targetMajor}
                  onChange={(e) => setTargetMajor(e.target.value)}
                  placeholder="e.g. Computer Science"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-[#424242] bg-slate-50 dark:bg-[#1f1f1f] focus:bg-white dark:focus:bg-[#1f1f1f] focus:border-[#0D7377] dark:focus:border-[#14FFEC] focus:ring-2 focus:ring-[#14FFEC]/20 text-xs font-medium text-slate-900 dark:text-white outline-none transition-all"
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
