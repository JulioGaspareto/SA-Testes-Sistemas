import { useEffect, useState } from 'react'
import api from '../../services/api'
import { toast } from 'react-toastify'

const Pedidos = () => {
    const [produtos, setProdutos] = useState([])
    const [pedidoAtivo, setPedidoAtivo] = useState(null)
    const [resumo, setResumo] = useState(null)
    const [loading, setLoading] = useState(true)
    const [adicionando, setAdicionando] = useState(null)
    const [categoriaAtiva, setCategoriaAtiva] = useState('todos')

    const produtosFiltrados = categoriaAtiva === 'todos'
        ? produtos
        : produtos.filter((p) => p.categoria === categoriaAtiva)

    useEffect(() => {
        const buscarProdutos = async () => {
            try {
                const response = await api.get('/produtos')
                setProdutos(response.data)
            } catch (error) {
                toast.error('Erro ao carregar produtos', { autoClose: 3000 })
            } finally {
                setLoading(false)
            }
        }

        buscarProdutos()
    }, [])

    const iniciarPedido = async () => {
        try {
            const response = await api.post('/pedidos')
            setPedidoAtivo(response.data)
            setResumo({ pedido: response.data, itens: [], total: 0 })
            toast.success('Pedido aberto! Agora adicione os itens.', { autoClose: 2000 })
        } catch (error) {
            toast.error('Erro ao criar pedido', { autoClose: 3000 })
        }
    }

    const adicionarItem = async (produto) => {
        if (!pedidoAtivo) {
            toast.warn('Inicie um pedido primeiro!', { autoClose: 2000 })
            return
        }

        setAdicionando(produto.id_produto)

        try {
            await api.post('/pedidos/item', {
                pedido_id: pedidoAtivo.id_pedido,
                produto_id: produto.id_produto,
                quantidade: 1
            })

            const response = await api.get(`/pedidos/${pedidoAtivo.id_pedido}`)
            setResumo(response.data)

            toast.success(`${produto.nome} adicionado!`, { autoClose: 1500 })
        } catch (error) {
            toast.error('Erro ao adicionar item', { autoClose: 3000 })
        } finally {
            setAdicionando(null)
        }
    }

    const cancelarPedido = async () => {
        try {
            await api.patch(`/pedidos/${pedidoAtivo.id_pedido}/status`, {
                status: 'CANCELADO'
            })
            toast.info('Pedido cancelado.', { autoClose: 2000 })
            setPedidoAtivo(null)
            setResumo(null)
        } catch (error) {
            toast.error('Erro ao cancelar pedido', { autoClose: 3000 })
        }
    }

    const removerItem = async (id_pedido_item) => {
        try {
            await api.delete(`/pedidos/item/${id_pedido_item}`)
            const response = await api.get(`/pedidos/${pedidoAtivo.id_pedido}`)
            setResumo(response.data)
            toast.info('Item removido.', { autoClose: 1500 })
        } catch (error) {
            toast.error('Erro ao remover item', { autoClose: 3000 })
        }
    }

    const finalizarPedido = async () => {
        try {
            toast.success('Pedido enviado! Aguarde seu café ☕', { autoClose: 2000 })
            setPedidoAtivo(null)
            setResumo(null)
        } catch (error) {
            toast.error('Erro ao enviar pedido', { autoClose: 3000 })
        }
    }

    if (loading) {
        return <p className='text-gray-500'>Carregando...</p>
    }

    return (
        <div className='flex gap-6'>

          
            <div className='flex-1'>
                <h1 className='text-xl font-bold text-amber-900 mb-4'>Novo Pedido</h1>

              
                {!pedidoAtivo ? (
                    <div className='mb-4'>
                        <p className='text-gray-500 mb-3'>
                            Clique no botão abaixo para abrir um novo pedido.
                        </p>
                        <button
                            onClick={iniciarPedido}
                            className='bg-amber-900 text-white px-6 py-2 rounded-lg hover:bg-amber-800 transition cursor-pointer'
                        >
                            Iniciar Pedido
                        </button>
                    </div>
                ) : (
                    <div className='flex items-center gap-4 mb-4'>
                        <p className='text-green-700 font-medium'>
                            ✅ Pedido #{pedidoAtivo.id_pedido} aberto
                        </p>
                        <button
                            onClick={cancelarPedido}
                            className='bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition cursor-pointer text-sm'
                        >
                            Cancelar Pedido
                        </button>
                    </div>
                )}

            
                <div className='flex gap-2 mb-4 flex-wrap'>
                    {[
                        { label: 'Todos', value: 'todos' },
                        { label: '☕ Bebidas', value: 'bebida' },
                        { label: '🍞 Comidas', value: 'comida' },
                        { label: '📦 Outros', value: 'outros' },
                    ].map((cat) => (
                        <button
                            key={cat.value}
                            onClick={() => setCategoriaAtiva(cat.value)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition cursor-pointer
                                ${categoriaAtiva === cat.value
                                    ? 'bg-amber-900 text-white'
                                    : 'bg-white text-amber-900 border border-amber-900 hover:bg-amber-50'
                                }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

              
                <div className='flex flex-col gap-2'>
                    {produtosFiltrados.map((produto) => (
                        <div
                            key={produto.id_produto}
                            className='bg-white rounded-xl shadow px-4 py-3 flex justify-between items-center'
                        >
                            <div>
                                <p className='font-bold text-amber-900'>{produto.nome}</p>
                                <p className='text-amber-700 text-sm'>
                                    R$ {Number(produto.valor).toFixed(2).replace('.', ',')}
                                </p>
                            </div>
                            <button
                                onClick={() => adicionarItem(produto)}
                                disabled={!pedidoAtivo || adicionando === produto.id_produto}
                                className={`px-4 py-2 rounded-lg text-white text-sm transition cursor-pointer
                                    ${!pedidoAtivo
                                        ? 'bg-gray-300 cursor-not-allowed'
                                        : adicionando === produto.id_produto
                                            ? 'bg-amber-400 cursor-not-allowed'
                                            : 'bg-amber-900 hover:bg-amber-800'
                                    }`}
                            >
                                {adicionando === produto.id_produto ? 'Adicionando...' : '+ Adicionar'}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

           
            {resumo && (
                <div className='w-72 bg-white rounded-xl shadow p-4 h-fit sticky top-6'>
                    <h2 className='text-lg font-bold text-amber-900 mb-4'>
                        Resumo do Pedido
                    </h2>

                    {resumo.itens.length === 0 ? (
                        <p className='text-gray-400 text-sm'>Nenhum item ainda.</p>
                    ) : (
                        <ul className='space-y-2 mb-4'>
                            {resumo.itens.map((item) => (
                                <li
                                    key={item.id_pedido_item}
                                    className='flex justify-between items-center text-sm'
                                >
                                    <span className='text-gray-700'>
                                        {item.nome} x{item.quantidade}
                                    </span>
                                    <div className='flex items-center gap-2'>
                                        <span className='text-amber-700 font-medium'>
                                            R$ {Number(item.subtotal).toFixed(2).replace('.', ',')}
                                        </span>
                                        <button
                                            onClick={() => removerItem(item.id_pedido_item)}
                                            className='text-red-400 hover:text-red-600 transition cursor-pointer text-xs font-bold'
                                            title='Remover item'
                                        >
                                            ✕
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}

                    <div className='border-t pt-3 flex justify-between font-bold text-amber-900'>
                        <span>Total</span>
                        <span>R$ {Number(resumo.total).toFixed(2).replace('.', ',')}</span>
                    </div>

                    {resumo.itens.length > 0 && (
                        <button
                            onClick={finalizarPedido}
                            className='mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition cursor-pointer'
                        >
                            Enviar Pedido ☕
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}

export default Pedidos