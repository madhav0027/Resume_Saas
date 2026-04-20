import { useEffect, useState } from "react";
import { FileText, Pencil, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResumeData } from "@/types/resume";
import Navbar from "@/components/Navbar";
import { api } from "@/api/api";
import ResumePreview from "@/components/resume/ResumePreview";
import { templates } from "@/components/resume/templates";

type SavedResume = {
  _id: string;
  title: string;
  template: string;
  downloads: number;
  updatedAt: string;
  data: ResumeData;
};

const MyResumes = () => {
  const [resumes, setResumes] = useState<SavedResume[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const res = await api.get("/api/resume/resumes");
        setResumes(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, []);

  // ✏️ EDIT
  const handleEdit = (resume: SavedResume) => {

    window.location.href = `/builder?mode=edit&id=${resume._id}`;
    localStorage.setItem("activeresume",JSON.stringify(resume.data))
  };

  // ⬇️ DOWNLOAD
  const handleDownload = async (id: string) => {
    await api.patch(`/api/resume/${id}/download`);

    setResumes((prev) =>
      prev.map((r) =>
        r._id === id ? { ...r, downloads: r.downloads + 1 } : r
      )
    );
  };

  const getTemplateInfo = (id: string) =>
    templates.find((t) => t.id === id);

  if (loading) return <p className="p-6">Loading...</p>;

return (
  <>
    <header className="border-b border-border px-6 py-4 flex items-center justify-between">
      <Navbar />
    </header>

    <div className="min-h-screen max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Resumes</h1>

      {/* 🔥 EMPTY STATE */}
      {resumes.length === 0 && !loading && (
        <div className="flex items-center justify-center py-20">
          <div className="text-center max-w-md px-6">
            <p className="text-2xl font-semibold text-muted-foreground">
              “No resume found”
            </p>

            <p className="text-sm text-muted-foreground mt-2">
              Create your first professional resume to get started.
            </p>

            <Button
              className="mt-4"
              onClick={() => (window.location.href = "/")}
            >
              Create Resume
            </Button>
          </div>
        </div>
      )}

      {/* LOADING */}
      {loading && <p className="p-6">Loading...</p>}

      {/* RESUME LIST */}
      {resumes.length > 0 && (
        <div className="space-y-4">
          {resumes.map((resume) => {
            const templateInfo = getTemplateInfo(resume.template);

            return (
              <div
                key={resume._id}
                className="border rounded-xl p-4 max-h-[450px] flex justify-between"
              >
                <div>
                  <h2 className="font-semibold">{resume.title}</h2>

                  <p className="text-sm text-muted-foreground">
                    {resume.template}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Downloads: {resume.downloads}
                  </p>

                  {templateInfo && (
                    <div className="mt-2">
                      <ResumePreview
                        data={resume.data}
                        template={templateInfo}
                        scale={0.55}
                        height={300}
                      />
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => handleDownload(resume._id)}
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>

                  <Button onClick={() => handleEdit(resume)}>
                    <Pencil className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  </>
);
};

export default MyResumes;