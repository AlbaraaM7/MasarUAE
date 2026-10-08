"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { 
  GraduationCap, 
  Check, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ArrowLeft,
  ShieldCheck, 
  CheckCircle2, 
  BookOpen, 
  Award,
  X
} from "lucide-react";
import SquishSwitch from "@/components/reactbits/SquishSwitch";
import Aurora from "@/components/reactbits/Aurora";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useToast } from "@/components/ToastProvider";
import { saveStudentProfile, getStudentProfile } from "@/lib/studentProfile";
import { supabase } from "@/lib/supabase";

interface AuthCardProps {
  initialMode?: "login" | "signup";
}

export default function AuthCard({ initialMode = "login" }: AuthCardProps) {
  const router = useRouter();
  const { showToast } = useToast();

  const [isSignUp, setIsSignUp] = useState(initialMode === "signup");

  // Login form state
  const [loginEmailOrPhone, setLoginEmailOrPhone] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginSubmitting, setLoginSubmitting] = useState(false);

  // Signup form state
  const [signupFirstName, setSignupFirstName] = useState("");
  const [signupLastName, setSignupLastName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [signupSubmitting, setSignupSubmitting] = useState(false);

  const [recoveryOpen, setRecoveryOpen] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState("");

  const handleToggleMode = (signUp: boolean) => {
    setIsSignUp(signUp);
    if (typeof window !== "undefined") {
      const newPath = signUp ? "/signup" : "/login";
      window.history.replaceState(null, "", newPath);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmailOrPhone) {
      showToast({
        title: "Missing Email or Username",
        description: "Please enter your registered student email.",
        fuseColor: "#f59e0b",
        duration: 3000,
      });
      return;
    }

    setLoginSubmitting(true);
    showToast({
      title: "Authenticating",
      description: "Verifying credentials with MasarUAE...",
      fuseColor: "#10b981",
      duration: 2500,
    });

    try {
      if (loginEmailOrPhone.includes("@") && loginPassword) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: loginEmailOrPhone.trim(),
          password: loginPassword,
        });

        if (error) {
          // If login fails, inform the user clearly
          console.warn("Supabase Auth notice:", error.message);
          showToast({
            title: "Authentication Notice",
            description: error.message || "Invalid login credentials. Please verify your email and password.",
            fuseColor: "#ef4444",
            duration: 4000,
          });
          setLoginSubmitting(false);
          return;
        }

        if (data?.user) {
          const meta = data.user.user_metadata || {};
          let fName = meta.first_name || "";
          let lName = meta.last_name || "";

          if (!fName && meta.full_name) {
            const parts = meta.full_name.trim().split(/\s+/);
            fName = parts[0];
            lName = parts.slice(1).join(" ");
          }

          // Try querying profiles table for full_name
          try {
            const { data: profileRow } = await supabase
              .from("profiles")
              .select("full_name")
              .eq("id", data.user.id)
              .maybeSingle();

            if (profileRow?.full_name && !fName) {
              const parts = profileRow.full_name.trim().split(/\s+/);
              fName = parts[0];
              lName = parts.slice(1).join(" ");
            }
          } catch (pErr) {
            console.warn("Could not query profiles table:", pErr);
          }

          // Fallback parsing from email if no name found
          if (!fName) {
            const emailPrefix = (data.user.email || loginEmailOrPhone).split("@")[0] || "Student";
            const namePart = emailPrefix.split(/[._-]/)[0];
            fName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
          }

          if (fName.includes(".")) {
            fName = fName.split(".")[0];
          }

          const current = getStudentProfile();
          saveStudentProfile({
            ...current,
            id: data.user.id,
            firstName: fName || current.firstName,
            lastName: lName || current.lastName,
            email: data.user.email || loginEmailOrPhone,
          });
        }
      } else {
        const current = getStudentProfile();
        let fName = current.firstName;
        if (loginEmailOrPhone.includes("@")) {
          const emailPrefix = loginEmailOrPhone.split("@")[0] || "Student";
          const namePart = emailPrefix.split(/[._-]/)[0];
          fName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
        }
        if (fName && fName.includes(".")) {
          fName = fName.split(".")[0];
        }
        saveStudentProfile({
          ...current,
          firstName: fName,
          email: loginEmailOrPhone,
        });
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("masar_is_logged_in", "true");
        window.dispatchEvent(new Event("masar_auth_changed"));
      }

      const currentProfile = getStudentProfile();
      showToast({
        title: "Welcome Back!",
        description: `Signed in as ${currentProfile.firstName || "Student"}.`,
        fuseColor: "#10b981",
        duration: 3500,
      });

      const params = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
      const redirect = params?.get("redirect") || "/dashboard";
      router.push(redirect);
    } catch (err: any) {
      console.error("Auth error:", err);
      showToast({
        title: "Sign In Error",
        description: err.message || "Failed to sign in. Please try again.",
        fuseColor: "#ef4444",
        duration: 3500,
      });
    } finally {
      setLoginSubmitting(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanFirstName = signupFirstName.trim();
    const cleanLastName = signupLastName.trim();

    if (!cleanFirstName) {
      showToast({
        title: "Missing First Name",
        description: "Please enter your first name.",
        fuseColor: "#f59e0b",
        duration: 3000,
      });
      return;
    }

    if (!cleanLastName) {
      showToast({
        title: "Missing Last Name",
        description: "Please enter your last name.",
        fuseColor: "#f59e0b",
        duration: 3000,
      });
      return;
    }

    if (!signupEmail) {
      showToast({
        title: "Missing Email",
        description: "Please enter your student email.",
        fuseColor: "#f59e0b",
        duration: 3000,
      });
      return;
    }

    if (!signupPassword || signupPassword.length < 6) {
      showToast({
        title: "Weak Password",
        description: "Password should be at least 6 characters.",
        fuseColor: "#f59e0b",
        duration: 3000,
      });
      return;
    }

    setSignupSubmitting(true);
    showToast({
      title: "Creating Student Account",
      description: "Setting up your student account...",
      fuseColor: "#10b981",
      duration: 3000,
    });

    try {
      const fullName = `${cleanFirstName} ${cleanLastName}`.trim();

      const { data, error } = await supabase.auth.signUp({
        email: signupEmail.trim(),
        password: signupPassword,
        options: {
          data: {
            first_name: cleanFirstName,
            last_name: cleanLastName,
            full_name: fullName,
          },
        },
      });

      if (error) {
        console.warn("Supabase SignUp notice:", error.message);
        showToast({
          title: "Sign Up Notice",
          description: error.message || "Could not complete account creation. Please try again.",
          fuseColor: "#ef4444",
          duration: 4000,
        });
        setSignupSubmitting(false);
        return;
      }

      if (data?.user) {
        try {
          await supabase.from("profiles").upsert({
            id: data.user.id,
            full_name: fullName,
            email: signupEmail.trim(),
          });
        } catch (dbErr) {
          console.warn("Profile table sync notice (non-fatal):", dbErr);
        }
      }

      const current = getStudentProfile();
      saveStudentProfile({
        ...current,
        id: data?.user?.id || current.id,
        firstName: cleanFirstName,
        lastName: cleanLastName,
        email: signupEmail.trim(),
      });

      if (typeof window !== "undefined") {
        localStorage.setItem("masar_is_logged_in", "true");
        window.dispatchEvent(new Event("masar_auth_changed"));
      }

      showToast({
        title: "Account Created!",
        description: `Welcome to Masar UAE, ${cleanFirstName}!`,
        fuseColor: "#10b981",
        duration: 3500,
      });

      const params = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
      const redirect = params?.get("redirect") || "/dashboard";
      router.push(redirect);
    } catch (err: any) {
      console.error("SignUp error:", err);
      showToast({
        title: "Account Error",
        description: err.message || "Could not complete registration.",
        fuseColor: "#ef4444",
        duration: 3500,
      });
    } finally {
      setSignupSubmitting(false);
    }
  };

  const handlePasswordRecovery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recoveryEmail) return;
    try {
      await supabase.auth.resetPasswordForEmail(recoveryEmail.trim());
      setRecoveryOpen(false);
      showToast({
        title: "Password Reset Link Sent",
        description: `Check your inbox at ${recoveryEmail} for instructions.`,
        fuseColor: "#10b981",
        duration: 4000,
      });
      setRecoveryEmail("");
    } catch (err: any) {
      showToast({
        title: "Recovery Notice",
        description: err.message || "Failed to send reset instructions.",
        fuseColor: "#ef4444",
        duration: 3500,
      });
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex flex-col items-center justify-center bg-white dark:bg-black text-zinc-900 dark:text-white px-4 sm:px-6 lg:px-8 py-8 sm:py-12 transition-colors duration-300">
      
      {/* Top Left Go Back Arrow */}
      <Link
        href="/"
        aria-label="Go back to home"
        className="fixed top-5 left-5 sm:top-7 sm:left-7 z-50 flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-zinc-300 dark:border-zinc-700 bg-zinc-100/90 dark:bg-zinc-800/90 text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 shadow-lg backdrop-blur-md transition-all duration-200 hover:scale-105 active:scale-95 group cursor-pointer"
      >
        <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
      </Link>

      {/* Top Right Light/Dark Mode Switch */}
      <div className="fixed top-5 right-5 sm:top-7 sm:right-7 z-50">
        <ThemeToggle className="w-11 h-11 sm:w-12 sm:h-12 !rounded-full border border-zinc-300 dark:border-zinc-700 bg-zinc-100/90 dark:bg-zinc-800/90 shadow-lg backdrop-blur-md transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer" />
      </div>

      {/* Background Aurora Glow */}
      <div className="absolute top-0 left-0 right-0 h-[500px] overflow-hidden pointer-events-none opacity-30 dark:opacity-20 z-0">
        <Aurora
          colorStops={["#2563eb", "#10b981", "#14FFEC"]}
          amplitude={1.1}
          blend={0.6}
          speed={0.5}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 dark:via-black/50 to-white dark:to-black" />
      </div>

      {/* Floating Mode Switcher Header with React Bits SquishSwitch */}
      <div className="relative z-20 mb-6 flex items-center justify-center">
        <div className="flex items-center space-x-3.5 px-4 sm:px-5 py-2 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border border-zinc-200/90 dark:border-white/10 shadow-lg shadow-black/5">
          <button
            type="button"
            onClick={() => handleToggleMode(false)}
            className={`text-xs sm:text-sm font-black transition-all cursor-pointer ${
              !isSignUp 
                ? "text-blue-600 dark:text-emerald-400 scale-105" 
                : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
            }`}
          >
            Log In
          </button>

          <SquishSwitch
            checked={isSignUp}
            onChange={handleToggleMode}
            width={60}
            height={30}
            radius={15}
            speed={55}
            stretch={40}
            trackColor="#27272a"
            trackOnColor="#2563eb"
            thumbColor="#9ca3af"
            thumbOnColor="#ffffff"
            ariaLabel="Toggle between Log In and Sign Up"
          />

          <button
            type="button"
            onClick={() => handleToggleMode(true)}
            className={`text-xs sm:text-sm font-black transition-all cursor-pointer ${
              isSignUp 
                ? "text-blue-600 dark:text-emerald-400 scale-105" 
                : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
            }`}
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* Main Framed Card Container */}
      <div className="relative z-10 w-full max-w-5xl rounded-[32px] sm:rounded-[36px] bg-white dark:bg-zinc-950/90 border border-zinc-200/90 dark:border-white/10 shadow-2xl overflow-hidden backdrop-blur-2xl grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
        
        {/* ARTWORK / COLOR COLUMN: ALWAYS ON THE LEFT (lg:order-1) */}
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 220, damping: 26 }}
          className={`lg:col-span-5 lg:order-1 relative p-8 sm:p-10 flex flex-col justify-between text-white overflow-hidden transition-all duration-500 ${
            isSignUp 
              ? "bg-gradient-to-br from-blue-600 via-blue-700 to-emerald-600 dark:from-blue-700 dark:via-zinc-900 dark:to-emerald-900" 
              : "bg-gradient-to-br from-blue-700 via-zinc-900 to-emerald-900 dark:from-zinc-900 dark:via-black dark:to-emerald-950"
          }`}
        >
          {/* Subtle Ambient Shimmer Over Artwork Column */}
          <div className="absolute -top-24 -right-24 w-60 h-60 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

          {/* Top Brand Logo (Clean, zero badge, zero star) */}
          <div className="relative z-10">
            <Link href="/" className="inline-flex items-center space-x-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20 shadow-xs">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                Masar<span className="text-[#14FFEC]">UAE</span>
              </span>
            </Link>
          </div>

          {/* Middle Headline Content (Smooth cross-fade between Login and Signup artwork copy) */}
          <div className="relative z-10 my-8">
            <AnimatePresence mode="wait">
              {isSignUp ? (
                <motion.div
                  key="signup-artwork-text"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.2 }}
                >
                  <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">
                    Start your Journey
                  </h2>
                  <p className="mt-3 text-xs sm:text-sm text-zinc-200 leading-relaxed font-medium">
                    Follow these simple steps to set up your account and unlock your UAE university pathway.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="login-artwork-text"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.2 }}
                >
                  <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">
                    Hello ! <br />
                    Welcome Back
                  </h2>
                  <p className="mt-3 text-xs sm:text-sm text-zinc-300 leading-relaxed font-medium">
                    Continue your AI past paper revision, track university eligibility benchmarks, and manage your verified extracurricular CV.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Highlights / Steps */}
          <div className="relative z-10">
            <AnimatePresence mode="wait">
              {isSignUp ? (
                /* Signup Progression Steps (Image 2) */
                <motion.div
                  key="signup-steps"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-2.5"
                >
                  <div className="p-3.5 rounded-2xl bg-white text-zinc-950 flex items-center justify-between shadow-md">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-black shrink-0">
                        1
                      </div>
                      <div>
                        <p className="text-xs font-black leading-tight text-zinc-900">Register your account</p>
                        <p className="text-[10px] text-zinc-500 font-medium">Basic credentials & contact info</p>
                      </div>
                    </div>
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center space-x-3 text-white">
                    <div className="w-6 h-6 rounded-full bg-white/20 text-white flex items-center justify-center text-xs font-black shrink-0">
                      2
                    </div>
                    <div>
                      <p className="text-xs font-bold leading-tight">Set up your academic profile</p>
                      <p className="text-[10px] text-zinc-300">Curriculum, school & target majors</p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center space-x-3 text-white">
                    <div className="w-6 h-6 rounded-full bg-white/20 text-white flex items-center justify-center text-xs font-black shrink-0">
                      3
                    </div>
                    <div>
                      <p className="text-xs font-bold leading-tight">Match 70+ UAE universities</p>
                      <p className="text-[10px] text-zinc-300">Eligibility scores & scholarships</p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                /* Login Feature Highlights (Image 1) */
                <motion.div
                  key="login-features"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-2.5"
                >
                  <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center space-x-3">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-[#14FFEC] flex items-center justify-center shrink-0">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-white truncate">AI Past Paper Coach</p>
                      <p className="text-[10px] text-zinc-400">Step-by-step mark schemes & examiners&apos; tips</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center space-x-3">
                    <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                      <Award className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-white truncate">70+ UAE University Matcher</p>
                      <p className="text-[10px] text-zinc-400">Accurate admission cutoffs & AED 50k+ scholarships</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* FORM COLUMN: ALWAYS ON THE RIGHT (lg:order-2) */}
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 220, damping: 26 }}
          className="lg:col-span-7 lg:order-2 p-8 sm:p-10 flex flex-col justify-between"
        >
          <AnimatePresence mode="wait">
            {isSignUp ? (
              /* SIGNUP FORM */
              <motion.div
                key="signup-form-body"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
                    Join Us
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                    Access your past paper revision, university matches, and verified student CV anytime.
                  </p>
                </div>

                <form onSubmit={handleSignUp} className="space-y-4">
                  {/* First Name & Last Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                        First Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rashid"
                        value={signupFirstName}
                        onChange={(e) => setSignupFirstName(e.target.value)}
                        className="w-full rounded-2xl bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-white/10 px-4 py-3 text-xs sm:text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-hidden focus:border-blue-600 dark:focus:border-emerald-400 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                        Last Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Al-Nuaimi"
                        value={signupLastName}
                        onChange={(e) => setSignupLastName(e.target.value)}
                        className="w-full rounded-2xl bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-white/10 px-4 py-3 text-xs sm:text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-hidden focus:border-blue-600 dark:focus:border-emerald-400 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="student@school.ae"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      className="w-full rounded-2xl bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-white/10 px-4 py-3 text-xs sm:text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-hidden focus:border-blue-600 dark:focus:border-emerald-400 transition-colors"
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showSignupPassword ? "text" : "password"}
                        required
                        placeholder="••••••••••••"
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        className="w-full rounded-2xl bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-white/10 px-4 py-3 pr-10 text-xs sm:text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-hidden focus:border-blue-600 dark:focus:border-emerald-400 transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowSignupPassword(!showSignupPassword)}
                        className="absolute right-3.5 top-3.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors cursor-pointer"
                        title={showSignupPassword ? "Hide password" : "Show password"}
                      >
                        {showSignupPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    <p className="mt-1 text-[11px] text-zinc-400 leading-normal">
                      At least 6 characters.
                    </p>
                  </div>

                  {/* Sign Up Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={signupSubmitting}
                      className="w-full flex items-center justify-center space-x-2 py-3 px-6 rounded-2xl text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 dark:bg-emerald-500 dark:hover:bg-emerald-400 dark:text-zinc-950 shadow-md hover:scale-[1.01] active:scale-95 transition-all cursor-pointer disabled:opacity-50"
                    >
                      <span>{signupSubmitting ? "Creating Account..." : "Create Account"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Switch to Login Link */}
                  <div className="text-center pt-1">
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={() => handleToggleMode(false)}
                        className="font-bold text-blue-600 dark:text-emerald-400 hover:underline transition-colors cursor-pointer"
                      >
                        Log in
                      </button>
                    </p>
                  </div>

                  {/* Legal Terms */}
                  <p className="text-[11px] text-center text-zinc-400 leading-relaxed pt-2">
                    By signing up I confirm that I agree to MasarUAE{" "}
                    <Link href="/privacy" className="text-zinc-600 dark:text-zinc-300 font-semibold underline">
                      Privacy Policy
                    </Link>{" "}
                    and{" "}
                    <Link href="/terms" className="text-zinc-600 dark:text-zinc-300 font-semibold underline">
                      Terms of Service
                    </Link>
                    .
                  </p>
                </form>
              </motion.div>
            ) : (
              /* LOGIN FORM */
              <motion.div
                key="login-form-body"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
                    Hello ! <br className="hidden sm:inline" /> Welcome Back
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                    Enter your student email or username to log in.
                  </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="student@school.ae"
                      value={loginEmailOrPhone}
                      onChange={(e) => setLoginEmailOrPhone(e.target.value)}
                      className="w-full rounded-2xl bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-white/10 px-4 py-3 text-xs sm:text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-hidden focus:border-blue-600 dark:focus:border-emerald-400 transition-colors"
                    />
                  </div>

                  {/* Password Input */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => setRecoveryOpen(true)}
                        className="text-xs font-semibold text-blue-600 dark:text-emerald-400 hover:underline transition-colors cursor-pointer"
                      >
                        Recover Password ?
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        type={showLoginPassword ? "text" : "password"}
                        required
                        placeholder="••••••••••••"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="w-full rounded-2xl bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-white/10 px-4 py-3 pr-10 text-xs sm:text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-hidden focus:border-blue-600 dark:focus:border-emerald-400 transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowLoginPassword(!showLoginPassword)}
                        className="absolute right-3.5 top-3.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors cursor-pointer"
                        title={showLoginPassword ? "Hide password" : "Show password"}
                      >
                        {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Log In Button (Dark style with ArrowRight, NO star) */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loginSubmitting}
                      className="w-full flex items-center justify-center space-x-2 py-3 px-6 rounded-2xl text-xs sm:text-sm font-bold text-white bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100 shadow-md hover:scale-[1.01] active:scale-95 transition-all cursor-pointer disabled:opacity-50"
                    >
                      <span>{loginSubmitting ? "Authenticating..." : "Log In"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Switch to Signup Link */}
                  <div className="text-center pt-1">
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Don&apos;t Have an account ?{" "}
                      <button
                        type="button"
                        onClick={() => handleToggleMode(true)}
                        className="font-bold text-blue-600 dark:text-emerald-400 hover:underline transition-colors cursor-pointer"
                      >
                        Create Account!
                      </button>
                    </p>
                  </div>

                  {/* Secure Student Portal Badge */}
                  <div className="pt-4 flex items-center justify-center space-x-2 text-zinc-400 dark:text-zinc-500 text-xs">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>Encrypted UAE Student Authentication Protocol</span>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Password Recovery Modal */}
      {recoveryOpen && (
        <div 
          onClick={() => setRecoveryOpen(false)}
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 pointer-events-auto animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 animate-in zoom-in-95 duration-200"
          >
            <div className="flex items-center justify-between">
              <h4 className="text-base font-bold text-zinc-900 dark:text-white">Recover Password</h4>
              <button
                type="button"
                onClick={() => setRecoveryOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Enter your registered UAE student email address, and we will send you a password reset link.
            </p>
            <form onSubmit={handlePasswordRecovery} className="space-y-4">
              <input
                type="email"
                required
                placeholder="student@school.ae"
                value={recoveryEmail}
                onChange={(e) => setRecoveryEmail(e.target.value)}
                className="w-full rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 px-3.5 py-2.5 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-hidden focus:border-blue-600"
              />
              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setRecoveryOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md transition-colors cursor-pointer"
                >
                  Send Reset Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
