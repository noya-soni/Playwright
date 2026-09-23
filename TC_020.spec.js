import { test, expect } from '@playwright/test';

test('TC_20 - Verify invalid login functionality after authentication-related changes', async ({ page }) => {

  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  // Enter invalid credentials
  await page.getByPlaceholder('Username').fill('Admin');
  await page.getByPlaceholder('Password').fill('wrongpassword');

  // Click Login
  await page.getByRole('button', { name: 'Login' }).click();

  // Verify login should fail
  await expect(page.locator('p.oxd-alert-content-text'))
    .toHaveText('Invalid credentials');

});