import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, Lock } from "lucide-react";
import { ResumeData } from "@/types/resume";
import { templates, TemplateInfo } from "./templates";
import ResumePreview from "./ResumePreview";
import ATSScore from "../ATSscore";
import AuthDialog from "../auth/AuthDialog";
import { api } from "@/api/api";
import { useAuth } from "@/Authprovider/AuthProvider";
import { useNavigate } from "react-router-dom";

interface StepThreeProps {
  data: ResumeData;
  onBack: () => void;
  isLoggedin: boolean;
  mode: string | null;
  resumeId: string | null;
}

const StepThree = ({
  data,
  onBack,
  isLoggedin,
  mode,
  resumeId,
}: StepThreeProps) => {
  const [selectedTemplate, setSelectedTemplate] =
    useState<TemplateInfo>(templates[0]);

  const [authOpen, setauthOpen] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [RecommendJobs, setRecommendJobs] = useState<string[]>([]);
  const [loadingAI, setLoadingAI] = useState(false);
  const [ats, setats] = useState<number | undefined>();

  const { user } = useAuth();
  const navigate = useNavigate();

  const isPro = user?.plan === "pro";

  const handleSave = async () => {
    try {
      if (mode === "edit" && resumeId) {
        await api.put(`/api/resume/${resumeId}`, {
          title: data.fullName,
          template: selectedTemplate.id,
          data: data,
        });
        window.location.href = "/myresume";
        console.log("Updated resume");
      } else {
        await api.post("/api/resume", {
          title: data.fullName,
          template: selectedTemplate.id,
          data: data,
        });
        window.location.href = "/myresume";
        console.log("Created resume");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchAI = async () => {
      if (!isPro) return;

      try {
        setLoadingAI(true);

        const res = await api.post("/ai/groq", {
          resume: data,
        });

        console.log(res.data.data);
        console.log(res.data.data.atsScore);
        console.log(res.data.suggestions);

        setRecommendJobs(res.data.data.recommendedJobRoles);
        setats(res.data.data.atsScore);
        setAiSuggestions(res.data.data.suggestions || []);
      } catch (err) {
        console.error("AI error:", err);
      } finally {
        setLoadingAI(false);
      }
    };

    fetchAI();
  }, [isPro, data]);

  return (
    <div className="animate-fade-in">
      <AuthDialog open={authOpen} onClose={() => setauthOpen(false)} />

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Edit
        </Button>

        <h2 className="text-xl font-display font-bold">
          Preview & Choose Template
        </h2>

        <Button onClick={handleSave} disabled={!isLoggedin}>
          Save
        </Button>

        <Button disabled={!isLoggedin}>Download PDF</Button>
      </div>

      <div className="flex gap-6 items-start">
        {/* LEFT SIDE */}
        <div className="w-64 space-y-4">
          {/* ATS SCORE */}
          <ATSScore score={ats} />

          {/* 🤖 AI SUGGESTION BOX */}
          <div className="border rounded-xl p-3 bg-card relative overflow-hidden">
            {!isPro && (
              <div
                onClick={() => navigate("/pricing")}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center cursor-pointer z-10"
              >
                <div className="text-center text-white px-3">
                  <p className="text-xs font-semibold">
                    AI Suggestions Locked
                  </p>
                  <p className="text-[11px] opacity-80 mt-1">
                    Upgrade to Pro to unlock insights
                  </p>
                </div>
              </div>
            )}

            <div className={!isPro ? "blur-sm pointer-events-none" : ""}>
              <h3 className="text-sm font-semibold mb-2">
                AI Suggestions
              </h3>

              {loadingAI ? (
                <p className="text-xs text-muted-foreground">
                  Generating suggestions...
                </p>
              ) : aiSuggestions.length > 0 ? (
                <ul className="text-md font-bold text-muted-foreground space-y-2">
                  {aiSuggestions.map((tip, i) => (
                    <li key={i}>• {tip}</li>
                  ))}
                </ul>
              ) : (
                <ul className="text-xs text-muted-foreground space-y-2">
                  <li>• Add measurable achievements</li>
                  <li>• Use strong action verbs</li>
                  <li>• Improve ATS keyword matching</li>
                  <li>• Add role-specific skills</li>
                </ul>
              )}
            </div>
          </div>

          {/* 🤖 JOB SUGGESTION BOX */}
          <div className="border rounded-xl p-3 bg-card relative overflow-hidden">
            {!isPro && (
              <div
                onClick={() => navigate("/pricing")}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center cursor-pointer z-10"
              >
                <div className="text-center text-white px-3">
                  <p className="text-xs font-semibold">
                    AI JOB Suggestions Locked
                  </p>
                  <p className="text-[11px] opacity-80 mt-1">
                    Upgrade to Pro to unlock insights
                  </p>
                </div>
              </div>
            )}

            <div className={!isPro ? "blur-sm pointer-events-none" : ""}>
              <h3 className="text-sm font-semibold mb-2">
                RecommendJobs
              </h3>

              {loadingAI ? (
                <p className="text-xs text-muted-foreground">
                  Generating suggestions...
                </p>
              ) : RecommendJobs.length > 0 ? (
                <ul className="text-md font-bold text-muted-foreground space-y-2">
                  {RecommendJobs.map((tip, i) => (
                    <li key={i}>• {tip}</li>
                  ))}
                </ul>
              ) : (
                <ul className="text-xs text-muted-foreground space-y-2">
                  <li>• No Recommend Jobs found !</li>
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* MAIN PREVIEW */}
        <div className="flex-1 min-w-0">
          <div className="bg-muted rounded-xl p-6 flex justify-center overflow-hidden relative">
            <div
              className={!isLoggedin ? "blur-sm pointer-events-none" : ""}
              style={{
                width: 595 * 0.85,
                height: isLoggedin
                  ? 842 * 0.85
                  : (842 * 0.85) / 2,
                overflow: "hidden",
              }}
            >
              <ResumePreview
                data={data}
                template={selectedTemplate}
                scale={0.85}
                height={840}
              />
            </div>

            {!isLoggedin && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/70 backdrop-blur-sm rounded-xl">
                <div className="text-center max-w-xs px-4">
                  <Lock className="w-6 h-6 mx-auto mb-3 text-accent" />
                  <h3 className="font-semibold mb-2">
                    Unlock Full Preview
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Login to view full resume and download PDF.
                  </p>
                  <Button onClick={() => setauthOpen(true)} className="w-full">
                    Login to Continue
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* TEMPLATE LIST */}
        <div className="w-64 shrink-0 space-y-3">
          <h3 className="font-display font-semibold text-sm text-muted-foreground uppercase tracking-wider">
            Templates
          </h3>

          {templates.slice(0, 5).map((t) => (
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
                  <p className="text-xs text-muted-foreground">
                    {t.description}
                  </p>
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