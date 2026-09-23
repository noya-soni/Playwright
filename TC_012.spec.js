import { test, expect } from '@playwright/test';

test('TC_12 - Login with password in different letter case', async ({ page }) => {

  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  await page.getByPlaceholder('Username').fill('Admin');
  await page.getByPlaceholder('Password').fill('ADMIN123');

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.locator('p.oxd-alert-content-text'))
    .toHaveText('Invalid credentials');

});