import { test, expect } from '@playwright/test';
import { navigateToAmazon } from './utils';

test('has the correct product title', async ({ page }) => {
  await test.step("Navigate to product page", async () => {
    await navigateToAmazon(page, 'https://a.co/d/b8ykbVV');
  });

  const productTitle = page.getByTestId("title");
  await expect(productTitle).toHaveText("Spider-Man 2");
});
