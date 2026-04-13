import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check } from "lucide-react";
import { ResumeData } from "@/types/resume";
import { templates, TemplateInfo } from "./templates";
import ResumePreview from "./ResumePreview";

interface StepThreeProps {
  data: ResumeData;
  onBack: () => void;
}

const StepThree = ({ data, onBack }: StepThreeProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateInfo>(templates[0]);

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Edit
        </Button>
        <h2 className="text-xl font-display font-bold">Preview & Choose Template</h2>
        <Button>Download PDF</Button>
      </div>

      <div className="flex gap-6 items-start">
        {/* Main Preview */}
        <div className="flex-1 min-w-0">
          <div className="bg-muted rounded-xl p-6 flex justify-center overflow-hidden">
            <div style={{ width: 595 * 0.85, height: 842 * 0.85, overflow: "hidden" }}>
              <ResumePreview data={data} template={selectedTemplate} scale={0.85} />
            </div>
          </div>
        </div>

        {/* Template Gallery */}
        <div className="w-64 shrink-0 space-y-3">
          <h3 className="font-display font-semibold text-sm text-muted-foreground uppercase tracking-wider">
            Templates
          </h3>
          {templates.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedTemplate(t)}
              className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                selectedTemplate.id === t.id
                  ? "border-accent bg-accent/5"
                  : "border-border hover:border-muted-foreground/30 bg-card"
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Mini preview swatch */}
                <div
                  className="w-10 h-14 rounded border border-border flex-shrink-0"
                  style={{
                    background: `linear-gradient(to bottom, ${t.accentColor} 25%, white 25%)`,
                  }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-medium text-sm">{t.name}</span>
                    {selectedTemplate.id === t.id && (
                      <Check className="w-3.5 h-3.5 text-accent" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{t.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StepThree;
