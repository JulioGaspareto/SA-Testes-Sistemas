import { createContext, useContext, useEffect, useState } from "react"
import api from "../services/api"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const token = localStorage.getItem("@goodcoffee:token")
        const savedUser = localStorage.getItem("@goodcoffee:user")

        if (token && savedUser) {
            setUser(JSON.parse(savedUser))
        }

        setLoading(false)

    }, [])

    const login = async (email, senha) => {

        try {

            const response = await api.post("/usuarios/login", {
                email,
                senha
            })

            const { token, usuario } = response.data

            localStorage.setItem("@goodcoffee:token", token)
            localStorage.setItem("@goodcoffee:user", JSON.stringify(usuario))

            setUser(usuario)

            return {
                success: true
            }

        } catch (error) {

            return {
                success: false,
                message: error.response?.data?.erro
            }

        }

    }

    const logout = () => {

        localStorage.removeItem("@goodcoffee:token")
        localStorage.removeItem("@goodcoffee:user")

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