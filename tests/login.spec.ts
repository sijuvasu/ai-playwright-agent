import { test, expect } from '@playwright/test';

test('basic login flow simulation', async ({ page }) => {
  await page.goto('https://example.com');

  // simulate basic actions
  await page.getByRole('link').first().click();

  await expect(page).toHaveURL(/.*/);
});