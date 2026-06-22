import { useAuth } from '../../contexts/AuthContext'
import { FaUserCircle } from 'react-icons/fa'

const Perfil = () => {
    const { user } = useAuth()

    return (
        <div className='max-w-lg mx-auto'>
            <h1 className='text-xl font-bold text-amber-900 mb-6'>Meu Perfil</h1>

            <div className='bg-white rounded-xl shadow p-6 flex flex-col items-center gap-4'>

             
                <FaUserCircle size={80} className='text-amber-900' />

          
                <div className='text-center'>
                    <p className='text-2xl font-bold text-amber-900'>{user?.nome}</p>
                    <p className='text-sm text-gray-400 mt-1'>
                        {user?.role === 'funcionario' ? '👨‍💼 Funcionário' : '☕ Cliente'}
                    </p>
                </div>

                <div className='w-full border-t pt-4 flex flex-col gap-3'>
                    <div className='flex justify-between items-center'>
                        <span className='text-sm text-gray-500'>Email</span>
                        <span className='text-sm font-medium text-gray-700'>{user?.email}</span>
                    </div>
                    <div className='flex justify-between items-center'>
                        <span className='text-sm text-gray-500'>Tipo de conta</span>
                        <span className={`text-xs px-3 py-1 rounded-full font-medium
                            ${user?.role === 'funcionario'
                                ? 'bg-amber-100 text-amber-700'
                                : 'bg-green-100 text-green-700'
                            }`}>
                            {user?.role === 'funcionario' ? 'Funcionário' : 'Cliente'}
                        </span>
                    </div>
                    <div className='flex justify-between items-center'>
                        <span className='text-sm text-gray-500'>ID</span>
                        <span className='text-sm font-medium text-gray-700'>#{user?.id_usuario}</span>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Perfil