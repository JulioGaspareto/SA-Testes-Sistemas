import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// react router
import { createBrowserRouter } from "react-router"
import { RouterProvider } from "react-router/dom"

// toastify
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// páginas e componentes
import Login from './pages/Auth'
import Dashboard from './pages/Dashboard'
import { AuthProvider } from './contexts/AuthContext'
import PrivateRoute from './components/PrivateRoute'
import DashboardLayout from './layouts/DashboardLayout'
import Cardapio from './pages/Cardapio'
import Pedidos from './pages/Pedidos'
import Atendente from './pages/Atendente'
import Perfil from './pages/Perfil'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/cardapio", element: <Cardapio /> },
      { path: "/pedidos", element: <Pedidos /> },
      { path: "/atendente", element: <Atendente /> },
      { path: "/perfil", element: <Perfil /> },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ToastContainer />
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)