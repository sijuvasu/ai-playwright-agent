
import { test, expect } from '@playwright/test';

test('generated test', async ({ page }) => {
  await page.goto('https://example.com');
  await page.locator('first_link').click();
  await page.goto('https://example.com');
  await page.locator('first_link').click();
  await page.goto('https://example.com');
  await page.locator('first_link').click();
  await page.goto('https://example.com');
  await page.locator('first_link').click();
  await page.goto('https://example.com');
  await page.locator('first_link').click();
  await page.goto('https://example.com');
  await page.locator('first_link').click();
});
