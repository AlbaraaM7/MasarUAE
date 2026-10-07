"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { 
  motion, 
  AnimatePresence,
  useScroll, 
  useTransform, 
  useSpring, 
  useMotionValue 
} from "motion/react";
import { 
  Sparkles, 
  GraduationCap, 
  FileText, 
  Compass, 
  CheckCircle2, 
  CreditCard,
  Menu, 
  X,
  User,
  LogOut,
  UserCog,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { getStudentProfile, StudentProfile } from "@/lib/studentProfile";
import { UpdateProfileModal } from "@/components/UpdateProfileModal";
import TechText from "@/components/reactbits/TechText";

export function Navbar() {
  const pathname = usePathname();

  // Hide entire navbar on authentication screens (standalone login / signup pages)
  if (
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/signin" ||
    pathname === "/register"
  ) {
    return null;
  }

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [updateProfileOpen, setUpdateProfileOpen] = useState(false);
  const [profile, setProfile] = useState<StudentProfile>(getStudentProfile());
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const initials = `${profile.firstName?.[0] || 'R'}${profile.lastName?.[0] || 'A'}`.toUpperCase();

  // Reactive screen measurement for seamless, subpixel container width scaling
  const windowWidth = useMotionValue(1280);
  const targetPillWidth = useMotionValue(1200);

  useEffect(() => {
    const checkAuth = () => {
      if (typeof window === "undefined") return;
      const isAuthStorage = localStorage.getItem("masar_is_logged_in") === "true";
      // User is on inner pages (dashboard, coach, cv-builder, universities, muadala, pricing) or has logged in
      const auth = pathname !== "/" || isAuthStorage;
      setIsLoggedIn(auth);
    };

    checkAuth();
    window.addEventListener("masar_auth_changed", checkAuth);
    window.addEventListener("storage", checkAuth);
    return () => {
      window.removeEventListener("masar_auth_changed", checkAuth);
      window.removeEventListener("storage", checkAuth);
    };
  }, [pathname]);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("masar_is_logged_in");
      window.dispatchEvent(new Event("masar_auth_changed"));
      window.location.href = "/";
    }
  };

  useEffect(() => {
    setMounted(true);
    const updateDimensions = () => {
      const w = typeof window !== "undefined" ? window.innerWidth : 1280;
      windowWidth.set(w);
      const margin = w < 640 ? 20 : 48;
      targetPillWidth.set(Math.min(w - margin, 1280));
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions, { passive: true });
    return () => window.removeEventListener("resize", updateDimensions);
  }, [windowWidth, targetPillWidth]);

  useEffect(() => {
    setProfile(getStudentProfile());
    const handleProfileUpdate = () => {
      setProfile(getStudentProfile());
    };
    window.addEventListener("masar_student_profile_updated", handleProfileUpdate);
    return () => window.removeEventListener("masar_student_profile_updated", handleProfileUpdate);
  }, []);

  // Close sidebar on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSidebarOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const links = [
    { href: "/dashboard", label: "Dashboard", icon: Compass },
    { href: "/coach", label: "AI Coach", icon: Sparkles, badge: "AI" },
    { href: "/cv-builder", label: "CV Builder", icon: FileText },
    { href: "/universities", label: "Universities", icon: GraduationCap },
    { href: "/muadala", label: "Mu'adala", icon: CheckCircle2 },
  ];

  // Continuous, gradual scroll progress from 0px (top) to 90px (compact)
  const { scrollY } = useScroll();
  const rawProgress = useTransform(scrollY, [0, 90], [0, 1], { clamp: true });
  const progress = useSpring(rawProgress, {
    stiffness: 320,
    damping: 32,
    mass: 0.2,
  });

  // Physical geometry transformations that smoothly scale the navbar as the user scrolls
  const navWidth = useTransform(
    [progress, windowWidth, targetPillWidth],
    ([p, w, target]) => {
      const current = (w as number) - ((w as number) - (target as number)) * (p as number);
      return `${Math.round(current)}px`;
    }
  );

  const marginTop = useTransform(progress, [0, 1], [0, 10]);
  const borderRadius = useTransform(progress, [0, 1], [0, 32]);
  const paddingY = useTransform(progress, [0, 1], [13, 8]);
  const paddingX = useTransform(
    [progress, windowWidth],
    ([p, w]) => {
      const isMobile = (w as number) < 640;
      const startX = isMobile ? 16 : 32;
      const endX = isMobile ? 12 : 20;
      const val = startX - (startX - endX) * (p as number);
      return `${Math.round(val)}px`;
    }
  );

  const boxShadow = useTransform(
    progress,
    [0, 1],
    [
      "0px 0px 0px rgba(0, 0, 0, 0)",
      "0px 10px 25px -5px rgba(0, 0, 0, 0.08), 0px 4px 10px -4px rgba(0, 0, 0, 0.04)"
    ]
  );

  const contentScale = useTransform(progress, [0, 1], [1, 0.98]);

  const isLanding = pathname === "/";

  return (
    <>
      {isLanding ? (
        <header className="no-print sticky top-0 z-40 w-full flex justify-center pointer-events-none">
          {/* Top Bar: Clean, sleek floating capsule for Landing Page */}
          <motion.div 
            className="pointer-events-auto mx-auto flex items-center justify-between bg-white/90 dark:bg-black/90 backdrop-blur-md border border-zinc-200/80 dark:border-white/10 transition-colors"
            style={{
              width: mounted ? navWidth : "100%",
              marginTop,
              borderRadius,
              paddingTop: paddingY,
              paddingBottom: paddingY,
              paddingLeft: paddingX,
              paddingRight: paddingX,
              boxShadow,
            }}
          >
            <motion.div 
              style={{ scale: contentScale }}
              className="flex items-center justify-between w-full origin-center"
            >
              {/* Top Left: MasarUAE Logo */}
              <div className="flex items-center space-x-2.5 sm:space-x-3.5 shrink-0">
                <Link href="/" className="flex items-center space-x-2.5 group shrink-0" aria-label="MasarUAE Home">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-blue-600 to-emerald-500 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform duration-200 shrink-0">
                    <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div className="relative h-8 sm:h-9 w-28 sm:w-32 flex items-center select-none overflow-visible">
                    <TechText
                      text="MasarUAE"
                      fontSize={22}
                      fontWeight={800}
                      reach={60}
                      dashLength={3}
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
              </div>

              {/* Landing Page Center Navigation Links: Explore • Features • Pricing • FAQ */}
              <nav className="hidden md:flex items-center space-x-2.5 lg:space-x-3">
                <button
                  onClick={() => {
                    document.getElementById("explore")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 hover:text-cyan-600 dark:hover:text-[#14FFEC] transition-colors duration-150 cursor-pointer py-1 px-1"
                >
                  Explore
                </button>
                <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700 shrink-0 select-none" aria-hidden="true" />
                <button
                  onClick={() => {
                    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 hover:text-cyan-600 dark:hover:text-[#14FFEC] transition-colors duration-150 cursor-pointer py-1 px-1"
                >
                  Features
                </button>
                <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700 shrink-0 select-none" aria-hidden="true" />
                <button
                  onClick={() => {
                    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 hover:text-cyan-600 dark:hover:text-[#14FFEC] transition-colors duration-150 cursor-pointer py-1 px-1"
                >
                  Pricing
                </button>
                <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700 shrink-0 select-none" aria-hidden="true" />
                <button
                  onClick={() => {
                    document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 hover:text-cyan-600 dark:hover:text-[#14FFEC] transition-colors duration-150 cursor-pointer py-1 px-1"
                >
                  FAQ
                </button>
              </nav>

              {/* Top Right: Theme Toggle & Log In / Sign Up CTA */}
              <div className="flex items-center space-x-2 sm:space-x-2.5 shrink-0">
                <ThemeToggle />

                <Link
                  href="/login"
                  className="inline-flex items-center px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-bold text-zinc-700 dark:text-zinc-200 hover:text-zinc-950 dark:hover:text-white bg-zinc-100/80 dark:bg-zinc-800/80 hover:bg-zinc-200/80 dark:hover:bg-zinc-700/80 border border-zinc-200/80 dark:border-white/10 transition-colors"
                >
                  Log In
                </Link>

                <Link
                  href="/signup"
                  className="inline-flex items-center px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-bold tracking-tight bg-emerald-500 hover:bg-emerald-400 text-zinc-950 shadow-md hover:scale-[1.02] active:scale-95 transition-all duration-200 whitespace-nowrap shrink-0"
                >
                  Sign Up
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </header>
      ) : (
        /* On all pages except landing page: ONLY keep the 3 lines button pinned on the top-left */
        <div className="no-print fixed top-4 left-4 sm:top-5 sm:left-6 z-40 pointer-events-auto">
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex items-center justify-center p-2.5 rounded-2xl text-zinc-700 dark:text-zinc-200 hover:text-zinc-950 dark:hover:text-white bg-white/90 dark:bg-zinc-900/90 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200/90 dark:border-white/10 shadow-md backdrop-blur-md transition-all cursor-pointer group hover:scale-105 active:scale-95"
            aria-label="Open sidebar menu"
            title="Open menu"
          >
            <Menu className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
          </button>
        </div>
      )}

      {/* Slide-over LEFT Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 pointer-events-auto">
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            />

            {/* Sidebar Panel Sliding from the LEFT */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed top-0 left-0 h-full w-[310px] sm:w-[360px] bg-white dark:bg-[#0c0c0e] border-r border-zinc-200/90 dark:border-white/10 shadow-2xl flex flex-col justify-between overflow-hidden text-left"
            >
              {/* Sidebar Header: Logo & Circular Close Button */}
              <div className="p-4 sm:p-5 border-b border-zinc-200/80 dark:border-white/10 flex items-center justify-between">
                <Link
                  href="/"
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center space-x-2.5 group cursor-pointer hover:opacity-80 transition-opacity"
                  aria-label="Return to Home"
                  title="Return to Home"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-emerald-500 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform duration-200">
                    <GraduationCap className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-extrabold text-base text-zinc-900 dark:text-white tracking-tight">
                    Masar<span className="text-emerald-500">UAE</span>
                  </span>
                </Link>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 transition-colors cursor-pointer group"
                  aria-label="Close sidebar"
                >
                  <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200" />
                </button>
              </div>

              {/* Sidebar Body: Scrollable Student Tools & Links */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
                {/* Main Student Apps */}
                <div className="space-y-1">
                  <p className="text-[10px] font-extrabold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 px-3 mb-2">
                    Student Apps
                  </p>
                  {links.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                          isActive
                            ? "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-500/10 border border-emerald-500/25 dark:border-emerald-500/20 shadow-xs"
                            : "text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                            isActive
                              ? "bg-emerald-500/15 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                              : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400"
                          }`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <span>{link.label}</span>
                        </div>
                        {link.badge && (
                          <span className="px-2 py-0.5 text-[9px] font-black uppercase tracking-wider rounded-md bg-emerald-500 text-zinc-950 dark:bg-emerald-500 dark:text-black shadow-xs">
                            {link.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>

                {/* Quick Anchor Jumps: Only shown when NOT logged in */}
                {!isLoggedIn && (
                  <div className="space-y-1 pt-3 border-t border-zinc-200/60 dark:border-white/5">
                    <p className="text-[10px] font-extrabold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 px-3 mb-2">
                      Platform Highlights
                    </p>
                    <button
                      onClick={() => {
                        setSidebarOpen(false);
                        if (pathname !== "/") {
                          window.location.href = "/#explore";
                        } else {
                          document.getElementById("explore")?.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      className="w-full text-left px-3.5 py-2 rounded-xl text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
                    >
                      Curriculum Matcher
                    </button>
                    <button
                      onClick={() => {
                        setSidebarOpen(false);
                        if (pathname !== "/") {
                          window.location.href = "/#features";
                        } else {
                          document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      className="w-full text-left px-3.5 py-2 rounded-xl text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
                    >
                      Platform Capabilities
                    </button>
                    <button
                      onClick={() => {
                        setSidebarOpen(false);
                        if (pathname !== "/") {
                          window.location.href = "/#pricing";
                        } else {
                          document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      className="w-full text-left px-3.5 py-2 rounded-xl text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
                    >
                      Pricing & Plans
                    </button>
                    <button
                      onClick={() => {
                        setSidebarOpen(false);
                        if (pathname !== "/") {
                          window.location.href = "/#faq";
                        } else {
                          document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      className="w-full text-left px-3.5 py-2 rounded-xl text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
                    >
                      FAQ
                    </button>
                  </div>
                )}

                {/* Show Your Plan Quick CTA */}
                <div className="pt-2">
                  <Link
                    href="/pricing"
                    onClick={() => setSidebarOpen(false)}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-blue-500/10 border border-emerald-500/20 hover:border-emerald-500/40 transition-all group"
                  >
                    <div className="flex items-center space-x-2.5">
                      <div className="w-8 h-8 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                        <CreditCard className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-zinc-900 dark:text-white">Show Your Plan</p>
                        <p className="text-[10px] text-zinc-500 dark:text-zinc-400">Upgrade to Pro for AED 39/mo</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-emerald-500 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* DOWN LEFT BOTTOM: Profile with Free Plan Under Name */}
              <div className="p-4 border-t border-zinc-200/90 dark:border-white/10 bg-zinc-50/70 dark:bg-zinc-950/70">
                <div className="flex items-center justify-between">
                  {/* Down Left Bottom: Avatar, Name, Free Plan */}
                  <div className="flex items-center space-x-3 min-w-0">
                    <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-emerald-500 flex items-center justify-center text-white text-xs font-bold shadow-xs shrink-0">
                      {initials}
                      <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-[#0c0c0e]" />
                    </div>
                    <div className="min-w-0 text-left">
                      <p className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white truncate">
                        {profile.firstName || "Rashid"} {profile.lastName || "Al Nuaimi"}
                      </p>
                      <p className="text-[11px] text-zinc-400 dark:text-zinc-500 font-medium leading-tight">
                        Free Plan
                      </p>
                    </div>
                  </div>

                  {/* Profile Actions: Theme Toggle, Edit Profile & Logout Buttons */}
                  <div className="flex items-center space-x-1 shrink-0">
                    <ThemeToggle className="w-8 h-8 rounded-xl shrink-0" />
                    <button
                      onClick={() => {
                        setSidebarOpen(false);
                        setUpdateProfileOpen(true);
                      }}
                      className="w-8 h-8 rounded-xl flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                      title="Update Profile"
                      aria-label="Update Profile"
                    >
                      <UserCog className="w-4 h-4" />
                    </button>
                    {isLoggedIn && (
                      <button
                        onClick={handleLogout}
                        className="w-8 h-8 rounded-xl flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                        title="Log Out"
                        aria-label="Log Out"
                      >
                        <LogOut className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* Update Student Profile Modal */}
      <UpdateProfileModal
        isOpen={updateProfileOpen}
        onClose={() => setUpdateProfileOpen(false)}
        onProfileUpdated={(updated) => setProfile(updated)}
      />
    </>
  );
}
