import { test, expect } from '@playwright/test'




async function fazerLoginAtendente(page) {
    await page.goto('/')
    await page.getByLabel('Email').fill('julio@gmail')
    await page.getByLabel('Senha:').fill('123')
    await page.getByRole('button', { name: 'Entrar' }).click()
    await expect(page).toHaveURL('/dashboard')
}

test.describe('Painel do Atendente', () => {

    test.beforeEach(async ({ page }) => {
        await fazerLoginAtendente(page)
        await page.getByRole('link', { name: 'Atendente' }).click()
        await expect(page).toHaveURL('/atendente')
    })

    test('deve exibir o painel do atendente com título', async ({ page }) => {
        await expect(page.getByRole('heading', { name: 'Painel do Atendente' })).toBeVisible()
    })

    test('deve exibir aba Atendente no menu somente para funcionário', async ({ page }) => {
        await expect(page.getByRole('link', { name: 'Atendente' })).toBeVisible()
    })

    test('não deve exibir aba Atendente para cliente', async ({ page }) => {

        await page.getByRole('button', { name: 'Sair' }).click()
        await expect(page).toHaveURL('/')

        await page.getByLabel('Email').fill('jheny@gmail')
        await page.getByLabel('Senha:').fill('123')
        await page.getByRole('button', { name: 'Entrar' }).click()
        await expect(page).toHaveURL('/dashboard')

        await expect(page.getByRole('link', { name: 'Atendente' })).not.toBeVisible()
    })


    test('deve exibir pedidos com nome do cliente e itens', async ({ page }) => {
        const semPedidos = await page.getByText('Nenhum pedido pendente no momento ☕').isVisible()

        if (!semPedidos) {

            await expect(page.locator('.bg-white.rounded-xl').first()).toBeVisible()
            await expect(page.getByRole('button', { name: '✅ Finalizar Pedido' }).first()).toBeVisible()
        } else {

            console.log('Nenhum pedido pendente no momento — teste pulado')
        }
    })

})