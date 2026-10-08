import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ToastProvider } from "@/components/ToastProvider";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://masaruae.com"),
  title: {
    default: "Masar UAE | The All-in-One UAE Student Co-Pilot",
    template: "%s | Masar UAE",
  },
  description: "AI Past Paper Coach, Admissions CV Builder, Mu'adala Equivalency Guide, and UAE University Matcher for high school and university students in the United Arab Emirates.",
  keywords: [
    "UAE students",
    "Cambridge IGCSE",
    "A-Levels",
    "IB Diploma",
    "CBSE Dubai",
    "American Diploma UAE",
    "AUS Sharjah",
    "NYU Abu Dhabi",
    "Khalifa University",
    "Muadala UAE",
    "MOE Equivalency UAE",
    "Student CV UAE",
    "EmSAT UAE",
  ],
  authors: [{ name: "Masar UAE Team" }],
  creator: "Masar UAE",
  publisher: "Masar UAE",
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: "https://masaruae.com",
    siteName: "Masar UAE",
    title: "Masar UAE | UAE Student Academic & Admissions Co-Pilot",
    description: "AI Past Paper Coach, Admissions CV Builder, and UAE University & Scholarship Matcher for high school and university students across the United Arab Emirates.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Masar UAE | The UAE Student Co-Pilot",
    description: "Comprehensive academic, curriculum equivalency, and university admissions co-pilot tailored specifically to UAE students.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full ${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var t = localStorage.getItem('theme');
                  var isDark = t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches);
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="flex flex-col min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 font-sans antialiased selection:bg-blue-500/20 selection:text-blue-600 dark:selection:bg-emerald-500/20 dark:selection:text-emerald-400 transition-colors duration-200">
        <ToastProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Analytics />
        </ToastProvider>
      </body>
    </html>
  );
}
