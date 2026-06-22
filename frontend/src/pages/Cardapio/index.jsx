import { useEffect, useState } from 'react'
import api from '../../services/api'
import { toast } from 'react-toastify'

const categorias = [
    { label: 'Todos', value: 'todos' },
    { label: '☕ Bebidas', value: 'bebida' },
    { label: '🍞 Comidas', value: 'comida' },
    { label: '📦 Outros', value: 'outros' },
]

const getImagem = (id_produto) => {
    try {
        return new URL(`../../assets/images/${id_produto}.jpg`, import.meta.url).href
    } catch {
        return null
    }
}

const Cardapio = () => {
    const [produtos, setProdutos] = useState([])
    const [loading, setLoading] = useState(true)
    const [categoriaAtiva, setCategoriaAtiva] = useState('todos')

    useEffect(() => {
        const buscarProdutos = async () => {
            try {
                const response = await api.get('/produtos')
                setProdutos(response.data)
            } catch (error) {
                toast.error('Erro ao carregar o cardápio', { autoClose: 3000 })
            } finally {
                setLoading(false)
            }
        }

        buscarProdutos()
    }, [])

    const produtosFiltrados = categoriaAtiva === 'todos'
        ? produtos
        : produtos.filter((p) => p.categoria === categoriaAtiva)

    if (loading) {
        return <p className='text-gray-500'>Carregando cardápio...</p>
    }

    return (
        <div>
            <h1 className='text-xl font-bold text-amber-900 mb-6'>Cardápio</h1>

            {/* Botões de filtro */}
            <div className='flex gap-2 mb-6 flex-wrap'>
                {categorias.map((cat) => (
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

            {/* Grid de produtos */}
            {produtosFiltrados.length === 0 ? (
                <p className='text-gray-500'>Nenhum produto nessa categoria.</p>
            ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {produtosFiltrados.map((produto) => (
                        <div
                            key={produto.id_produto}
                            className='bg-white rounded-xl shadow overflow-hidden flex flex-col'
                        >
                            {/* Imagem do produto */}
                            <div className='w-full h-48 bg-amber-50 overflow-hidden'>
                                <img
                                    src={getImagem(produto.id_produto)}
                                    alt={produto.nome}
                                    className='w-full h-full object-cover'
                                    onError={(e) => {
                                        e.target.style.display = 'none'
                                        e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-4xl">☕</div>'
                                    }}
                                />
                            </div>

                            {/* Informações */}
                            <div className='p-4 flex flex-col gap-2 flex-1'>
                                <div className='flex justify-between items-start'>
                                    <h2 className='text-lg font-bold text-amber-900'>
                                        {produto.nome}
                                    </h2>
                                    <span className='text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full'>
                                        {produto.categoria}
                                    </span>
                                </div>

                                <p className='text-gray-500 text-sm flex-1'>
                                    {produto.descricao}
                                </p>

                                <p className='text-amber-700 font-bold text-lg'>
                                    R$ {Number(produto.valor).toFixed(2).replace('.', ',')}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Cardapio