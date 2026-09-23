import { test, expect } from '@playwright/test';

test('TC_07 - Login with both username and password blank', async ({ page }) => {

  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  await page.getByRole('button', { name: 'Login' }).click();

  const requiredMessages = page.locator('span.oxd-input-field-error-message');

  await expect(requiredMessages).toHaveCount(2);

});