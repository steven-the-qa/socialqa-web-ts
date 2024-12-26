import { test, expect } from '@playwright/test';

test('has the correct product title', async ({ page }) => {
  test.step("Navigate to product page", async () => {
    await page.goto('https://a.co/d/b8ykbVV', { waitUntil: "commit" });
  })

  const productTitle = page.getByTestId("title");

  await expect(productTitle).toHaveText("Spider-Man 2");
});
