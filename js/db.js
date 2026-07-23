// Aegis Mock Database and AI Rules Engine

export const PATIENT_PROFILES = {
  "sarah-jenkins": {
    id: "sarah-jenkins",
    name: "Sarah Jenkins",
    age: 64,
    gender: "Female",
    weight: "72 kg",
    height: "162 cm",
    bmi: 27.4,
    bloodPressure: "142/90 mmHg",
    cholesterol: "240 mg/dL",
    smokingStatus: "Former smoker",
    preExistingConditions: ["Mild Osteoarthritis", "Borderline Hypertension"],
    currentMedications: ["Lisinopril 10mg QD", "Calcium + D3 Supplement"],
    activeConsultedMeds: [
      { name: "Prasugrel (Effient) 10mg", dosage: "1 tablet daily (morning)", purpose: "Blood clot prevention (antiplatelet)", prescriber: "Dr. Elena Vance, Cardiology", status: "active", startDate: "Aug 2026", adherence: true, note: "Prescribed as genomically-safe alternative to Clopidogrel based on CYP2C19 *2/*2 genotype." },
      { name: "Lisinopril 10mg", dosage: "1 tablet daily (evening)", purpose: "Blood pressure regulation", prescriber: "Dr. Robert Chen, Primary Care", status: "active", startDate: "Apr 2026", adherence: true, note: "Initiated after sustained systolic BP readings above 140 mmHg." },
      { name: "Atorvastatin 20mg", dosage: "1 tablet nightly", purpose: "Lipid / cholesterol management", prescriber: "Dr. Elena Vance, Cardiology", status: "active", startDate: "Aug 2026", adherence: false, note: "Commenced to address hypercholesterolaemia (240 mg/dL) and reduce cardiovascular event risk." },
      { name: "Calcium + D3 Supplement", dosage: "1 capsule daily with food", purpose: "Bone density and joint support", prescriber: "Dr. Robert Chen, Primary Care", status: "active", startDate: "Nov 2025", adherence: true, note: "Long-term support for mild bilateral knee osteoarthritis." },
      { name: "Clopidogrel (Plavix)", dosage: "Discontinued", purpose: "Former antiplatelet attempt", prescriber: "Dr. Robert Chen, Primary Care", status: "discontinued", startDate: "Jun 2026", endDate: "Aug 2026", adherence: false, note: "Discontinued — CYP2C19 Poor Metabolizer status rendered this drug therapeutically inactive." }
    ],
    medicalHistory: [
      { date: "1998", event: "Appendectomy", detail: "Uncomplicated emergency appendix removal. Full recovery." },
      { date: "2012", event: "Gestational Hypertension", detail: "Mild hypertension observed during third trimester; resolved post-delivery." },
      { date: "2019", event: "Right Knee Arthroscopy", detail: "Surgical intervention for medial meniscus tear. Physiotherapy for 12 weeks." },
      { date: "Oct 2025", event: "Osteoarthritis Diagnosis", detail: "Bilateral mild knee osteoarthritis confirmed by X-ray imaging. Calcium and D3 supplementation initiated." },
      { date: "Apr 2026", event: "Hypertension Treatment", detail: "BP consistently above 140/85 mmHg. Lisinopril 10mg initiated." },
      { date: "Jul 2026", event: "Pharmacogenomic Profiling", detail: "Full PGx and disease susceptibility sequencing completed. CYP2C19 Poor Metabolizer and APOE ε4/ε4 identified." },
      { date: "Aug 2026", event: "Medication Adjustment", detail: "Clopidogrel discontinued and replaced with Prasugrel. Atorvastatin added to lipid management plan." }
    ],
    geneticMarkers: {
      cyp2c19: "*2/*2 (Poor Metabolizer)",
      apoe: "ε4/ε4 (High Risk Variant)",
      brca: "Negative",
      hlab5701: "Negative",
      mthfr: "677C>T Heterozygous"
    },
    diseaseRisks: [
      { id: "cvd", name: "Cardiovascular Disease", risk: 78, confidence: 92, level: "danger" },
      { id: "alz", name: "Alzheimer's Disease", risk: 65, confidence: 85, level: "danger" },
      { id: "t2d", name: "Type 2 Diabetes", risk: 38, confidence: 70, level: "warning" },
      { id: "cancer", name: "Colorectal Cancer", risk: 12, confidence: 60, level: "success" }
    ],
    shapContributions: {
      "cvd": [
        { feature: "Age (64)", value: 25, direction: "positive" },
        { feature: "Systolic BP (142)", value: 18, direction: "positive" },
        { feature: "APOE ε4/ε4 Alleles", value: 15, direction: "positive" },
        { feature: "Lisinopril Intake", value: -12, direction: "negative" },
        { feature: "Total Cholesterol (240)", value: 14, direction: "positive" },
        { feature: "Former Smoker", value: 8, direction: "positive" },
        { feature: "Aerobic Activity", value: -5, direction: "negative" }
      ],
      "alz": [
        { feature: "APOE ε4/ε4 Genotype", value: 45, direction: "positive" },
        { feature: "Age (64)", value: 18, direction: "positive" },
        { feature: "High Education Level", value: -8, direction: "negative" },
        { feature: "Mediterranean Diet", value: -6, direction: "negative" },
        { feature: "Physical Inactivity", value: 4, direction: "positive" }
      ],
      "t2d": [
        { feature: "BMI (27.4)", value: 15, direction: "positive" },
        { feature: "Age (64)", value: 12, direction: "positive" },
        { feature: "No Family History", value: -8, direction: "negative" },
        { feature: "Caloric Management", value: -4, direction: "negative" }
      ],
      "cancer": [
        { feature: "Vegetable-Rich Diet", value: -10, direction: "negative" },
        { feature: "No Family History", value: -8, direction: "negative" },
        { feature: "Age (64)", value: 6, direction: "positive" }
      ]
    },
    medications: {
      avoid: [
        { name: "Clopidogrel (Plavix)", classification: "Antiplatelet", reason: "CYP2C19 Poor Metabolizer status (*2/*2) prevents bioactivation of the prodrug, rendering Clopidogrel therapeutically ineffective. High risk of coronary stent thrombosis or recurrent ischemic stroke." },
        { name: "Amitriptyline (Elavil)", classification: "Tricyclic Antidepressant", reason: "CYP2C19 Poor Metabolizer: Diminished drug clearance. Promotes toxicity, prolonged QT intervals, and advanced anticholinergic side effects." }
      ],
      recommended: [
        { name: "Prasugrel (Effient)", classification: "Antiplatelet Alternative", reason: "CYP2C19-independent bioactivation pathway. Delivers consistent antiplatelet therapeutic outcomes, bypasses Poor Metabolizer pharmacogenomic blockage." },
        { name: "Atorvastatin (Lipitor)", classification: "HMG-CoA Reductase Inhibitor", reason: "Initiate lipid management therapy to target hypercholesterolemia (240 mg/dL) and mitigate the 78% cardiovascular risk score." }
      ]
    },
    geneticAnalysis: [
      { gene: "CYP2C19", genotype: "*2/*2", status: "Poor Metabolizer", clinical: "Inefficient conversion of CYP2C19 prodrugs. High risk of therapeutic failure with Clopidogrel. Avoid and substitute.", level: "danger" },
      { gene: "APOE", genotype: "ε4/ε4", status: "Homozygous Carrier", clinical: "10-12x increase in late-onset Alzheimer's disease risk. Associated with elevated LDL cholesterol. Implement active lipid controls.", level: "danger" },
      { gene: "MTHFR", genotype: "677C>T", status: "Heterozygous", clinical: "Mild reduction (approx. 30%) in folate processing. Maintain healthy diet containing active folate forms.", level: "warning" },
      { gene: "BRCA1", genotype: "WT/WT", status: "Wild Type (Normal)", clinical: "No pathologically significant BRCA1 mutations detected. Normal baseline risk profile.", level: "success" }
    ],
    lifestylePlan: [
      { category: "Diet", title: "MIND/Mediterranean Hybrid Diet", desc: "Rich in wild-caught fish, extra virgin olive oil, nuts, and berries to optimize vascular compliance and mitigate neurocognitive risk.", icon: "utensils" },
      { category: "Exercise", title: "Low-Impact Cardio & Resistance", desc: "150 minutes per week of brisk walking, cycling, or rowing. Builds muscle mass to support osteoarthritic joints and manages hypertension.", icon: "activity" },
      { category: "Screening", title: "Vascular & Cognitive Baselines", desc: "Schedule annual neuropsychological assessments, hs-CRP monitoring, and follow up with a carotid ultrasound.", icon: "calendar" }
    ],
    timeline: [
      { date: "Oct 2025", title: "Arthritic Complaint", desc: "Diagnosed with mild bilateral knee osteoarthritis. Managed with physical therapy and calcium.", completed: true },
      { date: "Apr 2026", title: "Antihypertensive Start", desc: "Prescribed 10mg Lisinopril daily after blood pressure consistently exceeded 140/85.", completed: true },
      { date: "Jul 2026", title: "Genomic Profiling", desc: "Successful sequencing of pharmacogenomics (PGx) and disease susceptibility alleles.", completed: true },
      { date: "Aug 2026", title: "Therapeutic Adjustment", desc: "Discontinue Clopidogrel. Transition to Prasugrel. Initiate Atorvastatin lipid management.", completed: false },
      { date: "Jan 2027", title: "MMSE Cognitive Evaluation", desc: "Conduct baseline Mini-Mental State Examination (MMSE) and brain perfusion MRI due to APOE-ε4 risk profile.", completed: false }
    ],
    aiSummary: "Patient presents with elevated cardiovascular risk (78%) driven by age, borderline hypertension, and hypercholesterolemia. Pharmacogenomic analysis reveals a critical CYP2C19 Poor Metabolizer genotype (*2/*2), contraindicating Clopidogrel therapy. Recommend immediate transition to Prasugrel. Homozygous APOE-ε4/ε4 genotype places the patient at high risk for late-onset Alzheimer's Disease, necessitating structured lipid controls and cognitive baseline testing."
  },

  "marcus-chen": {
    id: "marcus-chen",
    name: "Marcus Chen",
    age: 42,
    gender: "Male",
    weight: "96 kg",
    height: "175 cm",
    bmi: 31.3,
    bloodPressure: "128/82 mmHg",
    cholesterol: "195 mg/dL",
    smokingStatus: "Never smoked",
    preExistingConditions: ["Sedentary Lifestyle", "Mild Hepatic Steatosis"],
    currentMedications: ["Multivitamin Daily"],
    activeConsultedMeds: [
      { name: "Metformin 500mg XR", dosage: "1 tablet twice daily with meals", purpose: "Blood sugar regulation and insulin sensitisation", prescriber: "Dr. Amy Yuen, Endocrinology", status: "active", startDate: "Sep 2026", adherence: true, note: "First-line antidiabetic to proactively manage T2D risk (82%). Also hepatoprotective." },
      { name: "Rosuvastatin 5mg", dosage: "1 tablet nightly", purpose: "Mild lipid management and liver-fat reduction", prescriber: "Dr. Amy Yuen, Endocrinology", status: "active", startDate: "Sep 2026", adherence: true, note: "Low-dose statin chosen over Simvastatin due to SLCO1B1 transporter genotype reducing myopathy risk." },
      { name: "L-Methylfolate 1mg", dosage: "1 capsule daily (morning)", purpose: "Active folate supplementation", prescriber: "Dr. Amy Yuen, Endocrinology", status: "active", startDate: "Aug 2026", adherence: true, note: "MTHFR 677T/T homozygous variant reduces standard folic acid conversion. Bioavailable methylfolate bypasses this." },
      { name: "Multivitamin (Men's Formula)", dosage: "1 tablet daily with breakfast", purpose: "General micronutrient maintenance", prescriber: "Self-prescribed", status: "active", startDate: "Jan 2025", adherence: true, note: "General wellness supplement." }
    ],
    medicalHistory: [
      { date: "2015", event: "Mild Dyslipidaemia", detail: "Elevated LDL noted during routine blood work. Lifestyle modification advised." },
      { date: "Jan 2025", event: "NAFLD Diagnosis", detail: "Hepatic ultrasound confirmed non-alcoholic fatty liver disease (mild grade). Weight and dietary management prescribed." },
      { date: "Mar 2026", event: "Pre-diabetic HbA1c Reading", detail: "HbA1c measured at 6.2% (pre-diabetic range). Repeat testing advised in 3 months." },
      { date: "Jul 2026", event: "Full Genomic Screening", detail: "Pharmacogenomic and HLA loci sequenced. HLA-B*5701 (Abacavir contraindication) and MTHFR 677T/T identified." },
      { date: "Sep 2026", event: "Preventive Pharmacotherapy Initiated", detail: "Metformin XR and Rosuvastatin commenced. L-methylfolate supplementation added for MTHFR deficiency." }
    ],
    geneticMarkers: {
      cyp2c19: "*1/*1 (Normal Metabolizer)",
      apoe: "ε3/ε3 (Normal Risk)",
      brca: "Negative",
      hlab5701: "Positive (Hypersensitivity)",
      mthfr: "677T/T (Homozygous Variant)"
    },
    diseaseRisks: [
      { id: "t2d", name: "Type 2 Diabetes", risk: 82, confidence: 90, level: "danger" },
      { id: "cvd", name: "Cardiovascular Disease", risk: 42, confidence: 75, level: "warning" },
      { id: "alz", name: "Alzheimer's Disease", risk: 14, confidence: 70, level: "success" },
      { id: "cancer", name: "Colorectal Cancer", risk: 45, confidence: 65, level: "warning" }
    ],
    shapContributions: {
      "t2d": [
        { feature: "BMI (31.3)", value: 35, direction: "positive" },
        { feature: "TCF7L2 Genotype", value: 20, direction: "positive" },
        { feature: "Sedentary Lifestyle", value: 15, direction: "positive" },
        { feature: "Never Smoked Status", value: -5, direction: "negative" },
        { feature: "Age (42)", value: 5, direction: "positive" }
      ],
      "cvd": [
        { feature: "BMI (31.3)", value: 18, direction: "positive" },
        { feature: "Borderline BP (128/82)", value: 8, direction: "positive" },
        { feature: "APOE ε3/ε3", value: -10, direction: "negative" },
        { feature: "Never Smoked", value: -15, direction: "negative" }
      ],
      "alz": [
        { feature: "APOE ε3/ε3 Genotype", value: -20, direction: "negative" },
        { feature: "Age (42)", value: -15, direction: "negative" }
      ],
      "cancer": [
        { feature: "Low Dietary Fiber", value: 18, direction: "positive" },
        { feature: "BMI (31.3)", value: 12, direction: "positive" },
        { feature: "Age (42)", value: -8, direction: "negative" }
      ]
    },
    medications: {
      avoid: [
        { name: "Abacavir (Ziagen)", classification: "Antiretroviral (NRTI)", reason: "Patient is HLA-B*5701 Positive. Extremely high risk (approaching 100%) of inducing a severe, potentially fatal systemic Abacavir Hypersensitivity Reaction (AHR). Contraindicated." },
        { name: "Simvastatin (Zocor)", classification: "Statin", reason: "SLCO1B1 genotype suggests reduced liver uptake capacity, increasing risk of statin-induced myopathy. Prefer low-dose Rosuvastatin or Pravastatin if cholesterol management is required." }
      ],
      recommended: [
        { name: "Metformin (Glucophage)", classification: "Antidiabetic", reason: "First-line recommendation to manage high diabetes risk (82%) and insulin sensitivity. Promotes weight reduction and hepatoprotective action." },
        { name: "Rosuvastatin (Crestor)", classification: "Low-Dose Statin Alternative", reason: "Compatible with SLCO1B1 status. Recommended at low doses to manage mild lipid elevation and liver fat accumulation safely." }
      ]
    },
    geneticAnalysis: [
      { gene: "HLA-B*5701", genotype: "Positive", status: "Hypersensitivity Risk", clinical: "Carrier of the risk allele. Immediate systemic hypersensitivity to Abacavir. Must document as an allergy.", level: "danger" },
      { gene: "MTHFR", genotype: "677T/T", status: "Homozygous", clinical: "60-70% reduction in folate metabolism. Elevated baseline homocysteine risk. Require active supplementation of methylfolate.", level: "danger" },
      { gene: "CYP2C19", genotype: "*1/*1", status: "Normal Metabolizer", clinical: "Standard clearance rates. Normal response expected for Clopidogrel and standard TCAs.", level: "success" },
      { gene: "APOE", genotype: "ε3/ε3", status: "Wild Type", clinical: "Normal lipid clearance and average baseline neurocognitive risk.", level: "success" }
    ],
    lifestylePlan: [
      { category: "Diet", title: "Ketogenic/Low-Glycemic & High-Fiber", desc: "Restrict simple carbohydrates to control insulin secretion, manage liver steatosis, and reduce diabetes risk.", icon: "utensils" },
      { category: "Exercise", title: "HIIT & Heavy Resistance", desc: "45 mins of high-intensity interval training 3x/week to deplete glycogen reserves and reverse insulin resistance.", icon: "activity" },
      { category: "Screening", title: "Oral Glucose Tolerance Test", desc: "Perform quarterly HbA1c screening, liver enzyme monitoring (AST/ALT), and check homocysteine levels.", icon: "calendar" }
    ],
    timeline: [
      { date: "Jan 2025", title: "Hepatic Ultrasound", desc: "Diagnosed with mild non-alcoholic fatty liver disease (NAFLD). Weight management advised.", completed: true },
      { date: "Jul 2026", title: "Advanced Genomic Screening", desc: "Sequenced pharmacogenomics and major immunological HLA loci.", completed: true },
      { date: "Aug 2026", title: "Metformin Initiation", desc: "Review HbA1c. Proactively initiate 500mg Metformin XR. Transition dietary habits.", completed: false },
      { date: "Nov 2026", title: "Lipid & Liver Panel", desc: "Schedule follow-up liver ultrasound, ALT/AST check, and HbA1c status review.", completed: false }
    ],
    aiSummary: "Marcus presents with a severe risk profile for Type 2 Diabetes (82%), driven by obesity (BMI 31.3) and TCF7L2 genetic susceptibility. Immunological screening indicates a Positive HLA-B*5701 status, creating an absolute contraindication for Abacavir due to hypersensitivity risk. Homozygous MTHFR 677T/T variant compromises folate conversion, requiring methylfolate supplementation. Recommend Metformin initiation, structured HIIT exercise, and carb restriction."
  },

  "elena-rostova": {
    id: "elena-rostova",
    name: "Elena Rostova",
    age: 29,
    gender: "Female",
    weight: "58 kg",
    height: "166 cm",
    bmi: 21.0,
    bloodPressure: "115/70 mmHg",
    cholesterol: "170 mg/dL",
    smokingStatus: "Never smoked",
    preExistingConditions: ["Family History of Breast Cancer"],
    currentMedications: ["Oral Contraceptive (Combination)"],
    activeConsultedMeds: [
      { name: "Progestin-only Pill (Cerazette 75mcg)", dosage: "1 tablet daily at same time each day", purpose: "Hormone-safe contraception", prescriber: "Dr. Priya Nair, Gynaecology", status: "active", startDate: "Sep 2026", adherence: true, note: "Switched from combination OCP to reduce exogenous oestrogen exposure in BRCA1 mutation carrier." },
      { name: "Tamoxifen 20mg (Prophylactic)", dosage: "1 tablet daily", purpose: "Cancer chemoprevention (SERM therapy)", prescriber: "Dr. James Okafor, Oncology", status: "recently-consulted", startDate: "Oct 2026", adherence: false, note: "Selective Estrogen Receptor Modulator being discussed for chemoprevention. Decision pending shared consultation." },
      { name: "Combination OCP (Microgynon 30)", dosage: "Discontinued", purpose: "Former contraceptive", prescriber: "Dr. Priya Nair, Gynaecology", status: "discontinued", startDate: "Jan 2023", endDate: "Sep 2026", adherence: false, note: "Discontinued — oestrogen exposure contraindicated in BRCA1 mutation carriers to minimise breast cancer risk acceleration." }
    ],
    medicalHistory: [
      { date: "2016", event: "Maternal Aunt — Ovarian Cancer", detail: "Maternal aunt diagnosed with FIGO stage III ovarian cancer. Referral to clinical genetics initiated." },
      { date: "2021", event: "Genetic Counselling Session", detail: "Pre-test counselling for hereditary breast and ovarian cancer (HBOC) syndrome risk assessment." },
      { date: "Mar 2024", event: "BRCA1 Sequencing Ordered", detail: "Targeted BRCA1/2 and extended hereditary cancer panel ordered following family history review." },
      { date: "Jul 2026", event: "BRCA1 Pathogenic Variant Confirmed", detail: "Full sequencing confirmed pathogenic BRCA1 mutation with 85% lifetime breast cancer risk. Pharmacogenomic panel completed." },
      { date: "Sep 2026", event: "Contraceptive Transition", detail: "Combination OCP discontinued. Switched to progestin-only Cerazette to eliminate systemic oestrogen exposure." },
      { date: "Oct 2026", event: "Oncology Consultation", detail: "Referred to Dr. Okafor for prophylactic Tamoxifen discussion and bilateral salpingo-oophorectomy counselling." }
    ],
    geneticMarkers: {
      cyp2c19: "*1/*17 (Rapid Metabolizer)",
      apoe: "ε2/ε3 (Low Risk)",
      brca: "BRCA1 Mutation Detected",
      hlab5701: "Negative",
      mthfr: "677C>C (Normal)"
    },
    diseaseRisks: [
      { id: "cancer", name: "Breast & Ovarian Cancer", risk: 85, confidence: 95, level: "danger" },
      { id: "cvd", name: "Cardiovascular Disease", risk: 8, confidence: 80, level: "success" },
      { id: "t2d", name: "Type 2 Diabetes", risk: 10, confidence: 75, level: "success" },
      { id: "alz", name: "Alzheimer's Disease", risk: 5, confidence: 85, level: "success" }
    ],
    shapContributions: {
      "cancer": [
        { feature: "BRCA1 Mutation", value: 65, direction: "positive" },
        { feature: "Family History (Maternal)", value: 12, direction: "positive" },
        { feature: "Combination Pill Use", value: 4, direction: "positive" },
        { feature: "Age (29)", value: -10, direction: "negative" },
        { feature: "Healthy BMI (21.0)", value: -5, direction: "negative" }
      ],
      "cvd": [
        { feature: "Age (29)", value: -25, direction: "negative" },
        { feature: "Optimal BP (115/70)", value: -15, direction: "negative" },
        { feature: "Ideal Cholesterol", value: -10, direction: "negative" },
        { feature: "Oral Contraceptives", value: 5, direction: "positive" }
      ],
      "alz": [
        { feature: "APOE ε2 Protective Allele", value: -30, direction: "negative" },
        { feature: "Age (29)", value: -20, direction: "negative" }
      ],
      "t2d": [
        { feature: "Healthy Weight", value: -20, direction: "negative" },
        { feature: "Active lifestyle", value: -12, direction: "negative" }
      ]
    },
    medications: {
      avoid: [
        { name: "Combination Oral Contraceptives", classification: "Hormonal Contraceptive", reason: "BRCA1 mutation carrier: Estrogen exposure may elevate baseline breast cancer risk further. Suggest transitioning to non-hormonal or progestin-only alternatives." }
      ],
      recommended: [
        { name: "Progestin-only Pill (Mini-pill)", classification: "Hormonal Alternative", reason: "Minimizes systemic estrogen levels, reducing estrogenic stimulation of breast tissues." },
        { name: "Tamoxifen (Prophylactic)", classification: "Selective Estrogen Receptor Modulator", reason: "Discuss prophylactic SERM therapy for chemoprevention of estrogen-receptor positive breast neoplasms." }
      ]
    },
    geneticAnalysis: [
      { gene: "BRCA1", genotype: "Pathogenic Variant", status: "Mutation Detected", clinical: "85% lifetime risk of breast cancer. 40-50% lifetime risk of ovarian cancer. Recommend breast MRI, pelvic exams, and surgical counseling.", level: "danger" },
      { gene: "CYP2C19", genotype: "*1/*17", status: "Rapid Metabolizer", clinical: "Increased clearance of CYP2C19 substrates. Potential requirement for higher dosing in specific tricyclic antidepressants or PPIs.", level: "warning" },
      { gene: "APOE", genotype: "ε2/ε3", status: "Protective Variant", clinical: "Genotype associated with lower LDL levels and decreased risk for late-onset Alzheimer's.", level: "success" },
      { gene: "MTHFR", genotype: "677C>C", status: "Normal", clinical: "Folate metabolism is optimal. Standard folate levels expected with a balanced diet.", level: "success" }
    ],
    lifestylePlan: [
      { category: "Diet", title: "Cruciferous & High-Antioxidant Diet", desc: "Incorporate broccoli, brussels sprouts, and berries which contain active compounds supporting healthy estrogen detoxification pathways.", icon: "utensils" },
      { category: "Exercise", title: "Strength Training & Agility", desc: "Regular aerobic exercise lowers circulating endogenous estrogen levels. Maintain current high-activity status.", icon: "activity" },
      { category: "Screening", title: "High-Risk Surveillance Schedule", desc: "Initiate bi-annual breast MRI screening alternating with mammograms starting at age 30. Discuss salpingo-oophorectomy timing.", icon: "calendar" }
    ],
    timeline: [
      { date: "Mar 2024", title: "Maternal History Documented", desc: "Maternal aunt diagnosed with ovarian cancer. Referral made to clinical genetics.", completed: true },
      { date: "Jul 2026", title: "Targeted BRCA Sequencing", desc: "Sequenced full BRCA1/BRCA2 and pharmacogenomics profiles.", completed: true },
      { date: "Sep 2026", title: "Contraception Review", desc: "Discontinue combination contraceptive. Consult gynecologist for copper IUD or mini-pill replacement.", completed: false },
      { date: "Dec 2026", title: "Breast MRI Baseline", desc: "First baseline contrast-enhanced breast MRI at specialty high-risk breast clinic.", completed: false }
    ],
    aiSummary: "Elena presents with a critical pathogenic BRCA1 variant, yielding an 85% lifetime risk of breast cancer and up to 50% lifetime risk of ovarian cancer. Recommended interventions include stopping combination oral contraceptives, initiating a rigorous high-risk surveillance schedule (alternating breast MRI and mammography starting at age 30), and referral for preventative surgery consultations."
  }
};

