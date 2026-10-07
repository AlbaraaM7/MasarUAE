import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://tavvxdzqirolotkjzeuk.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRhdnZ4ZHpxaXJvbG90a2p6ZXVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk0MzY2MjEsImV4cCI6MjEwNTAxMjYyMX0.FrZwIbro9u9qpCBcsaVszStULUjFUJnUxsN9_whc0Sc";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface ProfileRecord {
  id: string;
  full_name: string;
  email?: string;
  phone?: string;
  location?: string;
  school?: string;
  curriculum?: string;
  grade_level?: string;
  target_major?: string;
  volunteer_hours_verified?: number;
  study_streak?: number;
  created_at?: string;
}

export interface ActivityRecord {
  id?: string;
  user_id?: string;
  category: "volunteering" | "leadership" | "club" | "competition" | "honor";
  organization: string;
  role: string;
  hours: number;
  description?: string;
  verified?: boolean;
  date_completed?: string;
}

export interface ExamSessionRecord {
  id?: string;
  user_id?: string;
  curriculum: string;
  subject: string;
  question_id?: string;
  question_text: string;
  student_answer: string;
  awarded_marks: number;
  max_marks: number;
  percentage: number;
  grade_label: string;
  feedback: any;
  model_answer?: string;
}
