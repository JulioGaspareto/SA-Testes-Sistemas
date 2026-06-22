import { NavLink, useNavigate } from 'react-router'
import {
    MdDashboard,
    MdExitToApp,
    MdMenu,
    MdClose
} from 'react-icons/md'

import { useAuth } from '../../../contexts/AuthContext'
import { useState } from 'react'
import { FaCoffee, FaClipboardList, FaUserTie, FaUserCircle } from 'react-icons/fa'

const SideMenu = () => {
    const navigate = useNavigate()
    const { logout, user } = useAuth()
    const [isCollapsed, setIsCollapsed] = useState(false)

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    const toggleMenu = () => {
        setIsCollapsed(!isCollapsed)
    }

    return (
        <aside
            className={`h-screen bg-amber-900 text-white flex flex-col justify-between transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}
        >
            <div className='p-4 flex items-center justify-between border-b border-amber-700'>
                {!isCollapsed && (
                    <h1 className='text-lg font-bold'>Good Coffee ☕</h1>
                )}
                <button
                    onClick={toggleMenu}
                    className='text-white hover:text-amber-300 focus:outline-none'
                >
                    {isCollapsed ? <MdMenu size={24} /> : <MdClose size={24} />}
                </button>
            </div>

            <nav className='flex-1 p-4 space-y-4 overflow-y-auto'>
                <ul className='space-y-3'>
                    <li>
                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) =>
                                `flex gap-2 hover:text-amber-300 ${isActive ? "text-amber-300" : "text-white"}`
                            }
                        >
                            <MdDashboard size={20} />
                            {!isCollapsed && <span>Início</span>}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/cardapio"
                            className={({ isActive }) =>
                                `flex gap-2 hover:text-amber-300 ${isActive ? "text-amber-300" : "text-white"}`
                            }
                        >
                            <FaCoffee size={20} />
                            {!isCollapsed && <span>Cardápio</span>}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/pedidos"
                            className={({ isActive }) =>
                                `flex gap-2 hover:text-amber-300 ${isActive ? "text-amber-300" : "text-white"}`
                            }
                        >
                            <FaClipboardList size={20} />
                            {!isCollapsed && <span>Meus Pedidos</span>}
                        </NavLink>
                    </li>

                    {user?.role === 'funcionario' && (
                        <li>
                            <NavLink
                                to="/atendente"
                                className={({ isActive }) =>
                                    `flex gap-2 hover:text-amber-300 ${isActive ? "text-amber-300" : "text-white"}`
                                }
                            >
                                <FaUserTie size={20} />
                                {!isCollapsed && <span>Atendente</span>}
                            </NavLink>
                        </li>

                    )}
                    <li>
                        <NavLink
                            to="/perfil"
                            className={({ isActive }) =>
                                `flex gap-2 hover:text-amber-300 ${isActive ? "text-amber-300" : "text-white"}`
                            }
                        >
                            <FaUserCircle size={20} />
                            {!isCollapsed && <span>Meu Perfil</span>}
                        </NavLink>
                    </li>
                </ul>
            </nav>

            <div className='p-4 border-t border-amber-700'>
                <button
                    onClick={handleLogout}
                    className='flex items-center gap-3 text-red-300 hover:text-red-500 w-full cursor-pointer'
                >
                    <MdExitToApp size={20} />
                    {!isCollapsed && <span>Sair</span>}
                </button>
            </div>
        </aside>
    )
}

export default SideMenu