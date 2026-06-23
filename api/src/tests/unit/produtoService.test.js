import { jest, describe, test, expect, beforeEach } from '@jest/globals'

jest.unstable_mockModule('../../config/db.js', () => ({
    default: {
        query: jest.fn()
    }
}))

const { default: pool } = await import('../../config/db.js')
const produtoService = await import('../../services/produtoService.js')

describe('produtoService — testes unitários', () => {

    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('criarProduto — deve criar produto e retornar os dados', async () => {
        pool.query.mockResolvedValueOnce({
            rows: [{
                id_produto: 1,
                nome: 'Cappuccino',
                descricao: 'Café com leite vaporizado',
                valor: '12.00',
                categoria: 'bebida'
            }]
        })

        const resultado = await produtoService.criarProduto(
            'Cappuccino',
            'Café com leite vaporizado',
            12.00,
            'bebida'
        )

        expect(resultado.nome).toBe('Cappuccino')
        expect(resultado.valor).toBe('12.00')
        expect(resultado.categoria).toBe('bebida')
        expect(pool.query).toHaveBeenCalledTimes(1)
    })

    test('criarProduto — deve usar categoria "outros" como padrão', async () => {
        pool.query.mockResolvedValueOnce({
            rows: [{
                id_produto: 2,
                nome: 'Água',
                descricao: 'Água mineral',
                valor: '5.00',
                categoria: 'outros'
            }]
        })

        // Não passa a categoria — deve usar o padrão
        await produtoService.criarProduto('Água', 'Água mineral', 5.00)

        const argumentos = pool.query.mock.calls[0][1]
        const categoriaPassada = argumentos[3]

        expect(categoriaPassada).toBe('outros')
    })

    test('listarProduto — deve retornar lista de produtos', async () => {
        pool.query.mockResolvedValueOnce({
            rows: [
                { id_produto: 1, nome: 'Cappuccino', valor: '12.00', categoria: 'bebida' },
                { id_produto: 2, nome: 'Pão de Queijo', valor: '8.00', categoria: 'comida' },
                { id_produto: 3, nome: 'Água', valor: '5.00', categoria: 'outros' }
            ]
        })

        const resultado = await produtoService.listarProduto()

        expect(resultado).toHaveLength(3)
        expect(resultado[0].nome).toBe('Cappuccino')
        expect(resultado[1].nome).toBe('Pão de Queijo')
        expect(resultado[2].nome).toBe('Água')
        expect(pool.query).toHaveBeenCalledTimes(1)
    })

    test('listarProduto — deve retornar lista vazia quando não há produtos', async () => {
        pool.query.mockResolvedValueOnce({ rows: [] })

        const resultado = await produtoService.listarProduto()

        expect(resultado).toHaveLength(0)
        expect(resultado).toEqual([])
    })

})