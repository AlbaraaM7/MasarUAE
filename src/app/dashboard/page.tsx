"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { 
  Sparkles, 
  GraduationCap, 
  FileText, 
  CheckCircle2, 
  Calendar, 
  Flame, 
  Heart, 
  ArrowRight, 
  Building2,
  UserCog
} from "lucide-react";
import { getStudentProfile, StudentProfile } from "@/lib/studentProfile";
import { UpdateProfileModal } from "@/components/UpdateProfileModal";

import CountUp from "@/components/reactbits/CountUp";

export default function DashboardPage() {
  const [profile, setProfile] = useState<StudentProfile>(getStudentProfile());
  const [updateProfileOpen, setUpdateProfileOpen] = useState(false);

  useEffect(() => {
    setProfile(getStudentProfile());
    const handleProfileUpdate = () => {
      setProfile(getStudentProfile());
    };
    window.addEventListener("masar_student_profile_updated", handleProfileUpdate);
    return () => window.removeEventListener("masar_student_profile_updated", handleProfileUpdate);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans">
      {/* Welcome Banner */}
      <div className="bg-white dark:bg-zinc-950 rounded-3xl p-6 sm:p-8 text-zinc-900 dark:text-white relative overflow-hidden shadow-sm border border-zinc-200/90 dark:border-zinc-800 transition-colors">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center space-x-2 text-xs font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30 text-emerald-700 dark:text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
              <span>{profile.location}, UAE • {profile.school} ({profile.grades})</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-900 dark:text-white">
              Marhaban, {profile.firstName}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
              Targeting {profile.targetMajor} (GPA {profile.gpa}). You are currently on track for your UAE and international university applications.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setUpdateProfileOpen(true)}
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black text-xs shadow-md shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <UserCog className="w-4 h-4 text-zinc-950" />
              <span>Update Profile</span>
            </button>

            <Link
              href="/coach"
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-200 dark:bg-white/10 dark:hover:bg-white/20 dark:text-white dark:border-white/20 font-bold text-xs transition-all"
            >
              <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>AI Coach</span>
            </Link>

            <Link
              href="/cv-builder"
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-200 dark:bg-white/10 dark:hover:bg-white/20 dark:text-white dark:border-white/20 font-bold text-xs transition-all"
            >
              <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Academic CV</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Stats Cards with React Bits CountUp */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-zinc-950 p-5 rounded-3xl border border-zinc-200/90 dark:border-white/10 shadow-xs space-y-1 hover:border-emerald-500/40 transition-all">
          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 font-semibold">
            <span>Study Streak</span>
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
          </div>
          <p className="text-2xl font-black text-zinc-900 dark:text-white tabular-nums">
            <CountUp to={7} duration={1.5} /> Days
          </p>
          <p className="text-[11px] text-emerald-600 dark:text-[#14FFEC] font-bold">+3 past papers this week</p>
        </div>

        <div className="bg-white dark:bg-zinc-950 p-5 rounded-3xl border border-zinc-200/90 dark:border-white/10 shadow-xs space-y-1 hover:border-emerald-500/40 transition-all">
          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 font-semibold">
            <span>Volunteering</span>
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
          </div>
          <p className="text-2xl font-black text-zinc-900 dark:text-white tabular-nums">
            <CountUp to={60} duration={1.8} /> Hours
          </p>
          <p className="text-[11px] text-emerald-600 dark:text-[#14FFEC] font-bold">Dubai Cares & Red Crescent</p>
        </div>

        <div className="bg-white dark:bg-zinc-950 p-5 rounded-3xl border border-zinc-200/90 dark:border-white/10 shadow-xs space-y-1 hover:border-blue-500/40 transition-all">
          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 font-semibold">
            <span>Target Match</span>
            <GraduationCap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <p className="text-2xl font-black text-zinc-900 dark:text-white tabular-nums">
            <CountUp to={5} duration={1.2} /> Unis
          </p>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">AUS, Heriot-Watt, UOWD...</p>
        </div>

        <div className="bg-white dark:bg-zinc-950 p-5 rounded-3xl border border-zinc-200/90 dark:border-white/10 shadow-xs space-y-1 hover:border-emerald-500/40 transition-all">
          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 font-semibold">
            <span>Equivalency</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-[#14FFEC]" />
          </div>
          <p className="text-2xl font-black text-zinc-900 dark:text-white tabular-nums">
            <CountUp to={3} duration={1.2} /> of 4 Steps
          </p>
          <p className="text-[11px] text-amber-500 font-bold">Pending MOE portal submit</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Recent Practice & Suggested Actions (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Quick Study Recommendation */}
          <div className="bg-white dark:bg-[#323232] p-6 rounded-3xl border border-slate-200 dark:border-[#424242] shadow-xs space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Today's Recommended Past Paper Challenge
              </h3>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#212121] border border-slate-200 dark:border-[#424242] border-l-4 border-l-[#0D7377] dark:border-l-[#14FFEC] space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-white">Paper 9702/22 - Mechanics & Impulse</span>
                <span className="text-slate-500 dark:text-zinc-400 font-mono font-bold">4 Marks</span>
              </div>
              <p className="text-slate-600 dark:text-zinc-300 leading-relaxed font-sans">
                "A ball of mass 0.15 kg is dropped from rest from a height of 1.8 m above the ground. It rebounds to a height of 1.2 m. Calculate impulse..."
              </p>
            </div>

            <div className="flex justify-end">
              <Link
                href="/coach"
                className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#0D7377] dark:text-[#14FFEC] hover:underline"
              >
                <span>Open Practice Session</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* UAE University Deadlines & Events */}
          <div className="bg-white dark:bg-[#323232] p-6 rounded-3xl border border-slate-200 dark:border-[#424242] shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Upcoming UAE University & Scholarship Deadlines
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-[#212121] border border-slate-100 dark:border-[#424242]">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-[#0D7377]/15 text-[#0D7377] dark:text-[#14FFEC] font-black flex items-center justify-center text-xs">
                    AUS
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">American University of Sharjah Early Admissions</p>
                    <p className="text-slate-500 dark:text-zinc-400">Sharjah • 20% to 50% Chancellor's Scholarship window</p>
                  </div>
                </div>
                <span className="font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-2.5 py-0.5 rounded-full">
                  Closing in 14 days
                </span>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-[#212121] border border-slate-100 dark:border-[#424242]">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 font-black flex items-center justify-center text-xs">
                    ADEK
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">Abu Dhabi Outstanding Student Scholarship</p>
                    <p className="text-slate-500 dark:text-zinc-400">Abu Dhabi • Full tuition sponsorship application</p>
                  </div>
                </div>
                <span className="font-bold text-slate-700 dark:text-zinc-300 bg-slate-200 dark:bg-[#323232] px-2.5 py-0.5 rounded-full">
                  Opens Nov 1
                </span>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-[#212121] border border-slate-100 dark:border-[#424242]">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-[#14FFEC]/15 text-[#0D7377] dark:text-[#14FFEC] font-black flex items-center justify-center text-xs">
                    HWU
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">Heriot-Watt Dubai Academic Merit Concession</p>
                    <p className="text-slate-500 dark:text-zinc-400">Dubai Knowledge Park • Up to AED 25,000 grant</p>
                  </div>
                </div>
                <span className="font-bold text-[#0D7377] dark:text-[#14FFEC] bg-[#0D7377]/10 dark:bg-[#14FFEC]/15 px-2.5 py-0.5 rounded-full">
                  Rolling Admissions
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Student Co-Pilot Tools (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-[#323232] p-6 rounded-3xl border border-slate-200 dark:border-[#424242] shadow-xs space-y-4">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Student Co-Pilot Tools
              </h3>
            </div>

            <div className="space-y-2.5">
              <Link
                href="/coach"
                className="group flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-[#212121] hover:bg-slate-100 dark:hover:bg-[#282828] border border-slate-100 dark:border-[#424242] transition-all"
              >
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#0D7377] dark:group-hover:text-[#14FFEC] transition-colors">
                    AI Past Paper Coach
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-zinc-400 mt-0.5">
                    Cambridge, IB & CBSE grading
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#14FFEC] group-hover:translate-x-0.5 transition-all shrink-0" />
              </Link>

              <Link
                href="/cv-builder"
                className="group flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-[#212121] hover:bg-slate-100 dark:hover:bg-[#282828] border border-slate-100 dark:border-[#424242] transition-all"
              >
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#0D7377] dark:group-hover:text-[#14FFEC] transition-colors">
                    Academic CV Builder
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-zinc-400 mt-0.5">
                    Dubai Cares & Red Crescent log
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#14FFEC] group-hover:translate-x-0.5 transition-all shrink-0" />
              </Link>

              <Link
                href="/universities"
                className="group flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-[#212121] hover:bg-slate-100 dark:hover:bg-[#282828] border border-slate-100 dark:border-[#424242] transition-all"
              >
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#0D7377] dark:group-hover:text-[#14FFEC] transition-colors">
                    UAE University Matcher
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-zinc-400 mt-0.5">
                    70+ licensed campuses & fees
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#14FFEC] group-hover:translate-x-0.5 transition-all shrink-0" />
              </Link>

              <Link
                href="/muadala"
                className="group flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-[#212121] hover:bg-slate-100 dark:hover:bg-[#282828] border border-slate-100 dark:border-[#424242] transition-all"
              >
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#0D7377] dark:group-hover:text-[#14FFEC] transition-colors">
                    Mu'adala Equivalency
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-zinc-400 mt-0.5">
                    Ministry of Education requirements
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#14FFEC] group-hover:translate-x-0.5 transition-all shrink-0" />
              </Link>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-[#323232] border border-slate-200 dark:border-[#424242] text-xs space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white">
              For UAE High Schools & Tutors
            </h4>
            <p className="text-slate-600 dark:text-zinc-400 text-[11px] leading-relaxed">
              Are you a school counselor or tutoring center? Get institutional access for all your students with bulk analytics.
            </p>
            <a
              href="mailto:partners@masaruae.com"
              className="inline-block text-[11px] font-bold text-[#0D7377] dark:text-[#14FFEC] hover:underline"
            >
              Contact School Admissions Team →
            </a>
          </div>
        </div>
      </div>

      {/* Update Student Profile Modal */}
      <UpdateProfileModal
        isOpen={updateProfileOpen}
        onClose={() => setUpdateProfileOpen(false)}
        onProfileUpdated={(updated) => setProfile(updated)}
      />
    </div>
  );
}
