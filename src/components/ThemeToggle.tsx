"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    const darkMode = document.documentElement.classList.contains("dark");
    setIsDark(darkMode);
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);

    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }

    // Notify any canvas/WebGL components that theme has changed
    window.dispatchEvent(new CustomEvent("masar-theme-changed", { detail: { isDark: nextDark } }));
  };

  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className={cn("w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 transition-all", className)}
      >
        <span className="w-4 h-4" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn("relative w-9 h-9 rounded-xl flex items-center justify-center text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white border border-slate-200/90 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 shadow-2xs hover:shadow-xs transition-all hover:scale-105 active:scale-95", className)}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-400 animate-in zoom-in-75 duration-200" />
      ) : (
        <Moon className="w-4 h-4 text-slate-700 animate-in zoom-in-75 duration-200" />
      )}
    </button>
  );
}
