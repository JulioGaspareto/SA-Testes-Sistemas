import { test, expect } from '@playwright/test'


async function fazerLogin(page) {
    await page.goto('/')
    await page.getByLabel('Email').fill('jheny@gmail')
    await page.getByLabel('Senha:').fill('123') 
    await page.getByRole('button', { name: 'Entrar' }).click()
    await expect(page).toHaveURL('/dashboard')
}

test.describe('Cardápio', () => {

    test.beforeEach(async ({ page }) => {
        await fazerLogin(page)
        await page.getByRole('link', { name: 'Cardápio' }).click()
        await expect(page).toHaveURL('/cardapio')
    })

    test('deve exibir a página de cardápio com título', async ({ page }) => {
        await expect(page.getByRole('heading', { name: 'Cardápio' })).toBeVisible()
    })

    test('deve exibir os botões de filtro de categoria', async ({ page }) => {
        await expect(page.getByRole('button', { name: 'Todos' })).toBeVisible()
        await expect(page.getByRole('button', { name: '☕ Bebidas' })).toBeVisible()
        await expect(page.getByRole('button', { name: '🍞 Comidas' })).toBeVisible()
        await expect(page.getByRole('button', { name: '📦 Outros' })).toBeVisible()
    })

    test('deve exibir produtos na lista', async ({ page }) => {
      
        await expect(page.getByText('Café Espresso')).toBeVisible()
    })

    test('deve filtrar por bebidas ao clicar no botão', async ({ page }) => {
        await page.getByRole('button', { name: '☕ Bebidas' }).click()

     
        await expect(page.getByText('Cappuccino')).toBeVisible()

        
        await expect(page.getByText('Pão de Queijo')).not.toBeVisible()
    })

    test('deve filtrar por comidas ao clicar no botão', async ({ page }) => {
        await page.getByRole('button', { name: '🍞 Comidas' }).click()

        await expect(page.getByText('Clássico pão de queijo mineiro, quentinho e cremoso por dentro.')).toBeVisible()
        await expect(page.getByText('Cappuccino')).not.toBeVisible()
    })

    test('deve mostrar todos os produtos ao clicar em Todos', async ({ page }) => {
       
        await page.getByRole('button', { name: '☕ Bebidas' }).click()
        
        await page.getByRole('button', { name: 'Todos' }).click()

      
        await expect(page.getByText('Cappuccino')).toBeVisible()
        await expect(page.getByText('Café Espresso')).toBeVisible()
    })

})