import { useEffect, useState } from "react";
import { FileText, Sparkles} from "lucide-react";
import { Button } from "@/components/ui/button";
import StepIndicator from "@/components/resume/StepIndicator";
import StepOne from "@/components/resume/StepOne";
import StepTwo from "@/components/resume/StepTwo";
import StepThree from "@/components/resume/StepThree";
import { ResumeData, emptyResume, sampleResume } from "@/types/resume";
import AuthDialog from "@/components/auth/AuthDialog";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/Authprovider/AuthProvider";
import { api } from "@/api/api";


const STEPS = ["Choose Method", "Enter Details", "Preview"];

const normalizeResume = (data: any): ResumeData => ({
  fullName: data.fullName || data.name || "",
  email: data.email || "",
  phone: data.phone || "",
  location: data.location || "",
  summary: data.summary || "",
  experience: data.experience || [],
  education: data.education || [],
  skills: data.skills || [],
});

const Index = () => {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(1);
  const [resumeData, setResumeData] = useState<ResumeData>(emptyResume);

  const {user} = useAuth();

  useEffect(() => {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // optional (use "auto" if you want instant)
  });
}, [step]);

  const handleChoose = async (method: "upload" | "manual",file?:File) => {
      if (method === "upload" && file) {

        try {
        const formData = new FormData();
        formData.append("file", file);

        const res = await api.post(
          "/api/resume/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true, 
          }
        );

        setResumeData(normalizeResume(res.data.parsed));
      } catch (err) {
        console.error("Upload failed:", err);
      }
    }

    setStep(2);
  };


  if (!started) {
    return (
      <div className="min-h-screen flex flex-col">
        {/* Nav */}
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <Navbar/>
      </header>

        {/* Hero */}
        <main className="grid grid-rows-2 items-center justify-center px-6">
          <div className="text-center max-w-xl animate-fade-in mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4 text-accent" />
              ATS-Optimized Resume Builder
            </div>
            <h1 className="text-4xl sm:text-5xl font-display font-extrabold tracking-tight mb-4">
              Build a resume that
              <span className="block text-accent">gets you hired</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
              Create professional, ATS-friendly resumes in minutes. Choose from
              multiple templates designed to pass applicant tracking systems.
            </p>
            <Button
              size="lg"
              className="text-base px-8 py-6 font-display font-semibold"
              onClick={() => setStarted(true)}
            >
              Create Your Resume
            </Button>
          </div>
          <div className="max-w-4xl mx-auto text-center">
              
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                A smarter way to build your resume
              </h2>

              <p className="text-muted-foreground mb-8">
                Our resume builder SaaS tool is designed to simplify the entire process of creating a professional resume.
                Whether you're a student, fresher, or experienced professional, MiraiCV helps you craft resumes that
                stand out and pass ATS systems with ease.
              </p>

              {/* Feature highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                
                <div className="border border-border rounded-lg p-4 hover:border-accent transition">
                  <h4 className="font-semibold mb-1">⚡ Fast Creation</h4>
                  <p className="text-sm text-muted-foreground">
                    Build your resume in minutes with an intuitive editor.
                  </p>
                </div>

                <div className="border border-border rounded-lg p-4 hover:border-accent transition">
                  <h4 className="font-semibold mb-1">📄 ATS Optimized</h4>
                  <p className="text-sm text-muted-foreground">
                    Designed to pass recruiter software and filters.
                  </p>
                </div>

                <div className="border border-border rounded-lg p-4 hover:border-accent transition">
                  <h4 className="font-semibold mb-1">🎯 Job Ready</h4>
                  <p className="text-sm text-muted-foreground">
                    Tailored templates that match industry standards.
                  </p>
                </div>

              </div>

            </div>
        </main>
          {/* {Price Section} */}
          <div id="pricing" className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* FREE */}
            <div className="border border-border rounded-xl p-6 hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-center">Free</h3>
              <p className="text-3xl font-bold text-center mt-2">₹0</p>

              <ul className="text-sm text-muted-foreground space-y-2 my-6">
                <li>✔ 1 Resume</li>
                <li>✔ Basic Templates</li>
                <li>✔ PDF Download</li>
                <li>✖ ATS Score</li>
                <li>✖ AI Suggestions</li>
              </ul>
            </div>

            {/* PRO */}
            <div className="border border-accent rounded-xl p-6 hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-center">Pro</h3>
              <p className="text-3xl font-bold text-center mt-2">
                ₹299<span className="text-sm font-normal">/month</span>
              </p>

              <ul className="text-sm text-muted-foreground space-y-2 my-6">
                <li>✔ Everything in Plus</li>
                <li>✔ AI Resume Suggestions</li>
                <li>✔ ATS Optimization</li>
                <li>✔ Priority Support</li>
                <li>✔ Job-ready Resume Analysis</li>
              </ul>

              <button className="w-full border border-border rounded-lg py-2 hover:bg-accent">
                Go Pro
              </button>
            </div>
          </div>

          <footer className="border-t border-border mt-12 px-6 py-10">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Brand + About */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-5 h-5 text-accent" />
                <span className="font-bold text-lg">MiraiCV</span>
              </div>
              <p className="text-sm text-muted-foreground">
                MiraiCVAI is a modern resume builder SaaS platform designed to help you
                create ATS-friendly resumes quickly and efficiently. Build, customize,
                and download professional resumes that stand out.
              </p>
            </div>

            {/* Product Links */}
            <div>
              <h4 className="font-semibold mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/template" className="hover:text-foreground transition">Templates</a></li>
                <li><a href="#" className="hover:text-foreground transition">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition">Features</a></li>
                <li><a href="#" className="hover:text-foreground transition">Updates</a></li>
              </ul>
            </div>

            {/* Support / Company */}
            <div>
              <h4 className="font-semibold mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/help" className="hover:text-foreground transition">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground transition">Contact Us</a></li>
                <li><a href="/privacypolicy" className="hover:text-foreground transition">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-foreground transition">Terms of Service</a></li>
              </ul>
            </div>

          </div>

          {/* Bottom */}
          <div className="text-center text-xs text-muted-foreground mt-10">
            © {new Date().getFullYear()} MiraiCV. All rights reserved.
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
        {/* Nav */}
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <Navbar/>
      </header>


      <main className="flex-1 px-6 py-8 max-w-6xl mx-auto w-full">
        <StepIndicator currentStep={step} steps={STEPS} />

        {step === 1 && <StepOne onChoose={handleChoose} />}
        {step === 2 && (
          <StepTwo
            data={resumeData}
            onChange={setResumeData}
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
          />
        )}
        {step === 3 && <StepThree data={resumeData} onBack={() => setStep(2)} isLoggedin={user === null ? false : true} mode="not edit" resumeId=""/>}
      </main>
    </div>
  );
};

export default Index;
