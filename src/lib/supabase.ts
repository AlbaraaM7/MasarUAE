import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

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
