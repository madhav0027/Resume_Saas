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

const STEPS = ["Choose Method", "Enter Details", "Preview"];

const Index = () => {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(1);
  const [resumeData, setResumeData] = useState<ResumeData>(emptyResume);


  const handleChoose = (method: "upload" | "manual") => {
    if (method === "upload") {
      // For now, load sample data to simulate upload
      setResumeData(sampleResume);
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
        <div id="pricing" className="scroll-mt-24 w-full justify-center items-center p-8 max-w-full grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Free Plan */}
            <div className="border border-border rounded-xl p-6 cursor-pointer hover:border-accent transition">
              <h3 className="text-xl font-semibold mb-2">Free</h3>
              <p className="text-3xl font-bold mb-4">₹0</p>
              <ul className="text-sm text-muted-foreground space-y-2 mb-6">
                <li>1 Resume</li>
                <li>Basic Templates</li>
                <li>Download as PDF</li>
              </ul>
              <button className="w-full border border-border rounded-lg py-2 hover:bg-muted transition">
                Get Started
              </button>
            </div>

            {/* Plus Plan */}
            <div className="border border-accent rounded-xl p-6 cursor-pointer shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">Plus</h3>
              <p className="text-3xl font-bold mb-4">₹299</p>
              <ul className="text-sm text-muted-foreground space-y-2 mb-6">
                <li>Unlimited Resumes</li>
                <li>Premium Templates</li>
                <li>ATS Score Check</li>
              </ul>
              <button className="w-full bg-accent text-white rounded-lg py-2 hover:opacity-90 transition">
                Choose Plus
              </button>
            </div>

            {/* Pro Plan */}
            <div className="border border-border rounded-xl p-6 cursor-pointer hover:border-accent transition">
              <h3 className="text-xl font-semibold mb-2">Pro</h3>
              <p className="text-3xl font-bold mb-4">₹599</p>
              <ul className="text-sm text-muted-foreground space-y-2 mb-6">
                <li>Everything in Plus</li>
                <li>AI Resume Suggestions</li>
                <li>Priority Support</li>
              </ul>
              <button className="w-full border border-border rounded-lg py-2 hover:bg-muted transition">
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
                <li><a href="#" className="hover:text-foreground transition">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground transition">Contact Us</a></li>
                <li><a href="#" className="hover:text-foreground transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-foreground transition">Terms of Service</a></li>
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
      <header className="border-b border-border px-6 py-4 flex items-center gap-2 cursor-pointer" onClick={() => window.location.href = '/'} >
        <span className="font-display font-bold">MiraiCV</span>
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
        {step === 3 && <StepThree data={resumeData} onBack={() => setStep(2)} />}
      </main>
    </div>
  );
};

export default Index;