// Rules Engine to dynamically create a profile from custom user input
export function generateCustomProfile(data) {
  const age = parseInt(data.age) || 35;
  const weight = parseFloat(data.weight) || 70;
  const height = parseFloat(data.height) || 170;
  const bpSystolic = parseInt(data.bpSystolic) || 120;
  const bpDiastolic = parseInt(data.bpDiastolic) || 80;
  const cholesterol = parseInt(data.cholesterol) || 180;
  const smoking = data.smoking === "true" || data.smoking === true;
  const gender = data.gender || "Male";
  const name = data.name || "Anonymous Patient";
  
  // Calculate BMI
  const heightMeters = height / 100;
  const bmi = parseFloat((weight / (heightMeters * heightMeters)).toFixed(1));

  // Determine Genetic Flags
  const isCyp2c19Poor = data.cyp2c19 === "poor";
  const isApoeE4 = data.apoe === "e4";
  const isBrca1 = data.brca1 === "positive" || data.brca1 === true;
  const isHlab5701 = data.hlab5701 === "positive" || data.hlab5701 === true;
  const isMthfrT = data.mthfr === "variant";

  // Calculate Cardiovascular Disease (CVD) Risk
  let cvdRisk = 10;
  let cvdShap = [];
  
  if (age > 50) { cvdRisk += 20; cvdShap.push({ feature: `Age (${age})`, value: 20, direction: "positive" }); }
  else { cvdShap.push({ feature: `Age (${age})`, value: -10, direction: "negative" }); }

  if (bpSystolic > 140 || bpDiastolic > 90) { cvdRisk += 25; cvdShap.push({ feature: `High BP (${bpSystolic}/${bpDiastolic})`, value: 25, direction: "positive" }); }
  else if (bpSystolic < 120 && bpDiastolic < 80) { cvdRisk -= 10; cvdShap.push({ feature: `Optimal BP (${bpSystolic}/${bpDiastolic})`, value: -10, direction: "negative" }); }
  else { cvdShap.push({ feature: `Normal BP (${bpSystolic}/${bpDiastolic})`, value: 5, direction: "positive" }); }

  if (cholesterol > 220) { cvdRisk += 20; cvdShap.push({ feature: `Hyperlipidemia (${cholesterol})`, value: 20, direction: "positive" }); }
  else { cvdShap.push({ feature: `Normal Cholesterol (${cholesterol})`, value: -8, direction: "negative" }); }

  if (smoking) { cvdRisk += 22; cvdShap.push({ feature: "Active Smoker", value: 22, direction: "positive" }); }
  else { cvdShap.push({ feature: "Never Smoked", value: -12, direction: "negative" }); }

  if (isApoeE4) { cvdRisk += 10; cvdShap.push({ feature: "APOE ε4 Carrier", value: 10, direction: "positive" }); }

  if (bmi > 30) { cvdRisk += 15; cvdShap.push({ feature: `Obesity (BMI ${bmi})`, value: 15, direction: "positive" }); }
  else if (bmi < 25) { cvdShap.push({ feature: `Healthy BMI (${bmi})`, value: -6, direction: "negative" }); }

  cvdRisk = Math.min(Math.max(cvdRisk, 5), 98);

  // Calculate Type 2 Diabetes (T2D) Risk
  let t2dRisk = 8;
  let t2dShap = [];

  if (bmi > 30) { t2dRisk += 40; t2dShap.push({ feature: `Obesity (BMI ${bmi})`, value: 40, direction: "positive" }); }
  else if (bmi > 25) { t2dRisk += 20; t2dShap.push({ feature: `Overweight (BMI ${bmi})`, value: 20, direction: "positive" }); }
  else { t2dShap.push({ feature: `Healthy BMI (${bmi})`, value: -15, direction: "negative" }); }

  if (age > 45) { t2dRisk += 15; t2dShap.push({ feature: `Age (${age})`, value: 15, direction: "positive" }); }
  else { t2dShap.push({ feature: `Age (${age})`, value: -8, direction: "negative" }); }

  if (bpSystolic > 130) { t2dRisk += 12; t2dShap.push({ feature: "Elevated BP", value: 12, direction: "positive" }); }

  t2dRisk = Math.min(Math.max(t2dRisk, 5), 95);

  // Calculate Breast/Ovarian Cancer Risk
  let cancerRisk = 10;
  let cancerShap = [];

  if (isBrca1) {
    cancerRisk = 85;
    cancerShap.push({ feature: "BRCA1 Mutation Detected", value: 70, direction: "positive" });
  } else {
    cancerShap.push({ feature: "BRCA1 Wild Type", value: -15, direction: "negative" });
  }

  if (gender === "Female") {
    cancerRisk += 5;
    cancerShap.push({ feature: "Female Gender", value: 5, direction: "positive" });
  } else {
    cancerRisk = Math.min(cancerRisk, 12); // Men have very low risk even with BRCA1
    cancerShap.push({ feature: "Male Gender Protection", value: -40, direction: "negative" });
  }

  cancerRisk = Math.min(Math.max(cancerRisk, 1), 95);

  // Calculate Alzheimer's Risk
  let alzRisk = 12;
  let alzShap = [];

  if (isApoeE4) {
    alzRisk = 60;
    alzShap.push({ feature: "APOE ε4 Genotype", value: 45, direction: "positive" });
  } else {
    alzShap.push({ feature: "APOE ε3/ε3 Genotype", value: -15, direction: "negative" });
  }

  if (age > 60) {
    alzRisk += 18;
    alzShap.push({ feature: `Age (${age})`, value: 18, direction: "positive" });
  } else {
    alzShap.push({ feature: `Age (${age})`, value: -10, direction: "negative" });
  }

  alzRisk = Math.min(Math.max(alzRisk, 2), 95);

  // Establish Genetic Analysis Table Content
  let geneticAnalysis = [
    { 
      gene: "CYP2C19", 
      genotype: isCyp2c19Poor ? "*2/*2" : "*1/*1", 
      status: isCyp2c19Poor ? "Poor Metabolizer" : "Normal Metabolizer",
      clinical: isCyp2c19Poor ? "Ineffective conversion of Clopidogrel (prodrug). Elevated thrombosis risk. Avoid." : "Normal response expected. Clopidogrel is safe and active.",
      level: isCyp2c19Poor ? "danger" : "success"
    },
    { 
      gene: "APOE", 
      genotype: isApoeE4 ? "ε4/ε4" : "ε3/ε3", 
      status: isApoeE4 ? "High Risk Variant" : "Normal Genotype",
      clinical: isApoeE4 ? "10-12x increase in late-onset Alzheimer's. Maintain optimal vascular health metrics." : "Standard baseline risk. Normal lipid clearance.",
      level: isApoeE4 ? "danger" : "success"
    },
    { 
      gene: "BRCA1", 
      genotype: isBrca1 ? "Pathogenic Variant" : "WT/WT", 
      status: isBrca1 ? "Mutation Detected" : "Wild Type (Normal)",
      clinical: isBrca1 ? "85% lifetime breast cancer risk. Suggest intensive surveillance & preventative consults." : "No pathogenic BRCA mutations detected. Standard surveillance.",
      level: isBrca1 ? "danger" : "success"
    },
    { 
      gene: "HLA-B*5701", 
      genotype: isHlab5701 ? "Positive" : "Negative", 
      status: isHlab5701 ? "Hypersensitivity Risk" : "Normal Tolerance",
      clinical: isHlab5701 ? "High risk of life-threatening hypersensitivity to Abacavir. Avoid Ziagen completely." : "Safe tolerance expected for Abacavir.",
      level: isHlab5701 ? "danger" : "success"
    }
  ];

  if (isMthfrT) {
    geneticAnalysis.push({
      gene: "MTHFR",
      genotype: "677T/T",
      status: "Homozygous Variant",
      clinical: "60% reduction in folate metabolism. Active methylfolate supplementation advised.",
      level: "danger"
    });
  } else {
    geneticAnalysis.push({
      gene: "MTHFR",
      genotype: "677C>C",
      status: "Normal",
      clinical: "Standard folate synthesis. Normal cellular folate conversion.",
      level: "success"
    });
  }

  // Medications matching rules
  let avoidMeds = [];
  let recMeds = [];

  if (isCyp2c19Poor) {
    avoidMeds.push({ name: "Clopidogrel (Plavix)", classification: "Antiplatelet", reason: "CYP2C19 Poor Metabolizer alleles fail to process this prodrug, creating a severe therapeutic blockage and failure of clot prevention." });
    recMeds.push({ name: "Prasugrel (Effient)", classification: "Antiplatelet Alternative", reason: "Safe alternative that bypasses CYP2C19 conversion pathways for secondary prevention." });
  } else {
    recMeds.push({ name: "Clopidogrel (Plavix)", classification: "Antiplatelet", reason: "Compatible with normal CYP2C19 metabolism. Indicated if platelete control is clinically required." });
  }

  if (isHlab5701) {
    avoidMeds.push({ name: "Abacavir (Ziagen)", classification: "Antiretroviral (NRTI)", reason: "HLA-B*5701 Positive status triggers a direct T-cell immune response resulting in life-threatening drug hypersensitivity." });
  }

  if (cvdRisk > 50) {
    recMeds.push({ name: "Atorvastatin (Lipitor)", classification: "Statin Therapy", reason: "Strongly recommended to reduce lipids and lower the high calculated cardiovascular risk profile." });
  }

  if (t2dRisk > 60) {
    recMeds.push({ name: "Metformin (Glucophage)", classification: "Antidiabetic", reason: "First-line prescription for insulin sensitization and to manage diabetes risk progression." });
  }

  // Fallbacks if lists are empty
  if (avoidMeds.length === 0) {
    avoidMeds.push({ name: "None Identifiable", classification: "N/A", reason: "No standard genetic contraindications detected based on current panel." });
  }
  if (recMeds.length === 0) {
    recMeds.push({ name: "Daily Multivitamin", classification: "Supplement", reason: "General wellness maintenance in the absence of acute pharmacogenomic indications." });
  }

  // Lifestyle plans
  let lifestylePlan = [];
  if (cvdRisk > 50 || bmi > 28) {
    lifestylePlan.push({ category: "Diet", title: "Strict Sodium & Fat Restriction", desc: "Adopt DASH or Mediterranean eating plan. Keep sodium under 1500mg daily to optimize blood pressure.", icon: "utensils" });
    lifestylePlan.push({ category: "Exercise", title: "Cardiorespiratory Conditioning", desc: "40 minutes of moderate aerobic workouts 4x per week to promote cardiac hypertrophy regulation.", icon: "activity" });
  } else {
    lifestylePlan.push({ category: "Diet", title: "Balanced Low-Glycemic Intake", desc: "Maintain energy balance with complex fibers, avocados, lean proteins, and polyunsaturated lipids.", icon: "utensils" });
    lifestylePlan.push({ category: "Exercise", title: "Active Maintenance Routine", desc: "30 minutes of mixed walking, core conditioning, and yoga to keep baseline metabolism running high.", icon: "activity" });
  }

  if (isBrca1) {
    lifestylePlan.push({ category: "Screening", title: "High-Resolution Oncology Plan", desc: "Begin annual mammograms and breast MRIs immediately. Consult with a genetics-focused gynecological surgeon.", icon: "calendar" });
  } else {
    lifestylePlan.push({ category: "Screening", title: "Standard Wellness Timeline", desc: "Routine annual biochemical testing, lipid testing, and standard age-related screening checks.", icon: "calendar" });
  }

  // Dynamic AI Summary
  let summary = `Patient ${name} (age ${age}) presents with a custom profile. `;
  if (cvdRisk > 60) summary += `Calculated cardiovascular risk is high (${cvdRisk}%), driven by ${smoking ? "smoking and " : ""}clinical biomarkers. `;
  if (t2dRisk > 60) summary += `Metabolic analysis indicates high risk for Type 2 Diabetes (${t2dRisk}%), primarily linked to elevated BMI (${bmi}). `;
  if (isCyp2c19Poor) summary += "Genomic sequencing identifies CYP2C19 Poor Metabolizer alleles, contraindicating Clopidogrel. ";
  if (isHlab5701) summary += "HLA-B*5701 positivity confirms a critical immunogenic hypersensitivity risk to Abacavir. ";
  if (isBrca1) summary += "Pathogenic BRCA1 variant detected, conferring high risk for hereditary breast and ovarian oncology. ";
  
  if (summary === `Patient ${name} (age ${age}) presents with a custom profile. `) {
    summary += "Current analysis indicates stable risk scores and standard medication compatibilities. Follow general clinical guidelines.";
  }

  // Preexisting and meds arrays
  let conditions = [];
  if (smoking) conditions.push("Chronic Nicotine Exposure");
  if (bmi > 30) conditions.push("Clinical Obesity");
  if (bpSystolic > 140) conditions.push("Hypertension");
  if (conditions.length === 0) conditions.push("No Acute Preexisting Conditions");

  return {
    id: "custom-profile",
    name: name,
    age: age,
    gender: gender,
    weight: `${weight} kg`,
    height: `${height} cm`,
    bmi: bmi,
    bloodPressure: `${bpSystolic}/${bpDiastolic} mmHg`,
    cholesterol: `${cholesterol} mg/dL`,
    smokingStatus: smoking ? "Active smoker" : "Never smoked",
    preExistingConditions: conditions,
    currentMedications: ["N/A (Self-declared)"],
    geneticMarkers: {
      cyp2c19: isCyp2c19Poor ? "*2/*2 (Poor Metabolizer)" : "*1/*1 (Normal)",
      apoe: isApoeE4 ? "ε4/ε4 (High Risk)" : "ε3/ε3 (Normal)",
      brca: isBrca1 ? "BRCA1 Positive" : "Negative",
      hlab5701: isHlab5701 ? "Positive" : "Negative",
      mthfr: isMthfrT ? "Homozygous 677T/T" : "Normal"
    },
    diseaseRisks: [
      { id: "cvd", name: "Cardiovascular Disease", risk: cvdRisk, confidence: 85, level: cvdRisk > 60 ? "danger" : cvdRisk > 30 ? "warning" : "success" },
      { id: "t2d", name: "Type 2 Diabetes", risk: t2dRisk, confidence: 80, level: t2dRisk > 60 ? "danger" : t2dRisk > 30 ? "warning" : "success" },
      { id: "cancer", name: "Breast & Ovarian Cancer", risk: cancerRisk, confidence: 90, level: cancerRisk > 50 ? "danger" : cancerRisk > 20 ? "warning" : "success" },
      { id: "alz", name: "Alzheimer's Disease", risk: alzRisk, confidence: 85, level: alzRisk > 50 ? "danger" : alzRisk > 20 ? "warning" : "success" }
    ],
    shapContributions: {
      "cvd": cvdShap,
      "t2d": t2dShap,
      "cancer": cancerShap,
      "alz": alzShap
    },
    medications: {
      avoid: avoidMeds,
      recommended: recMeds
    },
    geneticAnalysis: geneticAnalysis,
    lifestylePlan: lifestylePlan,
    timeline: [
      { date: "Current", title: "Ad-hoc Medical Sequencing", desc: "Patient completed custom genetic marker entry and physical measurements panel.", completed: true },
      { date: "Next 30 Days", title: "Physician Consult", desc: "Verify findings. Review pharmacogenomics contraindications in primary care record.", completed: false },
      { date: "Next 90 Days", title: "Targeted Diagnostics", desc: "Schedule specific lab checks (e.g. HbA1c, lipid profiles, or imaging depending on risk flags).", completed: false }
    ],
    aiSummary: summary
  };
}

