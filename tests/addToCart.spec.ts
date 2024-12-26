import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  })

test('can add product to cart', async ({ page }) => {
    test.step("Navigate to product page", async () => {
        await page.goto('https://a.co/d/b8ykbVV', { waitUntil: "commit" });
    })

    // Add product to cart
    const addToCart = page.getByTestId("add-to-cart-button");
    await expect(addToCart).toBeVisible();
    await addToCart.click({force: true});
  
    // Verify cart count
    const cartItemCount = page.getByTestId("nav-cart-count");
    await expect(cartItemCount).toHaveText("1");
  
    // View itmes in cart
    const goToCart = page.getByTestId("sw-gtc");
    await expect(goToCart).toBeVisible();
    await goToCart.click({ force: true });
  
    // Verify item quantity
    const itemQuantity = page.locator("div[aria-valuenow]");
    await expect(itemQuantity).toHaveText("1")
  
    // Go to checkout
    const goToCheckout = page.getByTestId("sc-buy-box-ptc-button");
    await expect(goToCheckout).toBeVisible();
    await goToCheckout.click({force: true});
  
    // Verify the sign in URL
    await expect(page).toHaveURL(/.*signin.*/);
  });
  