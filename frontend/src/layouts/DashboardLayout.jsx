import { Outlet } from "react-router"
import { useAuth } from "../contexts/AuthContext"
import SideMenu from "../components/layout/SideMenu"


const DashboardLayout = () => {
    const { user, logout } = useAuth()

    return (
        <div className="flex min-h-screen bg-gray-100">
           
            <SideMenu />

           
            <main className="flex-1 flex flex-col">
                <header className="flex justify-between items-center bg-white p-4 shadow">
                    <h1 className="text-xl font-bold text-amber-900"></h1>
               
                </header>

                
                <section className="flex-1 p-6 overflow-y-auto">
                    <Outlet />
                </section>
            </main>
        </div>
    )
}

export default DashboardLayout