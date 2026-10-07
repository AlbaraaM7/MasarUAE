import type { Metadata } from "next";
import AuthCard from "@/components/AuthCard";

export const metadata: Metadata = {
  title: "Sign In | MasarUAE - Student Portal",
  description: "Sign in to your MasarUAE student dashboard to track university applications, past papers, and EmSAT preparation.",
};

export default function LoginPage() {
  return <AuthCard initialMode="login" />;
}
