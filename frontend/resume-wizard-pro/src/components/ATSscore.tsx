import { useEffect, useState } from "react";
import { useAuth } from "@/Authprovider/AuthProvider";
import { useNavigate } from "react-router-dom";

interface ATSScoreProps {
  score: number;
}

const getColor = (score: number) => {
  if (score < 50) return "#ef4444";
  if (score < 75) return "#f59e0b";
  return "#10b981";
};

const ATSScore = ({ score }: ATSScoreProps) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const { user } = useAuth();
  const navigate = useNavigate();

  const isPro = user?.plan === "pro";

  const radius = 28;
  const stroke = 6;
  const normalizedRadius = radius - stroke;
  const circumference = normalizedRadius * 2 * Math.PI;

  const color = getColor(animatedScore);

  const strokeDashoffset =
    circumference - (animatedScore / 100) * circumference;

  useEffect(() => {
    if (!isPro) return; 

    let start = 0;
    const duration = 1200;
    const increment = score / (duration / 16);

    const timer = setInterval(() => {
      start += increment;

      if (start >= score) {
        start = score;
        clearInterval(timer);
      }

      setAnimatedScore(Math.floor(start));
    }, 16);

    return () => clearInterval(timer);
  }, [score, isPro]);

  const handleUnlock = () => {
    navigate("/pricing");
  };

  return (
    <div className="relative flex flex-col items-center justify-center bg-background border rounded-xl p-4 shadow-sm">


      {!isPro && (
        <div
          onClick={handleUnlock}
          className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-xl cursor-pointer z-10"
        >
          <div className="text-center text-white px-3">
            <p className="text-xs font-medium">Pro Feature</p>
            <p className="text-[11px] opacity-80 mt-1">
              Click to unlock ATS score
            </p>
          </div>
        </div>
      )}

      {/* Blur content for free users */}
      <div className={!isPro ? "blur-sm pointer-events-none" : ""}>
        <div className="relative">
          <svg height={radius * 2} width={radius * 2}>
            <circle
              stroke="#e5e7eb"
              fill="transparent"
              strokeWidth={stroke}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />

            <circle
              stroke={color}
              fill="transparent"
              strokeWidth={stroke}
              strokeDasharray={`${circumference} ${circumference}`}
              style={{
                strokeDashoffset,
                transition: "stroke-dashoffset 0.2s linear",
              }}
              strokeLinecap="round"
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
          </svg>

          <div className="absolute inset-0 flex items-center justify-center text-sm font-bold">
            {isPro ? animatedScore : "🔒"}
          </div>
        </div>

        <p className="text-xs text-muted-foreground mt-2 text-center">
          ATS Score
        </p>
      </div>
    </div>
  );
};

export default ATSScore;