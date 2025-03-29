
// Types for our data
export interface Drug {
  id: string;
  name: string;
  activeIngredient: string;
  manufacturer: string;
  approvalDate: string;
  category: string;
}

export interface ADRReport {
  id: string;
  drugId: string;
  reportDate: string;
  sourceName: string;
  sourceType: "clinical" | "social" | "patient" | "literature";
  severity: "mild" | "moderate" | "severe";
  description: string;
  symptoms: string[];
  confidence: number;
  demographicInfo?: {
    ageGroup?: string;
    gender?: string;
    region?: string;
  };
}

export interface AIInsight {
  id: string;
  drugId: string;
  title: string;
  description: string;
  confidenceScore: number;
  causalFactors: { factor: string; weight: number }[];
  supportingEvidence: { source: string; description: string }[];
  timestamp: string;
  type: "emerging" | "established" | "potential";
}

// Sample drugs data
export const drugs: Drug[] = [
  {
    id: "drug1",
    name: "Lisinopril",
    activeIngredient: "Lisinopril",
    manufacturer: "Various",
    approvalDate: "1987-12-29",
    category: "ACE inhibitor"
  },
  {
    id: "drug2",
    name: "Metformin",
    activeIngredient: "Metformin hydrochloride",
    manufacturer: "Various",
    approvalDate: "1995-03-03",
    category: "Biguanide"
  },
  {
    id: "drug3",
    name: "Atorvastatin",
    activeIngredient: "Atorvastatin calcium",
    manufacturer: "Pfizer",
    approvalDate: "1996-12-17",
    category: "Statin"
  },
  {
    id: "drug4",
    name: "Simvastatin",
    activeIngredient: "Simvastatin",
    manufacturer: "Merck",
    approvalDate: "1991-12-23",
    category: "Statin"
  },
  {
    id: "drug5",
    name: "Omeprazole",
    activeIngredient: "Omeprazole",
    manufacturer: "Various",
    approvalDate: "1989-09-14",
    category: "Proton pump inhibitor"
  }
];

// Sample ADR reports
export const adrReports: ADRReport[] = [
  {
    id: "report1",
    drugId: "drug1",
    reportDate: "2023-06-15",
    sourceName: "FDA Adverse Event Reporting System",
    sourceType: "clinical",
    severity: "moderate",
    description: "Patient experienced persistent dry cough and dizziness after starting treatment",
    symptoms: ["Dry cough", "Dizziness", "Headache"],
    confidence: 0.87,
    demographicInfo: {
      ageGroup: "65+",
      gender: "Female",
      region: "Northeast"
    }
  },
  {
    id: "report2",
    drugId: "drug1",
    reportDate: "2023-05-23",
    sourceName: "Twitter",
    sourceType: "social",
    severity: "mild",
    description: "Been taking Lisinopril for a week and can't stop coughing. Anyone else experienced this?",
    symptoms: ["Cough"],
    confidence: 0.65
  },
  {
    id: "report3",
    drugId: "drug2",
    reportDate: "2023-07-02",
    sourceName: "Patient Survey",
    sourceType: "patient",
    severity: "moderate",
    description: "Experienced gastrointestinal discomfort and nausea after starting medication",
    symptoms: ["Nausea", "Stomach pain", "Diarrhea"],
    confidence: 0.78,
    demographicInfo: {
      ageGroup: "45-64",
      gender: "Male",
      region: "West"
    }
  },
  {
    id: "report4",
    drugId: "drug3",
    reportDate: "2023-06-28",
    sourceName: "Medical Literature Database",
    sourceType: "literature",
    severity: "severe",
    description: "Case study of rhabdomyolysis associated with atorvastatin use",
    symptoms: ["Muscle pain", "Weakness", "Dark urine"],
    confidence: 0.92,
    demographicInfo: {
      ageGroup: "65+",
      gender: "Male",
      region: "Midwest"
    }
  },
  {
    id: "report5",
    drugId: "drug3",
    reportDate: "2023-07-10",
    sourceName: "HealthForum.com",
    sourceType: "social",
    severity: "moderate",
    description: "My doctor put me on Lipitor and I've been having the worst muscle pain ever. Anyone else?",
    symptoms: ["Muscle pain", "Joint pain"],
    confidence: 0.72
  }
];

