import { test, expect } from '@playwright/test';
import { recordAction } from '../utils/actionRecorder';

test('record user flow', async ({ page }) => {

  await page.goto('https://example.com');
  recordAction({ type: 'goto', url: 'https://example.com' });

  await page.getByRole('link').first().click();
  recordAction({ type: 'click', selector: 'first_link' });

  await expect(page).toHaveURL(/.*/);
});