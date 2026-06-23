import { test, expect } from '@playwright/test'

async function fazerLogin(page) {
    await page.goto('/')
    await page.getByLabel('Email').fill('jheny@gmail')
    await page.getByLabel('Senha:').fill('123')
    await page.getByRole('button', { name: 'Entrar' }).click()
    await expect(page).toHaveURL('/dashboard')
}

test.describe('Pedidos', () => {

    test.beforeEach(async ({ page }) => {
        await fazerLogin(page)
        await page.getByRole('link', { name: 'Meus Pedidos' }).click()
        await expect(page).toHaveURL('/pedidos')
    })

    test('deve exibir a página de pedidos com título', async ({ page }) => {
        await expect(page.getByRole('heading', { name: 'Novo Pedido' })).toBeVisible()
    })

    test('deve exibir botão de iniciar pedido', async ({ page }) => {
        await expect(page.getByRole('button', { name: 'Iniciar Pedido' })).toBeVisible()
    })

    test('deve exibir os filtros de categoria', async ({ page }) => {
        await expect(page.getByRole('button', { name: 'Todos' })).toBeVisible()
        await expect(page.getByRole('button', { name: '☕ Bebidas' })).toBeVisible()
        await expect(page.getByRole('button', { name: '🍞 Comidas' })).toBeVisible()
    })

    test('deve abrir pedido ao clicar em Iniciar Pedido', async ({ page }) => {
        await page.getByRole('button', { name: 'Iniciar Pedido' }).click()

      
        await expect(page.getByText(/Pedido #/)).toBeVisible()
        await expect(page.getByRole('button', { name: 'Cancelar Pedido' })).toBeVisible()
    })

    test('deve cancelar pedido ao clicar em Cancelar', async ({ page }) => {
        await page.getByRole('button', { name: 'Iniciar Pedido' }).click()
        await expect(page.getByText(/Pedido #/)).toBeVisible()

        await page.getByRole('button', { name: 'Cancelar Pedido' }).click()

   
        await expect(page.getByRole('button', { name: 'Iniciar Pedido' })).toBeVisible()
        await expect(page.getByText(/Pedido #/)).not.toBeVisible()
    })

    test('deve adicionar item ao pedido e aparecer no resumo', async ({ page }) => {
        await page.getByRole('button', { name: 'Iniciar Pedido' }).click()
        await expect(page.getByText(/Pedido #/)).toBeVisible()


        await page.getByRole('button', { name: '+ Adicionar' }).first().click()

       
        await expect(page.getByRole('heading', { name: 'Resumo do Pedido' })).toBeVisible()
        await expect(page.getByRole('button', { name: 'Enviar Pedido ☕' })).toBeVisible()
            await page.getByRole('button', { name: 'Enviar Pedido ☕' }).click()
    })

})