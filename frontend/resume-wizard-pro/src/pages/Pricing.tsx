import Navbar from "@/components/Navbar";
import { FileText } from "lucide-react";

const Pricing = () => {
  return (
    <>
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <Navbar />
      </header>

      <main className="min-h-screen px-6 py-10 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2">
          Choose Your Plan
        </h1>
        <p className="text-center text-muted-foreground mb-10">
          Build ATS-friendly resumes with AI-powered tools
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

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

            <button className="w-full border border-border rounded-lg py-2">
              Get Started
            </button>
          </div>

          {/* PLUS (Best Value) */}
          <div className="border border-accent rounded-xl p-6 shadow-lg bg-gradient-to-tr from-white to-gray-50 scale-105">
            <p className="text-center text-xs font-semibold text-accent mb-2">
              MOST POPULAR
            </p>

            <h3 className="text-xl font-semibold text-center text-accent">
              Plus
            </h3>
            <p className="text-3xl font-bold text-center mt-2 text-accent">
              ₹249<span className="text-sm font-normal">/month</span>
            </p>

            <ul className="text-sm text-muted-foreground space-y-2 my-6">
              <li>✔ Unlimited Resumes</li>
              <li>✔ Premium Templates</li>
              <li>✔ ATS Score Check</li>
              <li>✔ Export PDF</li>
              <li>✖ AI Suggestions</li>
            </ul>

            <button className="w-full bg-accent text-white rounded-lg py-2 hover:opacity-90">
              Choose Plus
            </button>
          </div>

          {/* PRO */}
          <div className="border border-border rounded-xl p-6 hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-center">Pro</h3>
            <p className="text-3xl font-bold text-center mt-2">
              ₹599<span className="text-sm font-normal">/month</span>
            </p>

            <ul className="text-sm text-muted-foreground space-y-2 my-6">
              <li>✔ Everything in Plus</li>
              <li>✔ AI Resume Suggestions</li>
              <li>✔ ATS Optimization</li>
              <li>✔ Priority Support</li>
              <li>✔ Job-ready Resume Analysis</li>
            </ul>

            <button className="w-full border border-border rounded-lg py-2 hover:bg-muted">
              Go Pro
            </button>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="border-t border-border mt-12 px-6 py-10">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-5 h-5 text-accent" />
                <span className="font-bold text-lg">MiraiCV</span>
              </div>

              <p className="text-sm text-muted-foreground">
                MiraiCVAI helps you build ATS-friendly resumes with AI-powered
                suggestions, templates, and modern design tools.
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="font-semibold mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/template">Templates</a></li>
                <li><a href="/pricing">Pricing</a></li>
                <li><a href="#">Features</a></li>
                <li><a href="#">Updates</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/help">Help Center</a></li>
                <li><a href="/contact">Contact Us</a></li>
                <li><a href="/privacypolicy">Privacy Policy</a></li>
                <li><a href="/terms">Terms of Service</a></li>
              </ul>
            </div>

          </div>

          <div className="text-center text-xs text-muted-foreground mt-10">
            © {new Date().getFullYear()} MiraiCV. All rights reserved.
          </div>
        </footer>
      </main>
    </>
  );
};

export default Pricing;