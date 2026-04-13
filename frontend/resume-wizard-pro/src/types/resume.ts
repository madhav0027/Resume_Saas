export interface ResumeData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  year: string;
}

export const emptyResume: ResumeData = {
  fullName: "",
  email: "",
  phone: "",
  location: "",
  summary: "",
  experience: [],
  education: [],
  skills: [],
};

export const sampleResume: ResumeData = {
  fullName: "Alex Johnson",
  email: "alex.johnson@email.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  summary: "Results-driven software engineer with 5+ years of experience building scalable web applications. Proficient in React, TypeScript, and Node.js with a passion for clean code and user-centric design.",
  experience: [
    {
      id: "1",
      title: "Senior Frontend Engineer",
      company: "TechCorp Inc.",
      startDate: "Jan 2022",
      endDate: "Present",
      description: "Led frontend architecture for a SaaS platform serving 50K+ users. Reduced load times by 40% through code splitting and lazy loading. Mentored 3 junior developers.",
    },
    {
      id: "2",
      title: "Software Engineer",
      company: "StartupXYZ",
      startDate: "Jun 2019",
      endDate: "Dec 2021",
      description: "Built and maintained React-based dashboard used by enterprise clients. Implemented CI/CD pipelines reducing deployment time by 60%.",
    },
  ],
  education: [
    {
      id: "1",
      degree: "B.S. Computer Science",
      school: "University of California, Berkeley",
      year: "2019",
    },
  ],
  skills: ["React", "TypeScript", "Node.js", "Python", "AWS", "Docker", "GraphQL", "PostgreSQL"],
};
