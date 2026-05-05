
import { test, expect } from '@playwright/test';

test('generated test', async ({ page }) => {
  await page.goto('https://example.com');
  await page.getByRole('link').first().click();
  await page.goto('https://example.com');
  await page.getByRole('link').first().click();
  await page.goto('https://example.com');
  await page.getByRole('link').first().click();
});
