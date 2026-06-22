import { useEffect, useState } from 'react'
import api from '../../services/api'
import { toast } from 'react-toastify'

const Atendente = () => {
    const [pedidos, setPedidos] = useState([])
    const [loading, setLoading] = useState(true)

    const buscarPedidos = async () => {
        try {
            const response = await api.get('/pedidos')
            setPedidos(response.data)
        } catch (error) {
            toast.error('Erro ao carregar pedidos', { autoClose: 3000 })
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        buscarPedidos()


        const intervalo = setInterval(() => {
            buscarPedidos()
        }, 10000)

        return () => clearInterval(intervalo)
    }, [])
    const finalizarPedido = async (id_pedido) => {
        try {
            await api.patch(`/pedidos/${id_pedido}/status`, {
                status: 'CONCLUIDO'
            })
            toast.success('Pedido finalizado! ☕', { autoClose: 2000 })
            buscarPedidos()
        } catch (error) {
            toast.error('Erro ao finalizar pedido', { autoClose: 3000 })
        }
    }

    if (loading) {
        return <p className='text-gray-500'>Carregando pedidos...</p>
    }

    return (
        <div>
            <h1 className='text-xl font-bold text-amber-900 mb-6'>
                Painel do Atendente
            </h1>

            {pedidos.length === 0 ? (
                <div className='bg-white rounded-xl shadow p-6 text-center'>
                    <p className='text-gray-500 text-lg'>Nenhum pedido pendente no momento ☕</p>
                </div>
            ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {pedidos.map((pedido) => (
                        <div
                            key={pedido.id_pedido}
                            className='bg-white rounded-xl shadow p-4 flex flex-col gap-3'
                        >
                            {/* Cabeçalho do card */}
                            <div className='flex justify-between items-center border-b pb-2'>
                                <div>
                                    <p className='font-bold text-amber-900'>
                                        Pedido #{pedido.id_pedido}
                                    </p>
                                    <p className='text-sm text-gray-500'>
                                        {pedido.cliente_nome}
                                    </p>
                                </div>
                                <span className='text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full font-medium'>
                                    {pedido.status}
                                </span>
                            </div>

                            {/* Itens do pedido */}
                            <div className='flex-1'>
                                {pedido.itens.length === 0 ? (
                                    <p className='text-gray-400 text-sm'>Sem itens</p>
                                ) : (
                                    <ul className='space-y-1'>
                                        {pedido.itens.map((item, index) => (
                                            <li
                                                key={index}
                                                className='flex justify-between text-sm'
                                            >
                                                <span className='text-gray-700'>
                                                    {item.quantidade}x {item.nome}
                                                </span>
                                                <span className='text-amber-700 font-medium'>
                                                    R$ {Number(item.subtotal).toFixed(2).replace('.', ',')}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            {/* Total e botão */}
                            <div className='border-t pt-2'>
                                <div className='flex justify-between font-bold text-amber-900 mb-3'>
                                    <span>Total</span>
                                    <span>
                                        R$ {Number(pedido.total).toFixed(2).replace('.', ',')}
                                    </span>
                                </div>
                                <button
                                    onClick={() => finalizarPedido(pedido.id_pedido)}
                                    className='w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition cursor-pointer text-sm font-medium'
                                >
                                    ✅ Finalizar Pedido
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Atendente