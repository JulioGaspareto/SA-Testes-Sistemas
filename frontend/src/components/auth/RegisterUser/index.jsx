import React, { useState } from 'react'
import { toast } from 'react-toastify'
import api from '../../../services/api'

const RegisterUser = () => {

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')  

    const handleNomeChange = (e) => setNome(e.target.value)
    const handleEmailChange = (e) => setEmail(e.target.value)
    const handlePasswordChange = (e) => setPassword(e.target.value)
    const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value)

    const [isPasswordMatch, setIsPasswordMatch] = useState(true)
    const [isPasswordLong, setIsPasswordLong] = useState(true) 
    const [isSaving, setIsSaving] = useState(false)

    const resetForm = () => {
        setNome('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
        setIsPasswordMatch(true)
        setIsPasswordLong(true)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        setIsPasswordMatch(true)
        setIsPasswordLong(true)

        if (password.length < 8) {
            setIsPasswordLong(false)
            return
        }

        if (password !== confirmPassword) {
            setIsPasswordMatch(false)
            return
        }

        setIsSaving(true)

        try {
            await api.post('/usuarios', {
                nome,
                email,
                senha: password
            })

            setIsSaving(false)
            resetForm()
            toast.success('Usuário Criado com Sucesso!', {
                autoClose: 2000,
                hideProgressBar: true
            })
        } catch (error) {
            console.error('Erro ao criar usuário', error)
            toast.error('Erro ao criar o usuário!', {
                autoClose: 2000,
                hideProgressBar: true
            })
            setIsSaving(false)
        }
    }

    return (
        <div className='w-full max-w-md p-6 bg-white rounded-xl'>
            <h2 className='text-2xl font-bold mb-6 text-center'>Criar Usuário</h2>
            <form onSubmit={handleSubmit}>

                <fieldset>
                    <label htmlFor='nome' className='block text-sm font-medium mb-1'>Nome:</label>
                    <input
                        type='text'
                        id='nome'
                        value={nome}
                        onChange={handleNomeChange}
                        required
                        className='w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                </fieldset>

                <fieldset>
                    <label htmlFor='register-email' className='block text-sm font-medium mb-1'>Email:</label>
                    <input
                        type='email'
                        id='register-email'
                        value={email}
                        onChange={handleEmailChange}
                        required
                        className='w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                </fieldset>

                <fieldset>
                    <label htmlFor='register-password' className='block text-sm font-medium mb-1'>Senha:</label>
                    <input
                        type='password'
                        id='register-password'
                        value={password}
                        onChange={handlePasswordChange}
                        required
                        className='w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                    {!isPasswordLong && (
                        <p className='text-red-500 text-sm mt-1'>A senha deve ter no mínimo 8 caracteres</p>
                    )}
                </fieldset>

                <fieldset>
                    <label htmlFor='register-confirmPassword' className='block text-sm font-medium mb-1'>Confirmar Senha:</label>
                    <input
                        type='password'
                        id='register-confirmPassword'
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        required
                        className='w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                    {!isPasswordMatch && (
                        <p className='text-red-500 text-sm mt-1'>As senhas não correspondem</p>
                    )}
                </fieldset>

                <div>
                    <button
                        type='submit'
                        disabled={isSaving}
                        className={`w-full p-2 rounded-lg text-white mt-4 ${isSaving
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                            } transition-colors`}
                    >
                        {isSaving ? 'Salvando ...' : 'Criar Usuário'}
                    </button>
                </div>

            </form>
        </div>
    )
}

export default RegisterUser