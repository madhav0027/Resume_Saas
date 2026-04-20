import { useEffect, useState } from "react";
import { ResumeData, emptyResume } from "@/types/resume";
import StepTwo from "@/components/resume/StepTwo";
import Navbar from "@/components/Navbar";
import StepThree from "@/components/resume/StepThree";
import { useAuth } from "@/Authprovider/AuthProvider";
import { api } from "@/api/api";


const Builder = () => {
    const [resumeData, setResumeData] = useState<ResumeData>(emptyResume);
    const {user} = useAuth();
    const [step, setStep] = useState(2);
    const [mode, setMode] = useState(null);
    const [resumeId, setResumeId] = useState(null);

    useEffect(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      const params = new URLSearchParams(window.location.search);

      const m = params.get("mode");
      const id = params.get("id");

      setMode(m);
      setResumeId(id);
      
      if (m === "edit" && id) {
        api.post(`/api/resume/resumeid`, { id })
          .then(res => {
            setResumeData(res.data.data);
          });
      }
    }, []); 

  return (
    <div className=" ">
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <Navbar />
      </header>
        <main className="flex-1 px-6 py-8 max-w-6xl mx-auto w-full">
        {step === 2 && (
            <StepTwo
            data={resumeData}
            onChange={setResumeData}
            onNext={() => setStep(3)}
            onBack={() => (window.location.href = "/myresume")}
            />
        )}

        {step === 3 && (
            <StepThree
            data={resumeData}
            onBack={() => setStep(2)}
            isLoggedin={user !== null}
            mode={mode}
            resumeId={resumeId}
            />
        )}
        </main>
    </div>
  );
};

export default Builder