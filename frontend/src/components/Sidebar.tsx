export default function Sidebar() {
  return (
    <aside className="w-64 bg-[#4A2C2A] text-white p-6">
      <h2 className="text-2xl font-bold mb-8">
        ☕ Good Coffee
      </h2>

      <nav className="space-y-3">
        <button className="block w-full text-left">
          Pedidos
        </button>

        <button className="block w-full text-left">
          Perfil
        </button>

        <button className="block w-full text-left text-red-300">
          Sair
        </button>
      </nav>
    </aside>
  );
}