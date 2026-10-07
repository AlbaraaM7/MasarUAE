import { z } from "zod";

export const GradeRequestSchema = z.object({
  questionId: z.string().optional(),
  curriculum: z.string().min(1, "Curriculum is required"),
  subject: z.string().min(1, "Subject is required"),
  questionText: z.string().min(5, "Question text must be at least 5 characters"),
  studentAnswer: z.string().optional().default(""),
  maxMarks: z.number().int().positive().optional().default(5),
  userId: z.string().uuid().optional(),
  attachmentName: z.string().optional(),
  attachmentType: z.string().optional(),
});

export const ActivitySchema = z.object({
  userId: z.string().uuid().optional(),
  category: z.enum(["volunteering", "leadership", "club", "competition", "honor"]),
  organization: z.string().min(2, "Organization name is required"),
  role: z.string().min(2, "Role / Title is required"),
  hours: z.number().nonnegative().default(0),
  description: z.string().optional().default(""),
  verified: z.boolean().optional().default(false),
  dateCompleted: z.string().optional(),
});

export const UniversityEligibilitySchema = z.object({
  curriculum: z.enum(["british", "ib", "cbse", "american"]),
  grades: z.object({
    aLevels: z.string().optional(), // e.g. "A*AA", "AAB", "BBC"
    ibPoints: z.number().min(24).max(45).optional(),
    cbsePercentage: z.number().min(50).max(100).optional(),
    gpa: z.number().min(2.0).max(4.0).optional(),
  }),
  budgetAED: z.number().positive().optional(),
  emiratePreference: z.string().optional().default("All"),
  targetMajor: z.string().optional(),
});

export const MuadalaProgressSchema = z.object({
  userId: z.string().uuid().optional(),
  curriculum: z.string().min(1),
  stepNumber: z.number().int().positive(),
  isCompleted: z.boolean(),
  notes: z.string().optional(),
});

export const StripeCheckoutSchema = z.object({
  planTier: z.enum(["pro_monthly", "pro_annual", "counselor_monthly", "counselor_annual"]),
  userId: z.string().optional(),
  customerEmail: z.string().email(),
  successUrl: z.string().url(),
  cancelUrl: z.string().url(),
});
