import { useState } from "react";
import ResumePreview from "@/components/resume/ResumePreview";
import { sampleResume } from "@/types/resume";
import { templates } from "@/components/resume/templates";
import Navbar from "@/components/Navbar";

const Template = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);

  return (
    <>
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <Navbar/>
      </header>


    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {templates.map((tempdata) => {
        const isSelected = selectedTemplate.id === tempdata.id;
        
        return (
            <div
            key={tempdata.id}
            onClick={() => setSelectedTemplate(tempdata)}
            className={`
                relative cursor-pointer rounded-xl border bg-background
              transition-all duration-300
              hover:-translate-y-1 hover:shadow-lg
              ${
                  isSelected
                  ? " ring-2 ring-accent/30 shadow-md"
                  : "border-border hover:border-accent/60"
                }
                `}
          >
            {/* Accent strip */}
            <div
              className="h-1 w-full rounded-t-xl"
              style={{ backgroundColor: tempdata.accentColor }}
              />

            {/* Compact Preview Box */}
            <div className="p-3">
              <div className="scale-[0.8] origin-top overflow-hidden h-[260px] flex justify-center">
                <ResumePreview
                  data={sampleResume}
                  template={tempdata}
                  scale={1}
                />
              </div>

              {/* Footer info */}
              <div className="mt-2 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold">{tempdata.name}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {tempdata.description}
                  </p>
                </div>

                {isSelected && (
                    <span className="text-[10px] bg-accent text-white px-2 py-1 rounded-full">
                    Selected
                  </span>
                )}
              </div>
            </div>
          </div>
        );
    })}
    </div>
    </>
  );
};

export default Template;