    // playwright.config.ts
    import { defineConfig } from '@playwright/test';
    
    export default defineConfig({
      use: {
        baseURL: 'https://opensource-demo.orangehrmlive.com',
      },
    });