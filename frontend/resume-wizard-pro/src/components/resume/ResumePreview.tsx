import { ResumeData } from "@/types/resume";
import { TemplateInfo } from "./templates";

interface ResumePreviewProps {
  data: ResumeData;
  template: TemplateInfo;
  scale?: number;
}

const ResumePreview = ({ data, template, scale = 1 }: ResumePreviewProps) => {
  const accent = template.accentColor;

  return (
    <div
      className="resume-page origin-top-left"
      style={{
        width: 595,
        minHeight: 842,
        padding: "40px 48px",
        transform: `scale(${scale})`,
        transformOrigin: "top left",
      }}
    >
      {/* Header */}
      {template.headerStyle === "center" ? (
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold" style={{ color: accent }}>{data.fullName || "Your Name"}</h1>
          <p className="text-xs mt-1 text-gray-600">
            {[data.email, data.phone, data.location].filter(Boolean).join(" · ")}
          </p>
        </div>
      ) : template.headerStyle === "split" ? (
        <div className="flex justify-between items-end mb-6 pb-3" style={{ borderBottom: `3px solid ${accent}` }}>
          <h1 className="text-2xl font-bold" style={{ color: accent }}>{data.fullName || "Your Name"}</h1>
          <div className="text-right text-xs text-gray-600 space-y-0.5">
            {data.email && <p>{data.email}</p>}
            {data.phone && <p>{data.phone}</p>}
            {data.location && <p>{data.location}</p>}
          </div>
        </div>
      ) : (
        <div className="mb-6 pb-3" style={{ borderBottom: `2px solid ${accent}` }}>
          <h1 className="text-2xl font-bold" style={{ color: accent }}>{data.fullName || "Your Name"}</h1>
          <p className="text-xs mt-1 text-gray-600">
            {[data.email, data.phone, data.location].filter(Boolean).join(" | ")}
          </p>
        </div>
      )}

      {/* Summary */}
      {data.summary && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: accent }}>
            Professional Summary
          </h2>
          <p className="text-xs leading-relaxed text-gray-700">{data.summary}</p>
        </section>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: accent }}>
            Experience
          </h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-3">
              <div className="flex justify-between items-baseline">
                <span className="font-semibold text-xs">{exp.title}</span>
                <span className="text-[10px] text-gray-500">{exp.startDate} – {exp.endDate}</span>
              </div>
              <p className="text-[10px] text-gray-600 italic">{exp.company}</p>
              {exp.description && (
                <p className="text-xs text-gray-700 mt-1 leading-relaxed">{exp.description}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: accent }}>
            Education
          </h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-2 flex justify-between">
              <div>
                <span className="font-semibold text-xs">{edu.degree}</span>
                <span className="text-[10px] text-gray-600 ml-2">{edu.school}</span>
              </div>
              <span className="text-[10px] text-gray-500">{edu.year}</span>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: accent }}>
            Skills
          </h2>
          <p className="text-xs text-gray-700">{data.skills.join(" · ")}</p>
        </section>
      )}
    </div>
  );
};

export default ResumePreview;
