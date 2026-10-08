# Database Architecture & Security — Masar UAE

## 1. Overview

Masar UAE uses PostgreSQL managed via Supabase. All tables containing user or academic data reside in the `public` schema with PostgreSQL **Row Level Security (RLS)** strictly enabled.

---

## 2. Entity Relationship Overview

```
                   auth.users (Supabase Auth)
                           |
                           v (id = id)
                    public.profiles
                     /     |     \
                    /      |      \
                   v       v       v
 public.student_activities | public.saved_universities
 public.exam_sessions      | public.muadala_progress
                           v
                  public.subscriptions
```

---

## 3. Data Dictionary

### `public.profiles`
Represents the student identity, schooling background, and academic curriculum.
- `id` (UUID, Primary Key): Foreign key linking directly to `auth.users(id)`.
- `full_name` (TEXT, Not Null): Student's display name.
- `email` (TEXT): Student contact email.
- `phone` (TEXT): Optional WhatsApp/phone contact.
- `location` (TEXT, Default `'Dubai, UAE'`): Emirate of residence.
- `school` (TEXT): High school name.
- `curriculum` (TEXT, Default `'British (IGCSE/A-Level)'`): Secondary school curriculum.
- `grade_level` (TEXT, Default `'Year 12'`): Current academic standing.
- `target_major` (TEXT): Intended university degree.
- `volunteer_hours_verified` (INTEGER, Default `0`): Cumulative volunteer hours.
- `study_streak` (INTEGER, Default `1`): Consecutive daily practice sessions.
- `created_at` / `updated_at` (TIMESTAMPTZ): Audit timestamps.

### `public.student_activities`
Tracks extracurricular activities, leadership appointments, and volunteering hours for CV building.
- `id` (UUID, Primary Key): Unique activity identifier.
- `user_id` (UUID, Foreign Key): References `public.profiles(id)` with `ON DELETE CASCADE`.
- `category` (TEXT): Restricted by check constraint to `volunteering`, `leadership`, `club`, `competition`, `honor`.
- `organization` (TEXT): Hosting institution (e.g., Red Crescent, Dubai Cares, Model UN).
- `role` (TEXT): Position held.
- `hours` (INTEGER): Time commitment.
- `description` (TEXT): Brief activity summary.
- `verified` (BOOLEAN, Default `false`): Verification flag.
- `date_completed` (DATE): Completion date.

### `public.exam_sessions`
Audit trail of student practice questions, answers, and AI mark scheme scores.
- `id` (UUID, Primary Key): Unique session ID.
- `user_id` (UUID, Foreign Key): References `public.profiles(id)` with `ON DELETE CASCADE`.
- `curriculum` (TEXT): Curriculum identifier (e.g., `'British (IGCSE/A-Level)'`).
- `subject` (TEXT): Subject (e.g., `'Mathematics'`, `'Physics'`).
- `question_id` (TEXT): Past paper question identifier.
- `question_text` (TEXT): Complete question prompt.
- `student_answer` (TEXT): Student's written answer.
- `awarded_marks` (INTEGER): Marks awarded.
- `max_marks` (INTEGER): Maximum possible marks.
- `percentage` (INTEGER): Score percentage.
- `grade_label` (TEXT): Grade representation (e.g., `'A*'`, `'7'`, `'Distinction'`).
- `feedback` (JSONB): Structured feedback including breakdown, mark scheme points hit, and improvement advice.
- `model_answer` (TEXT): Official mark scheme answer for study reference.

### `public.saved_universities`
Student university application wishlist and admission tracking.
- `id` (UUID, Primary Key): Unique save record ID.
- `user_id` (UUID, Foreign Key): References `public.profiles(id)`.
- `university_id` (TEXT): Matches institution ID in the 79 UAE university database.
- `status` (TEXT): Check constraint: `'target'`, `'reach'`, `'safety'`, `'applied'`, `'accepted'`.
- `notes` (TEXT): Student personal notes.

### `public.muadala_progress`
Student progress through the UAE Ministry of Education high school equivalency requirements.
- `id` (UUID, Primary Key): Unique tracker ID.
- `user_id` (UUID, Foreign Key): References `public.profiles(id)`.
- `curriculum` (TEXT): Student's high school curriculum.
- `step_number` (INTEGER): Step number in the workflow (1-5).
- `is_completed` (BOOLEAN): Status flag.
- `completed_at` (TIMESTAMPTZ): Completion date.
- `notes` (TEXT): Student notes.
- *Constraint*: `UNIQUE(user_id, curriculum, step_number)`.

### `public.subscriptions`
Subscription entitlements and membership status.
- `id` (UUID, Primary Key): Record ID.
- `user_id` (UUID, Foreign Key): References `public.profiles(id)`.
- `stripe_customer_id` (TEXT): Customer reference.
- `stripe_subscription_id` (TEXT): Subscription reference.
- `plan_tier` (TEXT): `'free'`, `'pro_monthly'`, `'pro_annual'`.
- `status` (TEXT, Default `'active'`): Status flag.
- `current_period_end` (TIMESTAMPTZ): Entitlement expiration.

---

## 4. Row Level Security (RLS) Policy Design

Every table enforces isolation based on the authenticated Supabase session (`auth.uid()`):

```sql
-- Pattern for personal records
CREATE POLICY "Users can view own data"
  ON public.<table_name> FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own data"
  ON public.<table_name> FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);
```

### Applying Migrations
All migrations are located in `supabase/migrations/`:
- `supabase/migrations/20261002185716_create_masar_uae_tables.sql`
- `supabase/migrations/20261008000000_secure_rls_policies.sql`

To apply in Supabase:
Execute the contents of `supabase/schema.sql` via the Supabase Dashboard SQL Editor, or run migrations via the Supabase CLI (`supabase db push`).
