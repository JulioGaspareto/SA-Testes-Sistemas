import { jest, describe, test, expect, beforeEach } from '@jest/globals'
import bcrypt from 'bcrypt'

jest.unstable_mockModule('../../config/db.js', () => ({
    default: {
        query: jest.fn()
    }
}))

const { default: pool } = await import('../../config/db.js')
const usuarioService = await import('../../services/usuarioService.js')

describe('usuarioService — testes unitários', () => {

    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('criarUsuario — deve criar usuário e retornar sem a senha', async () => {
        pool.query.mockResolvedValueOnce({
            rows: [{
                id_usuario: 1,
                nome: 'João Café',
                email: 'joao@cafe.com'
            }]
        })

        const resultado = await usuarioService.criarUsuario(
            'João Café',
            'joao@cafe.com',
            '12345678'
        )

        expect(resultado.nome).toBe('João Café')
        expect(resultado.email).toBe('joao@cafe.com')
        expect(resultado.id_usuario).toBe(1)
        expect(pool.query).toHaveBeenCalledTimes(1)
    })

    test('criarUsuario — deve fazer hash da senha antes de salvar', async () => {
        pool.query.mockResolvedValueOnce({
            rows: [{
                id_usuario: 2,
                nome: 'Maria',
                email: 'maria@cafe.com'
            }]
        })

        await usuarioService.criarUsuario('Maria', 'maria@cafe.com', 'senha123')

        const argumentos = pool.query.mock.calls[0][1]
        const senhaPassada = argumentos[2]

        const ehHash = await bcrypt.compare('senha123', senhaPassada)
        expect(ehHash).toBe(true)
    })

    test('buscarUsuarioPorEmail — deve retornar usuário quando existe', async () => {
        pool.query.mockResolvedValueOnce({
            rows: [{
                id_usuario: 1,
                nome: 'João Café',
                email: 'joao@cafe.com',
                senha: 'hash_da_senha'
            }]
        })

        const resultado = await usuarioService.buscarUsuarioPorEmail('joao@cafe.com')

        expect(resultado.email).toBe('joao@cafe.com')
        expect(pool.query).toHaveBeenCalledTimes(1)
    })

    test('buscarUsuarioPorEmail — deve retornar undefined quando não existe', async () => {
        pool.query.mockResolvedValueOnce({ rows: [] })

        const resultado = await usuarioService.buscarUsuarioPorEmail('naoexiste@cafe.com')

        expect(resultado).toBeUndefined()
    })

    test('listarUsuarios — deve retornar lista de usuários', async () => {
        pool.query.mockResolvedValueOnce({
            rows: [
                { id_usuario: 1, nome: 'João', email: 'joao@cafe.com' },
                { id_usuario: 2, nome: 'Maria', email: 'maria@cafe.com' }
            ]
        })

        const resultado = await usuarioService.listarUsuarios()

        expect(resultado).toHaveLength(2)
        expect(resultado[0].nome).toBe('João')
        expect(resultado[1].nome).toBe('Maria')
    })

})
afterAll(async () => {
    const { default: pool } = await import('../config/db.js')
    await pool.end()
})