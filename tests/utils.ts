import { Page } from "@playwright/test";

// Cache for storing product data
interface ProductCache {
    [url: string]: {
        title: string;
        timestamp: number;
        html: string;
    }
}

const productCache: ProductCache = {};

// List of equivalent product URLs (different valid URLs for the same product)
const PRODUCT_URL_VARIANTS = {
    'spiderman2': [
        'https://a.co/d/b8ykbVV',
        'https://www.amazon.com/dp/B001223NYU?ref=cm_sw_r_cp_ud_dp_S0999NF3K00Y915VPEN1&ref_=cm_sw_r_cp_ud_dp_S0999NF3K00Y915VPEN1&social_share=cm_sw_r_cp_ud_dp_S0999NF3K00Y915VPEN1&skipTwisterOG=1',
        'https://www.amazon.com/dp/B001223NYU'
    ]
};

function getRandomUrl(productKey: string): string {
    const variants = PRODUCT_URL_VARIANTS[productKey] || [];
    return variants[Math.floor(Math.random() * variants.length)];
}

// Add randomization to delays
function getRandomDelay(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export async function navigateToAmazon(page: Page, productKey: string) {
    const url = getRandomUrl(productKey);
    
    // Check if we have cached data that's less than 1 hour old
    const cachedData = productCache[url];
    const ONE_HOUR = 60 * 60 * 1000;
    
    if (cachedData && (Date.now() - cachedData.timestamp) < ONE_HOUR) {
        await page.setContent(cachedData.html);
        return;
    }

    // If no cache, proceed with navigation
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

    // Add more randomized delays
    const preNavigationDelay = getRandomDelay(2000, 5000);
    await page.waitForTimeout(preNavigationDelay);

    await page.goto(url, {
        waitUntil: 'commit',
        timeout: 30000,
    });

    await page.waitForLoadState('domcontentloaded');

    // Cache the page content
    productCache[url] = {
        title: await page.title(),
        timestamp: Date.now(),
        html: await page.content()
    };

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