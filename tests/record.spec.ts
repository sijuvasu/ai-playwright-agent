import { test, expect } from '@playwright/test';
import { recordAction } from '../utils/actionRecorder';
import { clearActions } from '../utils/actionRecorder';

test.beforeEach(() => {
  clearActions();
});

test('record user flow', async ({ page }) => {

  await page.goto('https://example.com');
  recordAction({ type: 'goto', url: 'https://example.com' });

  await page.getByRole('link').first().click();
  recordAction({
    type: 'click',
    role: 'link',
    text: 'Learn more',
    navigation: true
  });

  await expect(page).toHaveURL(/.*/);
});