import { test, expect } from '@playwright/test';

test('TC_09 - Login with password containing only spaces', async ({ page }) => {

  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  await page.getByPlaceholder('Username').fill('Admin');
  await page.getByPlaceholder('Password').fill('   ');

  await page.getByRole('button', { name: 'Login' }).click();

  // Login successful nahi hona chahiye
  await expect(page).not.toHaveURL(/dashboard/);

});