export default function OrderCard() {
  return (
    <div className="bg-white rounded-xl shadow p-4 cursor-pointer hover:shadow-lg transition">
      <div className="flex justify-between">
        <h3 className="font-semibold">
          Pedido #001
        </h3>

        <span className="text-green-600">
          Aberto
        </span>
      </div>

      <p className="text-gray-500">
        Cliente: João
      </p>

      <p className="font-bold mt-2">
        R$ 42,50
      </p>
    </div>
  );
}