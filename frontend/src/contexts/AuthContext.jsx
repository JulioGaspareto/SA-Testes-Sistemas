import { createContext, useContext, useEffect, useState } from "react"
import api from "../api/api"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const token = localStorage.getItem("token")
        const savedUser = localStorage.getItem("user")

        if (token && savedUser) {
            setUser(JSON.parse(savedUser))
        }

        setLoading(false)

    }, [])

    const login = async (email, senha) => {

        try {

            const response = await api.post("/auth/login", {
                email,
                senha
            })

            const { token, usuario } = response.data

            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(usuario))

            setUser(usuario)

            return {
                success: true
            }

        } catch (error) {

            return {
                success: false,
                message: error.response?.data?.message
            }

        }

    }

    const logout = () => {

        localStorage.removeItem("token")
        localStorage.removeItem("user")

        setUser(null)

    }

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                loading
            }}
        >
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => useContext(AuthContext)