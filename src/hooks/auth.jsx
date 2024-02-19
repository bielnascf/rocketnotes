/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useContext, useState, useEffect } from 'react'

import Swal from 'sweetalert2'

import { api } from '../services/api'

const AuthContext = createContext({})

function AuthProvider({ children }) {
    const [data, setData] = useState({})

    async function signIn({ email, password}) {

        try {
            const response = await api.post('/sessions',  { email, password })

            const { user, token } = response.data

            localStorage.setItem("@rocketnotes:user", JSON.stringify(user))
            localStorage.setItem("@rocketnotes:token", token)

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`
            setData({ user, token })

        } catch (error) {
            if(error.response) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: error.response.data.message,
                    background: "#3E3B47",
                    color: "#ffff",
                    confirmButtonColor: "#FF9000"
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Não foi possível entrar!",
                    background: "#3E3B47",
                    color: "#ffff",
                    confirmButtonColor: "#FF9000"
                });
            }
        }
    }

    function signOut() {
        localStorage.removeItem("@rocketnotes:token")
        localStorage.removeItem("@rocketnotes:user")

        setData({})
    }

    async function updateProfile({ user, avatarFile }) {
        try {
            if(avatarFile) {
                const fileUploadForm = new FormData()
                fileUploadForm.append('avatar', avatarFile)

                const response = await api.patch('/users/avatar', fileUploadForm)
                user.avatar = response.data.avatar
            }

            await api.put('/users', user)
            localStorage.setItem("@rocketnotes:user", JSON.stringify(user))

            setData({ user, token: data.token})

            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Perfil atualizado com sucesso!",
                background: "#3E3B47",
                color: "#ffff",
                confirmButtonColor: "#FF9000"
            });

        } catch (error) {
            if(error.response) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: error.response.data.message,
                    background: "#3E3B47",
                    color: "#ffff",
                    confirmButtonColor: "#FF9000"
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Erro ao atualizar perfil!",
                    background: "#3E3B47",
                    color: "#ffff",
                    confirmButtonColor: "#FF9000"
                });
            }
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("@rocketnotes:token")
        const user = localStorage.getItem("@rocketnotes:user")

        if(token && user) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`
            setData({ token, user: JSON.parse(user) })
        }
    }, [])

    return (
        <AuthContext.Provider value={{ signIn, user: data.user, signOut, updateProfile }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext)

    return context
}

export { AuthProvider, useAuth }