
import { test, expect } from '@playwright/test';

test('generated flow', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('#user-name').click();
  await page.waitForLoadState('networkidle');
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').click();
  await page.waitForLoadState('networkidle');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();
  await page.waitForLoadState('networkidle');
  await page.locator('#add-to-cart-sauce-labs-backpack').click();
  await page.waitForLoadState('networkidle');
  await page.locator('text=1').click();
  await page.waitForLoadState('networkidle');
  await page.locator('#checkout').click();
  await page.waitForLoadState('networkidle');
  await page.locator('#first-name').click();
  await page.waitForLoadState('networkidle');
  await page.locator('#first-name').fill('firstname');
  await page.locator('#last-name').click();
  await page.waitForLoadState('networkidle');
  await page.locator('#last-name').fill('lastname');
  await page.locator('#postal-code').click();
  await page.waitForLoadState('networkidle');
  await page.locator('#postal-code').click();
  await page.waitForLoadState('networkidle');
  await page.locator('#postal-code').fill('123456');
  await page.locator('#continue').click();
  await page.waitForLoadState('networkidle');
  await page.locator('#cancel').click();
  await page.waitForLoadState('networkidle');
});
