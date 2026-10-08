-- ==============================================================================
-- MASAR UAE - CONSOLIDATED DATABASE SCHEMA & PRODUCTION SECURITY POLICIES
-- PostgreSQL 15+ / Supabase
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE (Associated with auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  location TEXT DEFAULT 'Dubai, UAE',
  school TEXT,
  curriculum TEXT DEFAULT 'British (IGCSE/A-Level)',
  grade_level TEXT DEFAULT 'Year 12',
  target_major TEXT,
  volunteer_hours_verified INTEGER DEFAULT 0,
  study_streak INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. STUDENT ACTIVITIES & VOLUNTEERING TABLE
CREATE TABLE IF NOT EXISTS public.student_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  category TEXT NOT NULL CHECK (category IN ('volunteering', 'leadership', 'club', 'competition', 'honor')),
  organization TEXT NOT NULL,
  role TEXT NOT NULL,
  hours INTEGER DEFAULT 0,
  description TEXT,
  verified BOOLEAN DEFAULT false,
  date_completed DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. EXAM SESSIONS & AI GRADING LOGS
CREATE TABLE IF NOT EXISTS public.exam_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  curriculum TEXT NOT NULL,
  subject TEXT NOT NULL,
  question_id TEXT,
  question_text TEXT NOT NULL,
  student_answer TEXT NOT NULL,
  awarded_marks INTEGER NOT NULL,
  max_marks INTEGER NOT NULL,
  percentage INTEGER NOT NULL,
  grade_label TEXT NOT NULL,
  feedback JSONB NOT NULL,
  model_answer TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. SAVED UNIVERSITIES & APPLICATIONS
CREATE TABLE IF NOT EXISTS public.saved_universities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  university_id TEXT NOT NULL,
  status TEXT DEFAULT 'target' CHECK (status IN ('target', 'reach', 'safety', 'applied', 'accepted')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. MUADALA (EQUIVALENCY) PROGRESS TRACKER
CREATE TABLE IF NOT EXISTS public.muadala_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  curriculum TEXT NOT NULL,
  step_number INTEGER NOT NULL,
  is_completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ,
  notes TEXT,
  UNIQUE(user_id, curriculum, step_number)
);

-- 6. SUBSCRIPTIONS & ENTITLEMENTS
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  plan_tier TEXT DEFAULT 'free' CHECK (plan_tier IN ('free', 'pro_monthly', 'pro_annual')),
  status TEXT DEFAULT 'active',
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- PERFORMANCE INDEXES
CREATE INDEX IF NOT EXISTS idx_activities_user ON public.student_activities(user_id);
CREATE INDEX IF NOT EXISTS idx_exam_user ON public.exam_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_unis_user ON public.saved_universities(user_id);
CREATE INDEX IF NOT EXISTS idx_muadala_user ON public.muadala_progress(user_id);

-- ENABLE ROW LEVEL SECURITY
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_universities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.muadala_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- SECURE ROW LEVEL SECURITY POLICIES (STUDENT ISOLATION)
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view own activities"
  ON public.student_activities FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own activities"
  ON public.student_activities FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own activities"
  ON public.student_activities FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own activities"
  ON public.student_activities FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view own exam sessions"
  ON public.exam_sessions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own exam sessions"
  ON public.exam_sessions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can manage own saved universities"
  ON public.saved_universities FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can manage own muadala progress"
  ON public.muadala_progress FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own subscriptions"
  ON public.subscriptions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);
