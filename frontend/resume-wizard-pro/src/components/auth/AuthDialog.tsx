import React, { useState } from "react";

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  repeatPassword: string;
}

type Mode = "login" | "register" | "verify";

interface AuthDialogProps {
  open: boolean;
  onClose: () => void;
}

const AuthDialog: React.FC<AuthDialogProps> = ({ open, onClose }) => {
  const [mode, setMode] = useState<Mode>("login");

  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState<RegisterData>({
    email: "",
    password: "",
    repeatPassword: "",
  });

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="w-full max-w-lg bg-background border border-border rounded-2xl p-8 shadow-2xl animate-fade-in">

        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">
            {mode === "login" && "Welcome back"}
            {mode === "register" && "Create your account"}
            {mode === "verify" && "Verify your email"}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {mode === "login" && "Login to continue building your resume"}
            {mode === "register" && "Start building ATS-friendly resumes"}
            {mode === "verify" && "Almost there 🚀"}
          </p>
        </div>

        {/* LOGIN */}
        {mode === "login" && (
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email address"
              className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent"
              value={loginData.email}
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            />

            <button
              className="w-full bg-accent text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
              onClick={() => {
                console.log("Login:", loginData);
                onClose();
              }}
            >
              Login
            </button>

            <div className="text-center text-sm text-muted-foreground">
              Don’t have an account?{" "}
              <span
                onClick={() => setMode("register")}
                className="text-accent font-medium cursor-pointer hover:underline"
              >
                Sign up
              </span>
            </div>
          </div>
        )}

        {/* REGISTER */}
        {mode === "register" && (
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email address"
              className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent"
              value={registerData.email}
              onChange={(e) =>
                setRegisterData({ ...registerData, email: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent"
              value={registerData.password}
              onChange={(e) =>
                setRegisterData({ ...registerData, password: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Repeat password"
              className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent"
              value={registerData.repeatPassword}
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  repeatPassword: e.target.value,
                })
              }
            />

            <button
              className="w-full bg-accent text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
              onClick={() => {
                if (
                  registerData.password !== registerData.repeatPassword
                ) {
                  alert("Passwords do not match");
                  return;
                }

                console.log("Register:", registerData);
                setMode("verify");
              }}
            >
              Create Account
            </button>

            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <span
                onClick={() => setMode("login")}
                className="text-accent font-medium cursor-pointer hover:underline"
              >
                Login
              </span>
            </div>
          </div>
        )}

        {/* VERIFY */}
        {mode === "verify" && (
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">
              We’ve sent a verification link to your email.
              <br />
              Please verify your account to continue.
            </p>

            <button
              className="w-full bg-accent text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
              onClick={() => {
                onClose();
                setMode("login");
              }}
            >
              Done
            </button>
          </div>
        )}

        {/* Divider */}
        <div className="my-6 border-t border-border" />

        {/* Cancel */}
        <button
          onClick={onClose}
          className="w-full py-2 text-sm text-muted-foreground hover:text-foreground transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AuthDialog;