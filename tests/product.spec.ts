import { test, expect } from '@playwright/test';
import { searchForProduct } from './utils';

test.beforeEach(async ({ page }) => {
  await page.goto('https://a.co/d/g35Ul5z');
})

test('has the correct product title', async ({ page }) => {
  const productTitle = page.getByTestId("title");

  await expect(productTitle).toHaveText("Spider-Man 2 - PlayStation 2");
});

test('can find product using ASIN', async ({ page }) => {
  const asin = page.getByTestId("productDetails_detailBullets_sections1").getByText("ASIN").locator("xpath=following-sibling::*");
  const asinText = await asin.textContent() as string;
  await searchForProduct(page, asinText);

  const productSearchResult = page.getByText("Spider-Man 2 - PlayStation 2", { exact: true });
  await expect(productSearchResult).toBeHidden();
});

test('can add product to cart', async ({ page }) => {
  // Add product to cart
  const addToCart = page.getByTestId("add-to-cart-button-ubb");
  await addToCart.click();

  // Verify cart count
  const cartItemCount = page.getByTestId("nav-cart-count");
  await expect(cartItemCount).toHaveText("1");

  // View itmes in cart
  const goToCart = page.getByTestId("sw-gtc");
  await goToCart.click();

  // Verify item quantity
  const itemQuantity = page.getByTestId("a-autoid-1-announce");
  await expect(itemQuantity).toHaveText("Qty:1")

  // Go to checkout
  const goToCheckout = page.getByTestId("sc-buy-box-ptc-button");
  await goToCheckout.click();

  // Verify the sign in URL
  await expect(page).toHaveURL(/.*signin.*/);
});