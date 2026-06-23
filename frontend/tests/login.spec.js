import { test, expect } from '@playwright/test'

test.describe('Tela de Login', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/')
    })

    test('deve exibir o formulário de login', async ({ page }) => {
        await expect(page.getByLabel('Email')).toBeVisible()
        await expect(page.getByLabel('Senha:')).toBeVisible()
        await expect(page.getByRole('button', { name: 'Entrar' })).toBeVisible()
    })

    test('deve exibir erro ao tentar login com credenciais inválidas', async ({ page }) => {
        await page.getByLabel('Email').fill('emailerrado@teste.com')
        await page.getByLabel('Senha:').fill('senhaerrada')
        await page.getByRole('button', { name: 'Entrar' }).click()

        await expect(page.getByText('Email ou senha inválidos')).toBeVisible()
    })

    test('deve fazer login com sucesso e ir pro dashboard', async ({ page }) => {
        await page.getByLabel('Email').fill('jheny@gmail')
        await page.getByLabel('Senha:').fill('123') // 
        await page.getByRole('button', { name: 'Entrar' }).click()

        await expect(page).toHaveURL('/dashboard')
        await expect(page.getByText('Bem vindo ao Good Coffee')).toBeVisible()
    })

    test('deve abrir modal de criar conta ao clicar em Criar Conta', async ({ page }) => {
        await page.getByRole('button', { name: 'Criar Conta' }).click()

        await expect(page.getByRole('heading', { name: 'Criar Usuário' })).toBeVisible()
        await expect(page.getByLabel('Nome:')).toBeVisible()
    })

})