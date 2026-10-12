"use strict";

const CENTER_CONTENT = {
  name: "Shiva Sathivka Diagnostic Center",
  founder: "Suresh",
  experience: "30+ Years of Industry Experience",

  phoneDisplay: "+91 98765 43210",
  phoneDigits: "919876543210",
  whatsappDigits: "919876543210",
  address: "Main Road, Near Town Center, Chikkaballapur, Karnataka",
  hours: "Monday - Saturday: 7:00 AM - 8:00 PM, Sunday: 7:00 AM - 1:00 PM"
};

const OFFERS = [
  "🎉 Special 20% OFF on Comprehensive Full Body Health Checkups!",
  "🩸 Free Home Sample Collection Available for Senior Citizens",
  "⚡ Get Fast & Accurate Lab Reports Within 6 Hours",
  "🩺 Special Mon Monsoon Infection Screening Packages Now Live"
];

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
