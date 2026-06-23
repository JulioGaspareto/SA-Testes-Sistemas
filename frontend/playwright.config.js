import { defineConfig } from '@playwright/test'

export default defineConfig({
    testDir: './tests',
    reporter: 'html',
    timeout: 30000,
    use: {
        baseURL: 'http://localhost:5173',
    },
    webServer: {
        command: 'npm run dev',
        url: 'http://localhost:5173',
        reuseExistingServer: true,
    }
})


//  npx playwright show-report