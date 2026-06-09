import { useState } from "react";
import AuthCard from "../components/AuthCard";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");

  return (
    <main className="min-h-screen bg-[#FAF9F7] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-20%] w-96 h-96 rounded-full bg-[#D4A373]/20 blur-3xl" />

      <div className="absolute bottom-[-20%] right-[-20%] w-96 h-96 rounded-full bg-[#E9C46A]/20 blur-3xl" />

      <AuthCard mode={mode} setMode={setMode} />
    </main>
  );
}