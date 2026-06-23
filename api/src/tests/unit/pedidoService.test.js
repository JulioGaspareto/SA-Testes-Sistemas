import { jest, describe, test, expect, beforeEach } from '@jest/globals'

jest.unstable_mockModule('../../config/db.js', () => ({
    default: {
        query: jest.fn()
    }
}))

const { default: pool } = await import('../../config/db.js')
const pedidoService = await import('../../services/pedidoService.js')

describe('pedidoService — testes unitários', () => {

    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('criarPedido — deve criar pedido com status PENDENTE', async () => {
        pool.query.mockResolvedValueOnce({
            rows: [{
                id_pedido: 1,
                usuario_id: 5,
                status: 'PENDENTE',
                data_registro: new Date()
            }]
        })

        const resultado = await pedidoService.criarPedido(5)

        expect(resultado.status).toBe('PENDENTE')
        expect(resultado.usuario_id).toBe(5)
        expect(pool.query).toHaveBeenCalledTimes(1)
    })

    test('adicionarItem — deve adicionar item ao pedido', async () => {
        pool.query.mockResolvedValueOnce({
            rows: [{
                id_pedido_item: 1,
                pedido_id: 1,
                produto_id: 3,
                quantidade: 2
            }]
        })

        const resultado = await pedidoService.adicionarItem(1, 3, 2)

        expect(resultado.pedido_id).toBe(1)
        expect(resultado.produto_id).toBe(3)
        expect(resultado.quantidade).toBe(2)
        expect(pool.query).toHaveBeenCalledTimes(1)
    })

    test('buscarPedido — deve retornar pedido com itens e total calculado', async () => {
        // Primeira query — busca o pedido
        pool.query.mockResolvedValueOnce({
            rows: [{
                id_pedido: 1,
                usuario_id: 5,
                status: 'PENDENTE'
            }]
        })

        // Segunda query — busca os itens
        pool.query.mockResolvedValueOnce({
            rows: [
                { id_pedido_item: 1, nome: 'Cappuccino', valor: '12.00', quantidade: 2, subtotal: '24.00' },
                { id_pedido_item: 2, nome: 'Pão de Queijo', valor: '8.00', quantidade: 1, subtotal: '8.00' }
            ]
        })

        const resultado = await pedidoService.buscarPedido(1)

        expect(resultado.pedido.id_pedido).toBe(1)
        expect(resultado.itens).toHaveLength(2)
        expect(resultado.total).toBe(32)
        expect(pool.query).toHaveBeenCalledTimes(2)
    })

    test('atualizarStatus — deve atualizar o status do pedido', async () => {
        pool.query.mockResolvedValueOnce({
            rows: [{
                id_pedido: 1,
                status: 'CONCLUIDO'
            }]
        })

        const resultado = await pedidoService.atualizarStatus(1, 'CONCLUIDO')

        expect(resultado.status).toBe('CONCLUIDO')
        expect(pool.query).toHaveBeenCalledTimes(1)
    })

    test('atualizarStatus — deve permitir cancelar pedido', async () => {
        pool.query.mockResolvedValueOnce({
            rows: [{
                id_pedido: 1,
                status: 'CANCELADO'
            }]
        })

        const resultado = await pedidoService.atualizarStatus(1, 'CANCELADO')

        expect(resultado.status).toBe('CANCELADO')
    })

})