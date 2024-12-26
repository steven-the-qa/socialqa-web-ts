import { defineConfig, devices } from '@playwright/test';

const VIEWPORT_SIZES = [
  { width: 1920, height: 1080 },
  { width: 1680, height: 1050 },
  { width: 1440, height: 900 },
];

const randomViewport = VIEWPORT_SIZES[Math.floor(Math.random() * VIEWPORT_SIZES.length)];

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 1,
  workers: 1,
  reporter: [['html', { open: 'never' }]],
  use: {
    headless: process.env.CI ? true : false,
    trace: 'retain-on-failure',
    testIdAttribute: "id",
    viewport: randomViewport,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    browserName: 'chromium',
    ignoreHTTPSErrors: true,
    actionTimeout: 30000,
    navigationTimeout: 30000,
    contextOptions: {
      reducedMotion: 'no-preference',
      forcedColors: 'none',
      colorScheme: 'light',
    },
    javaScriptEnabled: true,
    acceptDownloads: true,
  },

  projects: [
    {
      name: 'chrome',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  expect: {
    timeout: 15000,
  },

  globalTimeout: 60000,
  globalSetup: './global-setup.ts',
});
