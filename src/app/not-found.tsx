import React from "react";
import Link from "next/link";
import { Compass, Home, BookOpen } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-sm shadow-xl">
        <div className="w-14 h-14 mx-auto rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center">
          <Compass className="w-7 h-7" />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-semibold tracking-wider uppercase text-blue-600 dark:text-blue-400">
            404 Error
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Page Not Found
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            The page or student resource you are looking for does not exist or may have moved.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors shadow-sm"
          >
            <Home className="w-4 h-4" />
            Home
          </Link>
          <Link
            href="/universities"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors text-zinc-700 dark:text-zinc-300"
          >
            <BookOpen className="w-4 h-4" />
            Universities Directory
          </Link>
        </div>
      </div>
    </div>
  );
}
