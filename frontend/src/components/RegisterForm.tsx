export default function RegisterForm() {
  return (
    <form className="space-y-4">

      <input
        type="text"
        placeholder="Nome"
        className="w-full border rounded-lg p-3"
      />

      <input
        type="email"
        placeholder="Email"
        className="w-full border rounded-lg p-3"
      />

      <input
        type="password"
        placeholder="Senha"
        className="w-full border rounded-lg p-3"
      />

      <input
        type="password"
        placeholder="Confirmar senha"
        className="w-full border rounded-lg p-3"
      />

      <button
        className="w-full bg-[#4A2C2A] text-white py-3 rounded-lg"
      >
        Criar Conta
      </button>

    </form>
  );
}