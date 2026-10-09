export interface StudentProfile {
  id?: string;
  firstName: string;
  lastName: string;
  dob: string;
  email: string;
  location: string;
  grades: string;
  gpa: string;
  school?: string;
  curriculum?: string;
  targetMajor?: string;
  phone?: string;
}

export const DEFAULT_STUDENT_PROFILE: StudentProfile = {
  firstName: "Rashid",
  lastName: "Al-Nuaimi",
  dob: "2007-04-15",
  email: "rashid.alnuaimi@example.ae",
  location: "Dubai",
  grades: "A*AA (Physics, Maths, Chemistry)",
  gpa: "3.9",
  school: "Dubai College",
  curriculum: "British Curriculum (Year 12)",
  targetMajor: "Computer Science",
  phone: "+971 50 123 4567",
};

const STORAGE_KEY = "masar_student_profile";

export function getStudentProfile(): StudentProfile {
  if (typeof window === "undefined") {
    return DEFAULT_STUDENT_PROFILE;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.firstName && parsed.firstName.includes(".")) {
        parsed.firstName = parsed.firstName.split(".")[0];
      }
      return { ...DEFAULT_STUDENT_PROFILE, ...parsed };
    }
  } catch (e) {
    console.error("Failed to read student profile:", e);
  }
  return DEFAULT_STUDENT_PROFILE;
}

export function saveStudentProfile(profile: StudentProfile): void {
  if (typeof window === "undefined") return;
  try {
    if (profile.firstName && profile.firstName.includes(".")) {
      profile.firstName = profile.firstName.split(".")[0];
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    window.dispatchEvent(new CustomEvent("masar_student_profile_updated", { detail: profile }));
  } catch (e) {
    console.error("Failed to save student profile:", e);
  }
}
