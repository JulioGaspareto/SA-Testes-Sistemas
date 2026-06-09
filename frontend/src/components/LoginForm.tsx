export default function LoginForm() {
  return (
    <form className="space-y-4">

      <input
        type="email"
        placeholder="seu@email.com"
        className="w-full border rounded-lg p-3"
      />

      <input
        type="password"
        placeholder="********"
        className="w-full border rounded-lg p-3"
      />

      <button
        className="w-full bg-[#4A2C2A] text-white py-3 rounded-lg"
      >
        Entrar
      </button>

    </form>
  );
}