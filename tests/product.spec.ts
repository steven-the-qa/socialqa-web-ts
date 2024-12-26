import { test, expect } from '@playwright/test';
import { navigateToAmazon } from './utils';

// Use this for development/debugging
const MOCK_MODE = process.env.MOCK_MODE === 'true';

test('has the correct product title', async ({ page }) => {
  if (MOCK_MODE) {
    // Use stored data for development
    await page.setContent('<div id="title">Spider-Man 2</div>');
  } else {
    await test.step("Navigate to product page", async () => {
      await navigateToAmazon(page, 'spiderman2');
    });
  }

  const productTitle = page.getByTestId("title");
  await expect(productTitle).toHaveText("Spider-Man 2");
});
