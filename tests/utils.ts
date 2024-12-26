import { Page } from "@playwright/test";

export async function searchForProduct(page: Page, searchQuery: string) {
    const searchBar = page.getByTestId("twotabsearchtextbox");
    await page.waitForTimeout(1000);
    await searchBar.pressSequentially(searchQuery, { delay: 100 });
    await searchBar.press("Enter");
}

export async function navigateToAmazon(page: Page, url: string) {
    // Set headers to appear more like a real browser
    await page.setExtraHTTPHeaders({
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Connection': 'keep-alive',
        'DNT': '1',
        'Upgrade-Insecure-Requests': '1',
    });

    // Navigate with a reasonable timeout
    await page.goto(url, {
        waitUntil: 'commit',
        timeout: 30000,
    });

    // Wait for the main content to be loaded
    await page.waitForLoadState('domcontentloaded');
}