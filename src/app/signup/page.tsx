import type { Metadata } from "next";
import AuthCard from "@/components/AuthCard";

export const metadata: Metadata = {
  title: "Create Account | MasarUAE - Student Portal",
  description: "Create your MasarUAE student account to track university applications, past papers, and EmSAT preparation.",
};

export default function SignUpPage() {
  return <AuthCard initialMode="signup" />;
}
