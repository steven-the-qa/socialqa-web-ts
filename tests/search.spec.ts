import { expect, test } from "@playwright/test";
import { searchForProduct } from "./utils";

test('can find product using ASIN', async ({ page }) => {
    test.step("Navigate to product page", async () => {
        await page.goto('https://a.co/d/b8ykbVV', { waitUntil: "commit" });
        await page.waitForTimeout(1000);
    })

    const asin = page.getByTestId("productDetails_detailBullets_sections1").getByText("ASIN").locator("xpath=following-sibling::*");
    const asinText = await asin.textContent() as string;
    await searchForProduct(page, asinText);
  
    const productSearchResult = page.getByText("Spider-Man 2", { exact: true });
    await expect(productSearchResult).toBeVisible();
  });