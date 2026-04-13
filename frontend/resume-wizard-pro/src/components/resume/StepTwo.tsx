import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ResumeData, Experience, Education, emptyResume } from "@/types/resume";

interface StepTwoProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
  onNext: () => void;
  onBack: () => void;
}

const StepTwo = ({ data, onChange, onNext, onBack }: StepTwoProps) => {
  const [skillInput, setSkillInput] = useState("");

  const update = (field: keyof ResumeData, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const addExperience = () => {
    update("experience", [
      ...data.experience,
      { id: crypto.randomUUID(), title: "", company: "", startDate: "", endDate: "", description: "" },
    ]);
  };

  const updateExp = (id: string, field: keyof Experience, value: string) => {
    update(
      "experience",
      data.experience.map((e) => (e.id === id ? { ...e, [field]: value } : e))
    );
  };

  const removeExp = (id: string) => {
    update("experience", data.experience.filter((e) => e.id !== id));
  };

  const addEducation = () => {
    update("education", [
      ...data.education,
      { id: crypto.randomUUID(), degree: "", school: "", year: "" },
    ]);
  };

  const updateEdu = (id: string, field: keyof Education, value: string) => {
    update(
      "education",
      data.education.map((e) => (e.id === id ? { ...e, [field]: value } : e))
    );
  };

  const removeEdu = (id: string) => {
    update("education", data.education.filter((e) => e.id !== id));
  };

  const addSkill = () => {
    if (skillInput.trim() && !data.skills.includes(skillInput.trim())) {
      update("skills", [...data.skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    update("skills", data.skills.filter((s) => s !== skill));
  };

  return (
    <div className="animate-fade-in max-w-2xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-display font-bold mb-1">Your Details</h2>
        <p className="text-muted-foreground text-sm">Fill in your information to generate a professional resume</p>
      </div>

      {/* Personal Info */}
      <section className="space-y-4">
        <h3 className="font-display font-semibold text-lg border-b border-border pb-2">Personal Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input placeholder="Full Name" value={data.fullName} onChange={(e) => update("fullName", e.target.value)} />
          <Input placeholder="Email" value={data.email} onChange={(e) => update("email", e.target.value)} />
          <Input placeholder="Phone" value={data.phone} onChange={(e) => update("phone", e.target.value)} />
          <Input placeholder="Location" value={data.location} onChange={(e) => update("location", e.target.value)} />
        </div>
        <Textarea placeholder="Professional summary..." value={data.summary} onChange={(e) => update("summary", e.target.value)} rows={3} />
      </section>

      {/* Experience */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-2">
          <h3 className="font-display font-semibold text-lg">Experience</h3>
          <Button variant="outline" size="sm" onClick={addExperience}>
            <Plus className="w-4 h-4 mr-1" /> Add
          </Button>
        </div>
        {data.experience.map((exp) => (
          <div key={exp.id} className="p-4 rounded-lg border border-border space-y-3 relative bg-card">
            <button onClick={() => removeExp(exp.id)} className="absolute top-3 right-3 text-muted-foreground hover:text-destructive">
              <Trash2 className="w-4 h-4" />
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input placeholder="Job Title" value={exp.title} onChange={(e) => updateExp(exp.id, "title", e.target.value)} />
              <Input placeholder="Company" value={exp.company} onChange={(e) => updateExp(exp.id, "company", e.target.value)} />
              <Input placeholder="Start Date" value={exp.startDate} onChange={(e) => updateExp(exp.id, "startDate", e.target.value)} />
              <Input placeholder="End Date" value={exp.endDate} onChange={(e) => updateExp(exp.id, "endDate", e.target.value)} />
            </div>
            <Textarea placeholder="Description..." value={exp.description} onChange={(e) => updateExp(exp.id, "description", e.target.value)} rows={2} />
          </div>
        ))}
      </section>

      {/* Education */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-2">
          <h3 className="font-display font-semibold text-lg">Education</h3>
          <Button variant="outline" size="sm" onClick={addEducation}>
            <Plus className="w-4 h-4 mr-1" /> Add
          </Button>
        </div>
        {data.education.map((edu) => (
          <div key={edu.id} className="p-4 rounded-lg border border-border space-y-3 relative bg-card">
            <button onClick={() => removeEdu(edu.id)} className="absolute top-3 right-3 text-muted-foreground hover:text-destructive">
              <Trash2 className="w-4 h-4" />
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Input placeholder="Degree" value={edu.degree} onChange={(e) => updateEdu(edu.id, "degree", e.target.value)} />
              <Input placeholder="School" value={edu.school} onChange={(e) => updateEdu(edu.id, "school", e.target.value)} />
              <Input placeholder="Year" value={edu.year} onChange={(e) => updateEdu(edu.id, "year", e.target.value)} />
            </div>
          </div>
        ))}
      </section>

      {/* Skills */}
      <section className="space-y-4">
        <h3 className="font-display font-semibold text-lg border-b border-border pb-2">Skills</h3>
        <div className="flex gap-2">
          <Input
            placeholder="Add a skill..."
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
          />
          <Button variant="outline" onClick={addSkill}>Add</Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm"
            >
              {skill}
              <button onClick={() => removeSkill(skill)} className="hover:text-destructive">×</button>
            </span>
          ))}
        </div>
      </section>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Button onClick={onNext}>Preview Resume</Button>
      </div>
    </div>
  );
};

export default StepTwo;
