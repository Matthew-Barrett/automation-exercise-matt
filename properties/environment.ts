// properties/environment.ts
export const ENV = process.env.TEST_ENV || 'dev';

export const CONFIG = {
  dev: {
    baseUrl: 'https://automationexercise.com/',
    password: 'D3v3nv1r0m3nt',
  },
  test: {
    baseUrl: 'https://test.automationexercise.com/',
    password: 'T35t3nv1r0m3nt',
  },
}[ENV] || {};

interface Config {
    baseUrl: string;
    password: string;
}

interface Page {
    goto(url: string, options: { waitUntil: string }): Promise<Response | null>;
}

interface Response {
    ok(): boolean;
}

export async function isEnvironmentReachable(page: Page): Promise<boolean> {
    try {
        if (!CONFIG.baseUrl) {
            throw new Error('Invalid environment configuration');
        }
        const response = await page.goto(CONFIG.baseUrl, { waitUntil: 'domcontentloaded' });
        return response ? response.ok() : false;
    } catch {
        return false;
    }
}
