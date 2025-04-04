// tests/baseTest.ts or utils/baseTest.ts

import { test as base, expect } from '@playwright/test';
import { isEnvironmentReachable, CONFIG } from '../properties/environment'; // Adjust path if needed

export const test = base.extend<{}, {}>({
  page: async ({ page }, use) => {
    const reachable = await isEnvironmentReachable(page);
    if (!reachable) {
      test.skip(true, `Environment ${CONFIG.baseUrl} is not reachable`);
    }

    await page.setViewportSize({ width: 1920, height: 1080 });
    await use(page);
  }
});

export { expect };
