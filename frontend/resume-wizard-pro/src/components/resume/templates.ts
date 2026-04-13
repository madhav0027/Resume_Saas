export interface TemplateInfo {
  id: string;
  name: string;
  description: string;
  accentColor: string;
  headerStyle: "left" | "center" | "split";
}

export const templates: TemplateInfo[] = [
  {
    id: "classic",
    name: "Classic ATS",
    description: "Clean recruiter-approved ATS layout",
    accentColor: "#1a365d",
    headerStyle: "left",
  },

  {
    id: "modern",
    name: "Modern Edge",
    description: "Contemporary layout with accent highlight bar",
    accentColor: "#d97706",
    headerStyle: "center",
  },

  {
    id: "minimal",
    name: "Minimal Clean",
    description: "Ultra-clean whitespace focused design",
    accentColor: "#374151",
    headerStyle: "left",
  },

  {
    id: "professional",
    name: "Executive Professional",
    description: "Strong structured layout for senior roles",
    accentColor: "#1e40af",
    headerStyle: "split",
  },

  {
    id: "elegant",
    name: "Elegant Serif",
    description: "Premium serif typography for polished look",
    accentColor: "#6b21a8",
    headerStyle: "center",
  },

  // 🔥 NEW ATS + COMPANY APPROVED TEMPLATES

  {
    id: "hr-approved",
    name: "HR Approved",
    description: "Optimized based on recruiter screening patterns",
    accentColor: "#059669",
    headerStyle: "left",
  },

  {
    id: "google-style",
    name: "Google Style ATS",
    description: "Inspired by Big Tech hiring format",
    accentColor: "#2563eb",
    headerStyle: "left",
  },

  {
    id: "amazon-style",
    name: "Amazon Structured",
    description: "Bullet-heavy, achievement-focused format",
    accentColor: "#f59e0b",
    headerStyle: "split",
  },

  {
    id: "microsoft-clean",
    name: "Microsoft Clean",
    description: "Balanced corporate resume structure",
    accentColor: "#0f172a",
    headerStyle: "center",
  },

  {
    id: "startup-bold",
    name: "Startup Bold",
    description: "Modern aggressive layout for startup hiring",
    accentColor: "#ef4444",
    headerStyle: "split",
  },

  {
    id: "tech-engineer",
    name: "Tech Engineer ATS",
    description: "Perfect for developers and engineers",
    accentColor: "#14b8a6",
    headerStyle: "left",
  },

  {
    id: "fresher-starter",
    name: "Fresher Starter",
    description: "Best for students and entry-level jobs",
    accentColor: "#3b82f6",
    headerStyle: "left",
  },

  {
    id: "elite-premium",
    name: "Elite Premium",
    description: "High-end executive and leadership CV",
    accentColor: "#111827",
    headerStyle: "split",
  },

  {
    id: "ats-ultra",
    name: "ATS Ultra Optimized",
    description: "Maximum compatibility with ATS systems",
    accentColor: "#16a34a",
    headerStyle: "left",
  },
];