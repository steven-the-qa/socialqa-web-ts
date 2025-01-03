import { test, expect } from '@playwright/test';
import { navigateToAmazon } from './utils';

test.describe('Product tests', () => {
  test('has the correct product title', async ({ page }) => {
    await test.step("Navigate to product page", async () => {
      await navigateToAmazon(page, 'spiderman2');
    });

    const productTitle = page.getByTestId("titlePENGUIN");
    await expect(productTitle).toHaveText("Spider-Man 2");
  });
});