// Sample AI insights
export const aiInsights: AIInsight[] = [
  {
    id: "insight1",
    drugId: "drug1",
    title: "Persistent Dry Cough Associated with Lisinopril",
    description: "Analysis of multiple data sources indicates a strong association between Lisinopril use and development of a persistent, dry cough. This is likely due to the accumulation of bradykinin in the lungs, a known effect of ACE inhibitors.",
    confidenceScore: 0.92,
    causalFactors: [
      { factor: "Bradykinin accumulation", weight: 0.85 },
      { factor: "ACE inhibition mechanism", weight: 0.90 },
      { factor: "Individual sensitivity", weight: 0.65 }
    ],
    supportingEvidence: [
      { source: "Clinical trials", description: "Found in approximately 5-35% of patients" },
      { source: "Social media", description: "Consistent pattern of user reports" },
      { source: "FDA reports", description: "Consistently listed as common adverse effect" }
    ],
    timestamp: "2023-07-15T08:30:00Z",
    type: "established"
  },
  {
    id: "insight2",
    drugId: "drug2",
    title: "Potential Vitamin B12 Deficiency with Long-term Metformin Use",
    description: "Long-term use of Metformin may be associated with Vitamin B12 deficiency. Our analysis suggests this relationship strengthens with duration of use and dosage.",
    confidenceScore: 0.78,
    causalFactors: [
      { factor: "Intestinal calcium availability", weight: 0.70 },
      { factor: "Altered bacterial flora", weight: 0.65 },
      { factor: "Duration of medication use", weight: 0.85 }
    ],
    supportingEvidence: [
      { source: "Clinical studies", description: "Higher prevalence in long-term users" },
      { source: "Patient reports", description: "Symptoms consistent with B12 deficiency" }
    ],
    timestamp: "2023-07-12T14:15:00Z",
    type: "emerging"
  },
  {
    id: "insight3",
    drugId: "drug3",
    title: "Muscle-Related Adverse Effects of Atorvastatin",
    description: "Comprehensive analysis confirms the association between Atorvastatin and various muscle-related adverse effects ranging from mild myalgia to severe rhabdomyolysis, with risk factors including dosage, age, and concurrent medications.",
    confidenceScore: 0.89,
    causalFactors: [
      { factor: "Inhibition of muscle protein synthesis", weight: 0.80 },
      { factor: "Mitochondrial dysfunction", weight: 0.75 },
      { factor: "Genetic factors (SLCO1B1 gene)", weight: 0.85 }
    ],
    supportingEvidence: [
      { source: "Clinical trials", description: "Documented in 5-10% of patients" },
      { source: "Post-marketing surveillance", description: "Consistent reporting pattern" },
      { source: "Genetic studies", description: "Association with SLCO1B1 variants" }
    ],
    timestamp: "2023-07-10T11:45:00Z",
    type: "established"
  }
];

// ADR statistics for visualization
export const adrStatsByDrug = [
  { drugName: "Lisinopril", severe: 12, moderate: 34, mild: 78 },
  { drugName: "Metformin", severe: 5, moderate: 29, mild: 51 },
  { drugName: "Atorvastatin", severe: 18, moderate: 42, mild: 63 },
  { drugName: "Simvastatin", severe: 15, moderate: 37, mild: 59 },
  { drugName: "Omeprazole", severe: 8, moderate: 25, mild: 47 }
];

export const adrSourceDistribution = [
  { source: "Clinical Reports", count: 325 },
  { source: "Social Media", count: 187 },
  { source: "Patient Feedback", count: 231 },
  { source: "Literature", count: 96 }
];

export const confidenceDistribution = [
  { range: "90-100%", count: 56 },
  { range: "80-89%", count: 128 },
  { range: "70-79%", count: 214 },
  { range: "60-69%", count: 167 },
  { range: "Below 60%", count: 89 }
];

export const timeSeriesData = [
  { month: "Jan", clinicalReports: 24, socialMedia: 15, patientFeedback: 18 },
  { month: "Feb", clinicalReports: 28, socialMedia: 22, patientFeedback: 20 },
  { month: "Mar", clinicalReports: 32, socialMedia: 28, patientFeedback: 26 },
  { month: "Apr", clinicalReports: 35, socialMedia: 32, patientFeedback: 30 },
  { month: "May", clinicalReports: 42, socialMedia: 38, patientFeedback: 34 },
  { month: "Jun", clinicalReports: 48, socialMedia: 42, patientFeedback: 40 },
  { month: "Jul", clinicalReports: 52, socialMedia: 48, patientFeedback: 46 }
];
