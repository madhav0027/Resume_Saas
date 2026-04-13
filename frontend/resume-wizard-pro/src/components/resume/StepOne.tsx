import { Upload, PenLine } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StepOneProps {
  onChoose: (method: "upload" | "manual") => void;
}

const StepOne = ({ onChoose }: StepOneProps) => {
  return (
    <div className="animate-fade-in max-w-2xl mx-auto">
      <h2 className="text-2xl font-display font-bold text-center mb-2">
        How would you like to start?
      </h2>
      <p className="text-muted-foreground text-center mb-8">
        Upload an existing resume or build one from scratch
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <button
          onClick={() => onChoose("upload")}
          className="group p-8 rounded-xl border-2 border-border hover:border-accent bg-card transition-all duration-300 hover:shadow-lg text-left"
        >
          <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
            <Upload className="w-6 h-6 text-accent" />
          </div>
          <h3 className="text-lg font-display font-semibold mb-1">Upload Resume</h3>
          <p className="text-sm text-muted-foreground">
            Upload a PDF or DOCX and we'll extract your details
          </p>
        </button>

        <button
          onClick={() => onChoose("manual")}
          className="group p-8 rounded-xl border-2 border-border hover:border-primary bg-card transition-all duration-300 hover:shadow-lg text-left"
        >
          <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
            <PenLine className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-lg font-display font-semibold mb-1">Enter Manually</h3>
          <p className="text-sm text-muted-foreground">
            Fill in your details step by step to create your resume
          </p>
        </button>
      </div>
    </div>
  );
};

export default StepOne;