// Simulated Contextual Chatbot Responses
export const CHAT_RESPONSES = {
  "sarah-jenkins": {
    "why is clopidogrel contraindicated?": "Sarah Jenkins possesses the CYP2C19 *2/*2 genotype, indicating she is a Poor Metabolizer. Clopidogrel is a prodrug that must be converted into its active metabolite by the hepatic CYP2C19 enzyme. Because she lacks active CYP2C19 enzyme function, Clopidogrel remains in its inactive form, offering no protection against platelet aggregation and significantly increasing the risk of cardiovascular events, stroke, or coronary thrombosis. Alternative antiplatelet drugs like Prasugrel (Effient) or Ticagrelor (Brilinta) should be used instead.",
    "what is my cardiovascular risk?": "Your calculated Cardiovascular Disease risk is 78%, which is classified as high (Danger). This elevated score is primarily driven by three factors: your age (64), your elevated systolic blood pressure (142 mmHg), and your high cholesterol level (240 mg/dL). Additionally, carrying the homozygous APOE-ε4 alleles increases your susceptibility to vascular lipid build-up. Managing lipids via Atorvastatin, sodium reduction, and low-impact cardiovascular exercises can help reduce this risk.",
    "how does the apoe-e4 gene affect me?": "The APOE ε4/ε4 genotype means you carry two copies of the APOE-ε4 risk variant. This genotype is the strongest genetic risk factor for late-onset Alzheimer's Disease, increasing susceptibility by approximately 10-12 fold. APOE-ε4 is involved in cholesterol transport and is associated with inefficient clearance of amyloid-beta plaques in the brain and elevated LDL cholesterol in blood vessels. It is highly recommended to control cardiovascular risk factors (blood pressure and lipids) and maintain cognitive stimulation and a heart-healthy diet (like the MIND diet).",
    "what is my lifestyle plan?": "Your personalized lifestyle recommendations focus on managing cardiovascular and cognitive health. 1) Diet: Adopt a Mediterranean or MIND diet rich in olive oil, berries, green vegetables, and fish. 2) Exercise: Aim for 150 minutes per week of low-impact cardiorespiratory training to support joints and manage blood pressure. 3) Surveillance: Schedule annual cognitive checkups (such as MMSE) and lipid panel reviews."
  },
  "marcus-chen": {
    "why is abacavir contraindicated?": "Marcus Chen has tested positive for the HLA-B*5701 allele. This is a critical immunological marker. Exposure to Abacavir (Ziagen) in individuals carrying this gene triggers a severe, systemic T-cell mediated hypersensitivity reaction. Symptoms include fever, rash, gastrointestinal distress, and respiratory symptoms, which worsen with continued use and can be fatal. Abacavir is absolutely contraindicated and must be formally documented as an allergen in his electronic health records.",
    "why is simvastatin flagged?": "Simvastatin is flagged for avoidance because your SLCO1B1 transporter genotype suggests reduced hepatic uptake capacity. When SLCO1B1 function is impaired, statin clearance is reduced, leading to higher circulating drug levels. This increases the risk of statin-induced myopathy (muscle pain and weakness) or rhabdomyolysis. If lipid control is required, we recommend a lower-risk alternative like low-dose Rosuvastatin (Crestor) or Pravastatin.",
    "how can i manage my diabetes risk?": "Your Type 2 Diabetes risk is 82%, which is highly elevated. This is due to a combination of genetic susceptibility (TCF7L2 variant) and physical factors (BMI of 31.3 indicating obesity, coupled with a sedentary lifestyle). This risk can be actively managed and potentially reversed by: 1) Initiating Metformin 500mg daily (as recommended by the clinical model), 2) Restricting fast-acting carbohydrates and sugars, and 3) Implementing a consistent High-Intensity Interval Training (HIIT) and strength building routine to restore cell insulin sensitivity.",
    "what does mthfr 677t/t mean?": "The MTHFR 677T/T genotype represents a homozygous variant, meaning you inherited two copies of the 677T allele. This variant reduces the efficiency of the MTHFR enzyme by approximately 60-70%, impairing your body's ability to convert synthetic folic acid into its active, bioavailable form (methylfolate). This can lead to elevated levels of homocysteine, a biomarker associated with vascular inflammation. You should prioritize dietary sources of natural folate, supplement with L-methylfolate rather than standard folic acid, and monitor homocysteine levels."
  },
  "elena-rostova": {
    "what does brca1 mutation mean?": "Elena Rostova carries a pathogenic mutation in the BRCA1 gene. BRCA1 is a tumor suppressor gene responsible for repairing DNA double-strand breaks. A mutation impairs this repair mechanism, leading to genomic instability and a highly elevated lifetime risk of developing Breast Cancer (up to 85%) and Ovarian Cancer (up to 40-50%). Since she is 29, the immediate clinical priority is to establish a high-risk surveillance schedule, avoid estrogen-heavy oral contraceptives, and discuss prophylactic surgical options.",
    "why should i stop oral contraceptives?": "Standard combination oral contraceptives contain synthetic estrogen. Estrogen stimulates breast tissue epithelial cell growth, which in carriers of pathogenic BRCA1 mutations can further accelerate the risk of breast cell transformation. To minimize exogenous hormone exposure, it is highly recommended to discontinue combination oral contraceptives and substitute them with non-hormonal options (e.g., copper IUD) or progestin-only alternatives under gynecological supervision.",
    "what is my surveillance schedule?": "For BRCA1 mutation carriers, standard high-risk breast screening begins at age 25-30. We recommend alternating contrast-enhanced breast MRI with high-resolution digital mammograms every 6 months. Additionally, annual pelvic ultrasounds and CA-125 serum tests are recommended for ovarian cancer surveillance, although their screening efficacy is lower, highlighting the importance of discussing risk-reducing surgeries (e.g., salpingo-oophorectomy) once family planning is complete.",
    "what are my recommended medications?": "The system recommends transitioning to a progestin-only contraceptive (Mini-pill) to avoid high-dose estrogen exposure. Additionally, chemoprevention using Selective Estrogen Receptor Modulators (SERMs) like Tamoxifen can be discussed with an oncologist, as it can reduce the risk of estrogen receptor-positive breast cancers by up to 50% in high-risk patients."
  },
  "default": {
    "what is personalized medicine?": "Personalized medicine, or precision medicine, is an innovative approach to healthcare that tailors medical treatment to the individual characteristics of each patient. Instead of a one-size-fits-all model, it integrates genomics, clinical biomarkers, environmental factors, and lifestyle habits to predict disease risk, avoid dangerous drug interactions, and select optimal therapeutics.",
    "how does pharmacogenomics work?": "Pharmacogenomics (PGx) studies how a person's genes affect their response to drugs. Variations in liver enzymes (such as the CYP450 family: CYP2C19, CYP2D6) or immune system molecules (like HLA genes) can cause individuals to metabolize drugs too quickly (ineffective treatment), too slowly (toxic buildup), or trigger severe allergic reactions. Identifying these variations beforehand prevents adverse drug events.",
    "what are shap charts?": "SHAP (SHapley Additive exPlanations) values are a mathematical method used in explainable AI (XAI) to break down the predictions of machine learning models. In this dashboard, the SHAP chart shows exactly which patient features (e.g. age, blood pressure, specific genes) increased the disease risk (shown in red bars) or decreased it (shown in green bars) relative to a baseline population.",
    "generic_help": "I can explain the patient's genetic markers, drug contraindications (such as Clopidogrel or Abacavir), lifestyle plans, or explain the AI calculations behind the disease risk scores. What specific aspect of the diagnosis would you like to review?"
  }
};
