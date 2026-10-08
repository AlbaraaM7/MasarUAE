-- Secure Row Level Security (RLS) Migration for Masar UAE
-- Description: Locks down sandbox policies and enforces strict student row ownership via auth.uid()

-- 1. Profiles Table: Only the authenticated student can view or update their profile
DROP POLICY IF EXISTS "Allow anon read profiles" ON public.profiles;
DROP POLICY IF EXISTS "Allow anon insert profiles" ON public.profiles;
DROP POLICY IF EXISTS "Allow anon update profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

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

-- 2. Student Activities Table: Strict user_id ownership
DROP POLICY IF EXISTS "Allow anon select activities" ON public.student_activities;
DROP POLICY IF EXISTS "Allow anon insert activities" ON public.student_activities;
DROP POLICY IF EXISTS "Allow anon delete activities" ON public.student_activities;
DROP POLICY IF EXISTS "Users can view own activities" ON public.student_activities;
DROP POLICY IF EXISTS "Users can insert own activities" ON public.student_activities;
DROP POLICY IF EXISTS "Users can update own activities" ON public.student_activities;
DROP POLICY IF EXISTS "Users can delete own activities" ON public.student_activities;

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

-- 3. Exam Sessions Table: Past paper grading history
DROP POLICY IF EXISTS "Allow anon select exam_sessions" ON public.exam_sessions;
DROP POLICY IF EXISTS "Allow anon insert exam_sessions" ON public.exam_sessions;
DROP POLICY IF EXISTS "Users can view own exam sessions" ON public.exam_sessions;
DROP POLICY IF EXISTS "Users can insert own exam sessions" ON public.exam_sessions;

CREATE POLICY "Users can view own exam sessions"
  ON public.exam_sessions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own exam sessions"
  ON public.exam_sessions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- 4. Saved Universities Table
DROP POLICY IF EXISTS "Allow anon select saved_unis" ON public.saved_universities;
DROP POLICY IF EXISTS "Allow anon insert saved_unis" ON public.saved_universities;
DROP POLICY IF EXISTS "Users can manage own saved universities" ON public.saved_universities;

CREATE POLICY "Users can manage own saved universities"
  ON public.saved_universities FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 5. Muadala Progress Table: Equivalency checklist progress
DROP POLICY IF EXISTS "Allow anon select muadala" ON public.muadala_progress;
DROP POLICY IF EXISTS "Allow anon upsert muadala" ON public.muadala_progress;
DROP POLICY IF EXISTS "Users can manage own muadala progress" ON public.muadala_progress;

CREATE POLICY "Users can manage own muadala progress"
  ON public.muadala_progress FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 6. Subscriptions Table
DROP POLICY IF EXISTS "Allow anon select subscriptions" ON public.subscriptions;
DROP POLICY IF EXISTS "Users can view own subscriptions" ON public.subscriptions;

CREATE POLICY "Users can view own subscriptions"
  ON public.subscriptions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);
