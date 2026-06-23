import { test, expect } from '@playwright/test'

test.describe('Cadastro de Usuário', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/')
        await page.getByRole('button', { name: 'Criar Conta' }).click()
        await expect(page.getByRole('heading', { name: 'Criar Usuário' })).toBeVisible()
    })

    test('deve exibir o formulário de cadastro completo', async ({ page }) => {
        await expect(page.getByLabel('Nome:')).toBeVisible()
        await expect(page.getByLabel('Email:')).toBeVisible()
        await expect(page.locator('#register-password')).toBeVisible()
        await expect(page.locator('#register-confirmPassword')).toBeVisible()
        await expect(page.getByRole('button', { name: 'Criar Usuário' })).toBeVisible()
    })

    test('deve exibir erro quando as senhas não correspondem', async ({ page }) => {
        await page.getByLabel('Nome:').fill('Teste Usuario')
        await page.getByLabel('Email:').fill('teste@cafe.com')
        await page.locator('#register-password').fill('senha123')
        await page.locator('#register-confirmPassword').fill('senha456')
        await page.getByRole('button', { name: 'Criar Usuário' }).click()

        await expect(page.getByText('As senhas não correspondem')).toBeVisible()
    })

    test('deve exibir erro quando a senha tem menos de 8 caracteres', async ({ page }) => {
        await page.getByLabel('Nome:').fill('Teste Usuario')
        await page.getByLabel('Email:').fill('teste@cafe.com')
        await page.locator('#register-password').fill('123')
        await page.locator('#register-confirmPassword').fill('123')
        await page.getByRole('button', { name: 'Criar Usuário' }).click()

        await expect(page.getByText('A senha deve ter no mínimo 8 caracteres')).toBeVisible()
    })

    test('deve cadastrar usuário com sucesso', async ({ page }) => {
        const emailUnico = `teste${Date.now()}@cafe.com`

        await page.getByLabel('Nome:').fill('Usuário Teste')
        await page.getByLabel('Email:').fill(emailUnico)
        await page.locator('#register-password').fill('senha12345')
        await page.locator('#register-confirmPassword').fill('senha12345')
        await page.getByRole('button', { name: 'Criar Usuário' }).click()

        await expect(page.getByText('Usuário Criado com Sucesso!')).toBeVisible()
    })

})