import { useAuth } from '../../contexts/AuthContext'

const Dashboard = () => {
    const { user } = useAuth()

    return (
        <div>
            <h1 className='text-xl font-bold mb-4'>
                Bem vindo ao Good Coffee ☕
            </h1>
            <p className='text-gray-600'>
                Olá, {user?.nome}! O que vamos preparar hoje?
            </p>
        </div>
    )
}

export default Dashboard