import { Page } from "@playwright/test";

export async function searchForProduct(page: Page, searchQuery: string) {
    const searchBar = page.getByTestId("twotabsearchtextbox");
    await page.waitForTimeout(1000);
    await searchBar.pressSequentially(searchQuery, { delay: 100 });
    await searchBar.press("Enter");
}