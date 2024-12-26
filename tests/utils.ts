import { Page } from "@playwright/test";

// Add randomization to delays
function getRandomDelay(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export async function navigateToAmazon(page: Page, url: string) {
    // Set more convincing browser fingerprinting
    await page.setExtraHTTPHeaders({
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'sec-ch-ua': '"Chromium";v="120", "Google Chrome";v="120"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
        'Upgrade-Insecure-Requests': '1',
    });

    // Add cookie consent and session cookies if you have them
    await page.context().addCookies([
        {
            name: 'session-id',
            value: '123-1234567-1234567',
            domain: '.amazon.com',
            path: '/'
        },
        {
            name: 'i18n-prefs',
            value: 'USD',
            domain: '.amazon.com',
            path: '/'
        }
    ]);

    // Random delay before navigation
    await page.waitForTimeout(getRandomDelay(1000, 3000));

    // Navigate with a reasonable timeout
    await page.goto(url, {
        waitUntil: 'commit',
        timeout: 30000,
    });

    // Random delay after navigation
    await page.waitForTimeout(getRandomDelay(1000, 2000));

    // Wait for the main content to be loaded
    await page.waitForLoadState('domcontentloaded');

    // Add this to your navigateToAmazon function if you have proxy services
    await page.route('**/*', async route => {
        const headers = route.request().headers();
        headers['X-Proxy-Authorization'] = 'your-proxy-auth-token';
        await route.continue({ headers });
    });
}

export async function searchForProduct(page: Page, searchQuery: string) {
    const searchBar = page.getByTestId("twotabsearchtextbox");
    await page.waitForTimeout(getRandomDelay(800, 1500));
    await searchBar.pressSequentially(searchQuery, { delay: getRandomDelay(100, 200) });
    await page.waitForTimeout(getRandomDelay(500, 1000));
    await searchBar.press("Enter");
}