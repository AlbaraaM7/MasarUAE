export interface PastQuestion {
  id: string;
  curriculum: "British (IGCSE/A-Level)" | "IB Diploma" | "CBSE" | "EmSAT";
  level: string; // e.g. "A-Level", "IGCSE", "IB DP Higher Level", "Class 12"
  subject: string;
  paperInfo: string; // e.g. "Cambridge 9702/22 May/June 2023 Q3"
  marks: number;
  question: string;
  contextOrEquation?: string;
  markScheme: {
    points: string[];
    rubricDescription: string;
  };
  commonMistakes: string[];
  modelAnswer: string;
}

export const PAST_QUESTIONS: PastQuestion[] = [
  {
    id: "cambridge-phys-1",
    curriculum: "British (IGCSE/A-Level)",
    level: "A-Level",
    subject: "Physics",
    paperInfo: "Cambridge 9702/22 Oct/Nov 2023 - Q4",
    marks: 4,
    question: "A ball of mass 0.15 kg is dropped from rest from a height of 1.8 m above the ground. It rebounds to a height of 1.2 m. Calculate the magnitude of the impulse exerted by the ground on the ball during the impact. Assume air resistance is negligible.",
    contextOrEquation: "Use g = 9.81 m s⁻²",
    markScheme: {
      points: [
        "M1: Velocity immediately before hitting ground v₁ = √(2gh₁) = √(2 × 9.81 × 1.8) = 5.94 m/s (downwards)",
        "M1: Velocity immediately after rebounding v₂ = √(2gh₂) = √(2 × 9.81 × 1.2) = 4.85 m/s (upwards)",
        "M1: Recognition that change in momentum accounts for direction change: Δp = m(v₂ - (-v₁)) = m(v₂ + v₁)",
        "A1: Calculation of impulse: J = 0.15 × (4.85 + 5.94) = 0.15 × 10.79 = 1.62 N s (or kg m s⁻¹)"
      ],
      rubricDescription: "Full 4 marks require correct signs for opposing velocities and final answer between 1.61 to 1.62 N s with proper units."
    },
    commonMistakes: [
      "Subtracting velocities instead of adding them (forgetting momentum is a vector)",
      "Omitting the unit (N s or kg m s⁻¹) in the final answer",
      "Using rounded intermediate values resulting in 1.5 N s"
    ],
    modelAnswer: "1) Velocity just before impact:\nv₁ = √(2 × 9.81 × 1.8) = 5.943 m s⁻¹ (taking downward as negative, -5.943 m s⁻¹)\n\n2) Velocity just after rebound:\nv₂ = √(2 × 9.81 × 1.2) = 4.852 m s⁻¹ (upwards, +4.852 m s⁻¹)\n\n3) Change in momentum (Impulse = Δp):\nImpulse = m(v₂ - v₁)\nImpulse = 0.15 × (4.852 - (-5.943))\nImpulse = 0.15 × 10.795 = 1.62 N s (or kg m s⁻¹)\n\nMagnitude of impulse = 1.62 N s"
  },
  {
    id: "cambridge-econ-1",
    curriculum: "British (IGCSE/A-Level)",
    level: "A-Level",
    subject: "Economics",
    paperInfo: "Cambridge 9708/21 May/June 2023 - Q2(b)",
    marks: 6,
    question: "Explain two reasons why the price elasticity of supply (PES) of manufactured goods is usually higher than that of agricultural produce.",
    markScheme: {
      points: [
        "1 mark: Clear definition of Price Elasticity of Supply (%ΔQs / %ΔP)",
        "2 marks: Reason 1 - Production time / gestation lag (Manufactured goods can be rapidly adjusted using spare factory capacity, whereas crops require planting, growing season, and weather cycles)",
        "2 marks: Reason 2 - Storage and perishability (Manufactured goods can be easily inventoried and stored without spoiling, while agricultural produce decays quickly unless costly refrigeration is available)",
        "1 mark: Accurate synthesis or conclusion referring to responsiveness to market price signals"
      ],
      rubricDescription: "Award 2 marks each for 2 distinct, fully developed points contrasting manufactured vs agricultural supply."
    },
    commonMistakes: [
      "Defining Price Elasticity of Demand (PED) instead of PES",
      "Stating 'crops take time' without contrasting it with manufacturing capacity and inventory storage",
      "Failing to mention shelf-life or perishability differences"
    ],
    modelAnswer: "Price elasticity of supply (PES) measures the responsiveness of quantity supplied to a change in price (%ΔQs / %ΔP).\n\n1) Production Time & Gestation Period:\nManufactured goods typically have shorter production lead times. If market prices rise, factories can quickly increase output by operating overtime or utilizing excess machine capacity. In contrast, agricultural produce has a long biological gestation period; farmers cannot instantaneously harvest extra wheat or dates in response to price spikes—they must wait for next season's crop cycle.\n\n2) Perishability and Storage Capabilities:\nManufactured goods (e.g. smartphones, electronics) are durable and can easily be stocked in warehouses when prices drop, then released immediately when prices surge. Agricultural crops are largely perishable and spoil quickly unless expensive cold-storage is available, limiting producers' ability to withhold or release supply flexibly."
  },
  {
    id: "ib-bio-1",
    curriculum: "IB Diploma",
    level: "IB DP Higher Level",
    subject: "Biology",
    paperInfo: "IB DP May 2023 Paper 2 - Section B",
    marks: 7,
    question: "Explain the process of transcription in prokaryotes and how it differs from transcription in eukaryotes.",
    markScheme: {
      points: [
        "RNA polymerase binds to the promoter region without transcription factors in prokaryotes (1 mark)",
        "Unwinds DNA double helix and synthesizes mRNA in 5' to 3' direction using complementary base pairing (A-U, C-G) (1 mark)",
        "Transcription reaches terminator sequence and RNA polymerase detaches (1 mark)",
        "Prokaryotes lack a nuclear membrane: transcription and translation occur coupled simultaneously in cytoplasm (1 mark)",
        "Eukaryotes have post-transcriptional RNA modification: 5' methyl-G cap, 3' poly-A tail, and RNA splicing (removal of introns by spliceosomes) (2 marks)",
        "Eukaryotic transcription occurs inside nucleus prior to export (1 mark)"
      ],
      rubricDescription: "Allocate up to 4 marks for prokaryotic transcription steps and 3 marks for explicit eukaryotic differences."
    },
    commonMistakes: [
      "Confusing transcription with translation or DNA replication",
      "Forgetting to mention RNA splicing (introns vs exons) in eukaryotes",
      "Claiming prokaryotes have mRNA splicing"
    ],
    modelAnswer: "Prokaryotic Transcription Process:\n1. Initiation: RNA polymerase recognizes and binds directly to the promoter region of the DNA without requiring complex transcription factors.\n2. Elongation: RNA polymerase unzips the DNA double helix and synthesizes a single-stranded messenger RNA (mRNA) in the 5' to 3' direction, matching RNA nucleotides to template DNA bases (Adenine with Uracil, Cytosine with Guanine).\n3. Termination: RNA polymerase encounters a terminator sequence and dissociates, releasing the nascent mRNA strand.\n\nKey Differences in Eukaryotes:\n1. Cellular Location & Coupling: In prokaryotes, because there is no nuclear membrane, transcription and translation are coupled simultaneously in the cytoplasm. In eukaryotes, transcription occurs strictly in the nucleus, and the mature mRNA must be exported to the cytoplasm.\n2. Post-Transcriptional Modifications: Eukaryotic pre-mRNA undergoes extensive processing including 5' capping, 3' polyadenylation (poly-A tail), and alternative splicing (introns removed by spliceosomes, exons spliced together). Prokaryotic mRNA has no introns and requires no splicing."
  },
  {
    id: "cbse-math-1",
    curriculum: "CBSE",
    level: "Class 12",
    subject: "Mathematics",
    paperInfo: "CBSE All India Board 2023 - Set 1 (Calculus)",
    marks: 5,
    question: "Evaluate the definite integral: ∫ from 0 to π/2 of (sin⁴ x) / (sin⁴ x + cos⁴ x) dx.",
    markScheme: {
      points: [
        "Step 1: Let I = ∫[0 to π/2] (sin⁴ x)/(sin⁴ x + cos⁴ x) dx (1 mark)",
        "Step 2: Apply property ∫[0 to a] f(x) dx = ∫[0 to a] f(a - x) dx (1 mark)",
        "Step 3: Replace x with (π/2 - x) -> sin(π/2 - x) = cos x and cos(π/2 - x) = sin x to get I = ∫[0 to π/2] (cos⁴ x)/(cos⁴ x + sin⁴ x) dx (1 mark)",
        "Step 4: Add equations 1 and 2: 2I = ∫[0 to π/2] (sin⁴ x + cos⁴ x)/(sin⁴ x + cos⁴ x) dx = ∫[0 to π/2] 1 dx (1 mark)",
        "Step 5: 2I = [x][0 to π/2] = π/2 -> I = π/4 (1 mark)"
      ],
      rubricDescription: "Full 5 marks require explicit statement of King's Property and algebraic addition of integrals."
    },
    commonMistakes: [
      "Attempting expansion using trigonometric identities instead of using King's property",
      "Forgetting to divide by 2 at the final step (writing π/2 instead of π/4)"
    ],
    modelAnswer: "Let I = ∫[0 to π/2] [sin⁴ x / (sin⁴ x + cos⁴ x)] dx  ---- (Equation 1)\n\nUsing the definite integral property:\n∫[0 to a] f(x) dx = ∫[0 to a] f(a - x) dx\n\nSubstitute x with (π/2 - x):\nsin(π/2 - x) = cos x\ncos(π/2 - x) = sin x\n\nTherefore:\nI = ∫[0 to π/2] [sin⁴(π/2 - x) / (sin⁴(π/2 - x) + cos⁴(π/2 - x))] dx\nI = ∫[0 to π/2] [cos⁴ x / (cos⁴ x + sin⁴ x)] dx  ---- (Equation 2)\n\nAdding Equation 1 and Equation 2:\n2I = ∫[0 to π/2] [(sin⁴ x + cos⁴ x) / (sin⁴ x + cos⁴ x)] dx\n2I = ∫[0 to π/2] 1 dx\n2I = [x] from 0 to π/2\n2I = π/2 - 0 = π/2\nI = π/4"
  },
  {
    id: "emsat-math-1",
    curriculum: "EmSAT",
    level: "EmSAT Achieve",
    subject: "Mathematics",
    paperInfo: "EmSAT Achieve Math Sample / 2024 Practice",
    marks: 3,
    question: "If 2^(3x - 1) = 16^(x + 2), solve for x.",
    markScheme: {
      points: [
        "1 mark: Express 16 as power of 2: 16 = 2⁴",
        "1 mark: Rewrite RHS: (2⁴)^(x + 2) = 2^(4x + 8)",
        "1 mark: Equate exponents: 3x - 1 = 4x + 8 -> -x = 9 -> x = -9"
      ],
      rubricDescription: "Standard exponential base equivalence method."
    },
    commonMistakes: [
      "Multiplying 4 only by x and forgetting 4 × 2 = 8",
      "Sign error during transposition"
    ],
    modelAnswer: "Given: 2^(3x - 1) = 16^(x + 2)\n\nStep 1: Convert base 16 to base 2:\n16 = 2⁴\n\nStep 2: Rewrite equation:\n2^(3x - 1) = (2⁴)^(x + 2)\n2^(3x - 1) = 2^(4(x + 2))\n2^(3x - 1) = 2^(4x + 8)\n\nStep 3: Since the bases are equal, equate the powers:\n3x - 1 = 4x + 8\n3x - 4x = 8 + 1\n-x = 9\nx = -9"
  }
];
