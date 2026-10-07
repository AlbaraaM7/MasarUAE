export interface MuadalaCurriculumRule {
  curriculum: string;
  badge: string;
  overview: string;
  subjectRequirements: string[];
  mandatorySubjects: string[];
  attestationSteps: {
    stepNumber: number;
    title: string;
    description: string;
    authority: string;
    estimatedTime: string;
  }[];
  commonPitfalls: string[];
  documentsNeeded: string[];
}

export const MUADALA_GUIDES: Record<string, MuadalaCurriculumRule> = {
  british: {
    curriculum: "British Curriculum (GCSE / IGCSE / A-Levels)",
    badge: "Most Common in Dubai & Sharjah",
    overview: "To obtain the UAE Ministry of Education (MOE) Certificate Equivalency for the British curriculum, you must satisfy the minimum required combination of IGCSEs and GCE A-Levels or AS-Levels.",
    subjectRequirements: [
      "Minimum 5 IGCSE / GCSE subjects passed with grades A*, A, B, C or 9 through 4.",
      "Minimum 2 full GCE A-Level subjects passed with grades A* through D (OR 4 AS-Level subjects with grades A through D).",
      "Subjects must not be duplicate/overlapping (e.g. you cannot count both IGCSE Physics and Combined Science as two distinct sciences).",
      "For engineering and medicine university tracks: Mathematics and Physics / Chemistry at A-Level are mandatory."
    ],
    mandatorySubjects: [
      "English Language / English as a Second Language",
      "Mathematics",
      "At least one science subject (Physics, Chemistry, or Biology)",
      "Ministry Arabic & Islamic Education (mandatory if enrolled in UAE private schools)"
    ],
    attestationSteps: [
      {
        stepNumber: 1,
        title: "School & Local Education Authority Stamp",
        description: "Obtain the final leaving certificate and Statement of Results signed by your school principal and attested by KHDA (Dubai), ADEK (Abu Dhabi), or SPEA (Sharjah).",
        authority: "School / KHDA / SPEA / ADEK",
        estimatedTime: "2–4 days"
      },
      {
        stepNumber: 2,
        title: "Exam Board Verification (Cambridge / Pearson Edexcel / Oxford AQA)",
        description: "Request official digital verifying letters or British Council verification stamps on original exam certificates.",
        authority: "British Council UAE",
        estimatedTime: "3–5 days"
      },
      {
        stepNumber: 3,
        title: "MOFA Attestation (If exam taken outside UAE)",
        description: "If exams were sat outside UAE, attest through UAE Embassy abroad and UAE Ministry of Foreign Affairs (MOFA).",
        authority: "MOFA UAE",
        estimatedTime: "1–2 days"
      },
      {
        stepNumber: 4,
        title: "MOE Online Portal Application",
        description: "Create an account on the UAE Ministry of Education portal (moe.gov.ae) using UAE PASS. Upload all attested certificates, valid Emirates ID, and pay the AED 50 fee.",
        authority: "UAE Ministry of Education",
        estimatedTime: "3–7 business days"
      }
    ],
    commonPitfalls: [
      "Submitting preliminary Statements of Results before the official hard-copy Certificate arrives.",
      "Taking 2 A-Levels in subjects that the Ministry considers identical (e.g., Business Studies and Economics counted as single stream).",
      "Not completing Islamic Studies or Arabic exams required for Arab/Muslim passport holders in UAE private schools."
    ],
    documentsNeeded: [
      "Original Statement of Results & Board Certificates for IGCSE and A-Levels",
      "Years 10, 11, 12, 13 (Grades 9–12) official internal school report cards",
      "Valid Emirates ID copy and Passport + UAE Residence Visa",
      "Equivalency fee (AED 50 paid via MOE online e-Dirham / card)"
    ]
  },
  ib: {
    curriculum: "International Baccalaureate (IB Diploma Programme)",
    badge: "Global Standard",
    overview: "The UAE Ministry of Education recognizes the full IB Diploma. IB Course Certificates (CP or individual certificates) without the full Diploma require alternative evaluation pathways.",
    subjectRequirements: [
      "Must be awarded the official IB Diploma by the IBO (minimum 24 total points).",
      "Completed 6 subjects (3 at Higher Level HL and 3 at Standard Level SL).",
      "Successful completion of Theory of Knowledge (TOK), Extended Essay (EE), and Creativity, Activity, Service (CAS).",
      "For engineering majors: Math Analysis & Approaches HL and Physics HL are strongly advised by UAE universities."
    ],
    mandatorySubjects: [
      "Language A (Literature or Language & Literature)",
      "Mathematics (AA or AI)",
      "At least one experimental science",
      "Arabic & Islamic Education (if studying in UAE school)"
    ],
    attestationSteps: [
      {
        stepNumber: 1,
        title: "IBO Transcript Request Direct to MOE",
        description: "Instruct your school IB coordinator or the IBO portal (candidates.ibo.org) to release your official electronic transcripts directly to the UAE Ministry of Education.",
        authority: "International Baccalaureate Organization (Geneva)",
        estimatedTime: "Immediately upon results release in July"
      },
      {
        stepNumber: 2,
        title: "Local School Authority Endorsement",
        description: "Get your Grade 11 & 12 internal school transcripts stamped by KHDA / ADEK / SPEA.",
        authority: "KHDA / ADEK / SPEA",
        estimatedTime: "2–3 days"
      },
      {
        stepNumber: 3,
        title: "MOE Equivalency Portal Submission",
        description: "Log in with UAE PASS to moe.gov.ae, select 'Equivalency of High School Certificate - IB', verify IBO confirmation code, and submit application.",
        authority: "UAE Ministry of Education",
        estimatedTime: "2–5 business days"
      }
    ],
    commonPitfalls: [
      "Waiting until university orientation week to request transcript release from IBO (can cause delayed semester enrollment).",
      "Not achieving the full 24 points or failing the core (TOK/EE) which results in IB Courses rather than the full Diploma."
    ],
    documentsNeeded: [
      "Official IBO Diploma certificate and Transcript of Grades",
      "Internal school transcripts for Grades 10, 11, and 12",
      "Valid Emirates ID and Passport",
      "Payment receipt of AED 50 MOE fee"
    ]
  },
  cbse: {
    curriculum: "Indian Curriculum (CBSE / ICSE / State Board)",
    badge: "Widely Popular in UAE",
    overview: "CBSE Class 12 certificate holders require multi-tier attestation (State Board, Embassy, and MOFA) to obtain the UAE Ministry equivalency.",
    subjectRequirements: [
      "Must have passed Class 12 Board examination with at least 5 subjects.",
      "Must have passed Class 10 Board examination with pass certificates.",
      "For Science/Engineering stream: Physics, Chemistry, Mathematics (PCM) or Biology (PCB) compulsory.",
      "For Commerce/Business track: Mathematics or Accountancy, Economics, Business Studies."
    ],
    mandatorySubjects: [
      "English Core / Elective",
      "Core stream subjects (e.g. PCM, PCB, or Commerce)",
      "Overall pass criteria according to CBSE norms"
    ],
    attestationSteps: [
      {
        stepNumber: 1,
        title: "Indian Embassy / Consulate Attestation",
        description: "Get the original Class 12 Marksheet and Migration/Passing certificate verified by the Indian Consulate (IVS Global in Dubai or Abu Dhabi).",
        authority: "Consulate General of India / IVS",
        estimatedTime: "2–4 days"
      },
      {
        stepNumber: 2,
        title: "UAE Ministry of Foreign Affairs (MOFA)",
        description: "Attest the Embassy-stamped certificates via the MOFA UAE smart application or customer happiness center.",
        authority: "MOFA UAE",
        estimatedTime: "1 day"
      },
      {
        stepNumber: 3,
        title: "MOE Equivalency Portal",
        description: "Upload attested certificates on moe.gov.ae, link DigiLocker verification code if available, and complete equivalency issuance.",
        authority: "UAE Ministry of Education",
        estimatedTime: "3–5 business days"
      }
    ],
    commonPitfalls: [
      "Submitting internet mark sheets instead of original hard-copy certificates from CBSE.",
      "Forgetting to attest the Class 10 mark sheet along with Class 12."
    ],
    documentsNeeded: [
      "CBSE Class 12 Marksheet & Passing Certificate (original & attested)",
      "CBSE Class 10 Marksheet & Passing Certificate",
      "School Leaving Transfer Certificate (TC)",
      "Emirates ID and Passport copy"
    ]
  }
};
