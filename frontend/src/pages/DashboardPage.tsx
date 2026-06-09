import Sidebar from "../components/Sidebar";
import OrderCard from "../components/OrderCard";

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex bg-[#FAF9F7]">
      <Sidebar />

      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-[#4A2C2A] mb-6">
          Pedidos
        </h1>

        <div className="grid gap-4">
          <OrderCard />
          <OrderCard />
          <OrderCard />
        </div>
      </main>
    </div>
  );
}