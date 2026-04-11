

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // Escape special regex chars
}

function extractResumeDetails(text) {
  // ---------- EMAIL ----------
  const emailMatch = text.match(
    /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i
  );

  // ---------- PHONE ----------
  const phoneMatch = text.match(
    /(\+?\d{1,3}[\s-]?)?[6-9]\d{9}|\+?\d{10,14}/
  );

  // ---------- NAME ----------
  const lines = text.split("\n").map(l => l.trim()).filter(Boolean);

  let name = null;

  for (let line of lines.slice(0, 15)) {
    if (/@|www|http|\d|resume|cv/i.test(line)) continue;

    const words = line.split(" ");

    if (words.length >= 2 && words.length <= 4) {
      const isValid = words.every(w => /^[A-Z][a-z]+$/.test(w));
      if (isValid) {
        name = line;
        break;
      }
    }
  }

  // ---------- SKILLS ----------
  const skillKeywords = [
    "JavaScript", "Node.js", "React", "Express", "MongoDB", "Python", "Java", 
    "C++", "HTML", "CSS", "SQL", "AWS", "Docker", "Kubernetes", "Git"
  ];

  const skillsFound = [];
  skillKeywords.forEach(skill => {
    const regex = new RegExp(`\\b${escapeRegex(skill)}\\b`, "i");
    if (text.match(regex)) skillsFound.push(skill);
  });

  // ---------- EDUCATION ----------
  const educationKeywords = [
    "B\\.Sc", "B\\.Tech", "M\\.Sc", "M\\.Tech", "MBA", "Ph\\.D", "Diploma", 
    "High School", "Intermediate", "Bachelor", "Master"
  ];

  const educationFound = [];
  educationKeywords.forEach(edu => {
    const regex = new RegExp(`\\b${edu}\\b`, "i");
    if (text.match(regex)) educationFound.push(edu);
  });

  return {
    name,
    email: emailMatch ? emailMatch[0] : null,
    phone: phoneMatch ? phoneMatch[0] : null,
    skills: skillsFound,
    education: educationFound,
    experience:[]
  };
}

module.exports = { extractResumeDetails };