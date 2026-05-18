
import { test, expect } from '@playwright/test';

test('generated test', async ({ page }) => {
  await page.goto('https://example.com');

          await page.getByRole('link', { name: 'Learn more' }).click();
          await page.waitForURL(/.*/);
          });
