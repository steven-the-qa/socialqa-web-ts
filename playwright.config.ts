import { defineConfig, devices } from '@playwright/test';

const VIEWPORT_SIZES = [
  { width: 1920, height: 1080 },
  { width: 1680, height: 1050 },
  { width: 1440, height: 900 },
];

const randomViewport = VIEWPORT_SIZES[Math.floor(Math.random() * VIEWPORT_SIZES.length)];

const isCI = !!process.env.CI;
const userAgent = isCI 
  ? 'Mozilla/5.0 (X11; Linux x86_64) Chrome/120.0.0.0 Safari/537.36'
  : 'Mozilla/5.0 (Macintosh; ARM Mac OS X 15_0) Chrome/120.0.0.0 Safari/537.36';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 1,
  workers: 1,
  maxFailures: 1,
  timeout: 60000,
  globalTimeout: 300000,
  quiet: true,
  reporter: [['html', { open: 'never' }]],
  use: {
    headless: isCI,
    trace: 'retain-on-failure',
    testIdAttribute: "id",
  },

  projects: [
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        viewport: randomViewport,
        userAgent,
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
        launchOptions: {
          slowMo: 100,
        },
      },
    },
  ],

  expect: {
    timeout: 15000,
  },

  globalSetup: './global-setup.ts',
});
