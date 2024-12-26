import { expect, test } from "@playwright/test";
import { searchForProduct, navigateToAmazon } from "./utils";

test.describe('Search tests', () => {
  test.describe.configure({ mode: 'serial' });
  
  test('can find product using ASIN', async ({ page }) => {
    test.step("Navigate to product page", async () => {
        await navigateToAmazon(page, 'spiderman2');
    })

    const asin = page.getByTestId("productDetails_detailBullets_sections1").getByText("ASIN").locator("xpath=following-sibling::*");
    const asinText = await asin.textContent() as string;
    await searchForProduct(page, asinText);
  
    const productSearchResult = page.getByText("Spider-Man 2", { exact: true});
    await expect(productSearchResult).toBeVisible({ timeout: 10000 });
  });
});