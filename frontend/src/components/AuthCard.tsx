import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

interface Props {
  mode: "login" | "signup";
  setMode: (mode: "login" | "signup") => void;
}

export default function AuthCard({ mode, setMode }: Props) {
  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="p-8">

        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-[#4A2C2A] rounded-xl mx-auto flex items-center justify-center text-white">
            ☕
          </div>

          <h1 className="mt-4 text-2xl font-bold text-[#4A2C2A]">
            Good Coffee
          </h1>

          <p className="text-gray-500 text-sm">
            Management System
          </p>
        </div>

        <div className="bg-gray-100 rounded-xl p-1 flex mb-6">
          <button
            onClick={() => setMode("login")}
            className={`flex-1 py-2 rounded-lg transition ${
              mode === "login"
                ? "bg-white shadow text-[#4A2C2A]"
                : "text-gray-500"
            }`}
          >
            Entrar
          </button>

          <button
            onClick={() => setMode("signup")}
            className={`flex-1 py-2 rounded-lg transition ${
              mode === "signup"
                ? "bg-white shadow text-[#4A2C2A]"
                : "text-gray-500"
            }`}
          >
            Criar Conta
          </button>
        </div>

        {mode === "login" ? (
          <LoginForm />
        ) : (
          <RegisterForm />
        )}
      </div>
    </div>
  );
}