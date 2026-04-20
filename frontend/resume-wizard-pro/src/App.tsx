import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Template from "./pages/Template.tsx";
import { useContext, useState } from "react";
import TermsPage from "./pages/terms.tsx";
import PrivacyPage from "./pages/privacy.tsx";
import HelpPage from "./pages/help.tsx";
import MyResumes from "./pages/MyResume.tsx";
import { AuthProvider, useAuth } from "./Authprovider/AuthProvider.tsx";
import Loading from "./components/Loading.tsx";
import Builder from "./pages/builder.tsx";
import Setting from "./pages/Settings.tsx";
import Pricing from "./pages/Pricing.tsx";


const queryClient = new QueryClient();

const AppContent = () => {
  const { loading } = useAuth();

  if (loading) return <Loading fullScreen />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/pricing" element={<Pricing/>}/>
        <Route path="/builder" element={<Builder />} />
        <Route path="/settings" element={<Setting/>}/>
        <Route path="/myresume" element={<MyResumes />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/privacypolicy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/" element={<Index />} />
        <Route path="/template" element={<Template />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => {
  const [chatOpen, setChatOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hi 👋 I’m MiraiCVAI assistant. How can I help you?",
    },
  ]);

  const [input, setInput] = useState("");

    const sendMessage = () => {
      if (!input.trim()) return;

      const userMsg = { role: "user", text: input };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");

      setTimeout(() => {
        let botReply = "I'm sorry, I can only help you with building CV, resume, or portfolio.";

        const text = input.toLowerCase();

        // Greeting responses
        if (["hi", "hello", "hey", "greetings"].some((g) => text.includes(g))) {
          botReply = "Hello! 👋 How can I assist you with your CV, resume, or portfolio today?";
        }

        // Resume/CV/Portfolio responses
        if (["resume", "cv", "portfolio"].some((k) => text.includes(k))) {
          botReply =
            "Miraicvai has good ATS score, AI experience, and everything you need to make your resume or portfolio stand out!";
        }

        setMessages((prev) => [...prev, { role: "bot", text: botReply }]);
      }, 500);
    };
  

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <AppContent/>
        </AuthProvider>

        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setChatOpen(true)}
            className="w-14 h-14 rounded-full bg-accent text-white shadow-lg hover:scale-105 transition"
          >
            💬
          </button>
        </div>

        {/* 🪟 Chat Window */}
        {chatOpen && (
          <div className="fixed bottom-24 right-6 w-80 bg-background border border-border rounded-2xl shadow-2xl z-50 flex flex-col">
            
            {/* Header */}
            <div className="p-3 border-b border-border flex justify-between items-center">
              <h3 className="font-semibold">Resume Assistant</h3>
              <button onClick={() => setChatOpen(false)}>✕</button>
            </div>

            {/* Messages */}
            <div className="p-3 h-80 overflow-y-auto space-y-2">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`text-sm p-2 rounded-lg max-w-[80%] w-fit ${
                    msg.role === "user"
                      ? "ml-auto bg-accent text-white"
                      : "bg-muted"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-2 border-t border-border flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask something..."
                className="flex-1 px-3 py-2 border border-border rounded-lg text-sm"
              />
              <button
                onClick={sendMessage}
                className="bg-accent text-white px-3 rounded-lg"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;