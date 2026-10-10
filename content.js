
"use strict";

const CENTER_CONTENT = {
  name: "Shiva Sathivka Diagnostic Center",
  founder: "Suresh",
  experience: "30+ Years of Industry Experience",

  // Replace these placeholders with verified center information.
  phoneDisplay: "Add your phone number",
  phoneDigits: "",
  whatsappDigits: "",
  address: "Add your complete center address",
  hours: "Add your confirmed working hours"
};

const SERVICES = [
  { name: "Blood Tests", icon: "🩸", description: "Explore blood tests and routine blood investigations." },
  { name: "Diabetes Tests", icon: "🩺", description: "Explore glucose and diabetes-related tests." },
  { name: "Thyroid Tests", icon: "🦋", description: "Explore thyroid function investigations." },
  { name: "Liver Tests", icon: "🧪", description: "Explore liver function investigations." },
  { name: "Kidney Tests", icon: "💧", description: "Explore kidney function and related investigations." },
  { name: "Lipid Profile", icon: "❤️", description: "Explore cholesterol and lipid-related tests." },
  { name: "Urine Tests", icon: "🔬", description: "Explore routine urine investigations." },
  { name: "Stool Tests", icon: "🧫", description: "Explore stool investigations." },
  { name: "Hormone Tests", icon: "⚗️", description: "Explore selected hormone investigations." },
  { name: "Vitamin Tests", icon: "☀️", description: "Explore vitamin level investigations." },
  { name: "Cardiac Tests", icon: "💗", description: "Explore tests related to cardiovascular health." },
  { name: "Infection Tests", icon: "🦠", description: "Explore selected infection-related investigations." },
  { name: "Allergy Tests", icon: "🌿", description: "Enquire about available allergy investigations." },
  { name: "Health Packages", icon: "📋", description: "Explore preventive health screening packages." },
  { name: "Other Tests", icon: "➕", description: "Ask us about other diagnostic investigations." }
];

// Illustrative sample directory. Confirm each test and price with the center.
const TESTS = [
  { name: "Complete Blood Count (CBC)", category: "Blood Tests", price: null },
  { name: "Hemoglobin (Hb)", category: "Blood Tests", price: null },
  { name: "ESR", category: "Blood Tests", price: null },
  { name: "Peripheral Smear", category: "Blood Tests", price: null },
  { name: "Fasting Blood Sugar", category: "Diabetes Tests", price: null },
  { name: "Postprandial Blood Sugar", category: "Diabetes Tests", price: null },
  { name: "Random Blood Sugar", category: "Diabetes Tests", price: null },
  { name: "HbA1c", category: "Diabetes Tests", price: null },
  { name: "TSH", category: "Thyroid Tests", price: null },
  { name: "T3", category: "Thyroid Tests", price: null },
  { name: "T4", category: "Thyroid Tests", price: null },
  { name: "Thyroid Profile", category: "Thyroid Tests", price: null },
  { name: "Liver Function Test (LFT)", category: "Liver Tests", price: null },
  { name: "Bilirubin", category: "Liver Tests", price: null },
  { name: "SGOT / AST", category: "Liver Tests", price: null },
  { name: "SGPT / ALT", category: "Liver Tests", price: null },
  { name: "Kidney Function Test (KFT)", category: "Kidney Tests", price: null },
  { name: "Creatinine", category: "Kidney Tests", price: null },
  { name: "Blood Urea", category: "Kidney Tests", price: null },
  { name: "Uric Acid", category: "Kidney Tests", price: null },
  { name: "Total Cholesterol", category: "Lipid Profile", price: null },
  { name: "Triglycerides", category: "Lipid Profile", price: null },
  { name: "HDL Cholesterol", category: "Lipid Profile", price: null },
  { name: "LDL Cholesterol", category: "Lipid Profile", price: null },
  { name: "Lipid Profile", category: "Lipid Profile", price: null },
  { name: "Urine Routine Examination", category: "Urine Tests", price: null },
  { name: "Urine Culture", category: "Urine Tests", price: null },
  { name: "Urine Protein", category: "Urine Tests", price: null },
  { name: "Stool Routine Examination", category: "Stool Tests", price: null },
  { name: "Stool Occult Blood", category: "Stool Tests", price: null },
  { name: "Vitamin D", category: "Vitamin Tests", price: null },
  { name: "Vitamin B12", category: "Vitamin Tests", price: null },
  { name: "Folate", category: "Vitamin Tests", price: null },
  { name: "Testosterone", category: "Hormone Tests", price: null },
  { name: "Prolactin", category: "Hormone Tests", price: null },
  { name: "LH", category: "Hormone Tests", price: null },
  { name: "FSH", category: "Hormone Tests", price: null },
  { name: "CRP", category: "Infection Tests", price: null },
  { name: "Dengue Screening", category: "Infection Tests", price: null },
  { name: "Malaria Screening", category: "Infection Tests", price: null },
  { name: "Widal Test", category: "Infection Tests", price: null },
  { name: "Total IgE", category: "Allergy Tests", price: null },
  { name: "ECG", category: "Cardiac Tests", price: null },
  { name: "Other Diagnostic Test", category: "Other Tests", price: null }
];

const PACKAGES = [
  {
    name: "Basic Health Checkup",
    label: "Everyday Wellness",
    description: "An introductory screening option. Confirm the final test list before booking.",
    includes: ["Basic screening", "Selected blood tests", "Results discussion"],
    featured: false
  },
  {
    name: "Diabetes Screening",
    label: "Blood Sugar Care",
    description: "A screening package to enquire about if you are monitoring blood glucose.",
    includes: ["Blood glucose test", "HbA1c enquiry", "Test preparation guidance"],
    featured: true
  },
  {
    name: "Thyroid Checkup",
    label: "Thyroid Health",
    description: "Ask the center about its available thyroid screening options.",
    includes: ["TSH enquiry", "T3/T4 enquiry", "Availability confirmation"],
    featured: false
  },
  {
    name: "Liver Health Check",
    label: "Liver Function",
    description: "Enquire about available liver function investigations.",
    includes: ["Liver function enquiry", "Selected investigations", "Preparation guidance"],
    featured: false
  },
  {
    name: "Kidney Health Check",
    label: "Kidney Function",
    description: "Ask about screening options for kidney function.",
    includes: ["Creatinine enquiry", "Urea enquiry", "Availability confirmation"],
    featured: false
  },
  {
    name: "Comprehensive Health Checkup",
    label: "Extended Screening",
    description: "Discuss a broader screening option with the center before booking.",
    includes: ["Multiple test categories", "Package details confirmation", "Preparation guidance"],
    featured: false
  }
];
