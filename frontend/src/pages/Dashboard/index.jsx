import { useAuth } from '../../contexts/AuthContext'
import banner1 from '../../assets/images/banner1.jpg'
import banner2 from '../../assets/images/banner2.jpg'
import banner3 from '../../assets/images/banner3.jpg'
import { useState, useEffect } from 'react'

const banners = [banner1, banner2, banner3]

const Dashboard = () => {
    const { user } = useAuth()
    const [bannerAtivo, setBannerAtivo] = useState(0)

   
    useEffect(() => {
        const intervalo = setInterval(() => {
            setBannerAtivo((atual) => (atual + 1) % banners.length)
        }, 3000)

        return () => clearInterval(intervalo)
    }, [])

    return (
        <div className='flex flex-col gap-6'>

            <div>
                <h1 className='text-xl font-bold text-amber-900'>
                    Olá, {user?.nome}! ☕
                </h1>
                <p className='text-gray-500 text-sm'>
                    Bem vindo ao Good Coffee — o que vamos preparar hoje?
                </p>
            </div>

          
            <div className='relative w-full h-64 rounded-xl overflow-hidden shadow'>
                {banners.map((banner, index) => (
                    <img
                        key={index}
                        src={banner}
                        alt={`Banner ${index + 1}`}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700
                            ${bannerAtivo === index ? 'opacity-100' : 'opacity-0'}`}
                    />
                ))}

           
                <div className='absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2'>
                    {banners.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setBannerAtivo(index)}
                            className={`w-2 h-2 rounded-full transition cursor-pointer
                                ${bannerAtivo === index ? 'bg-white' : 'bg-white/50'}`}
                        />
                    ))}
                </div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                <div className='bg-white rounded-xl shadow p-4 border-l-4 border-amber-900'>
                    <p className='text-sm text-gray-500'>Cardápio</p>
                    <p className='text-lg font-bold text-amber-900'>Ver produtos</p>
                    <p className='text-xs text-gray-400 mt-1'>Bebidas e comidas disponíveis</p>
                </div>
                <div className='bg-white rounded-xl shadow p-4 border-l-4 border-amber-700'>
                    <p className='text-sm text-gray-500'>Pedidos</p>
                    <p className='text-lg font-bold text-amber-700'>Fazer pedido</p>
                    <p className='text-xs text-gray-400 mt-1'>Monte seu pedido agora</p>
                </div>
                <div className='bg-white rounded-xl shadow p-4 border-l-4 border-amber-500'>
                    <p className='text-sm text-gray-500'>Good Coffee</p>
                    <p className='text-lg font-bold text-amber-500'>Qualidade ☕</p>
                    <p className='text-xs text-gray-400 mt-1'>Feito com carinho pra você</p>
                </div>
            </div>

        </div>
    )
}

export default Dashboard