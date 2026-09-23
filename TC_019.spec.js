import { test, expect } from '@playwright/test';

test('TC_19 - Verify login again after logout', async ({ page }) => {

  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  // First login
  await page.getByPlaceholder('Username').fill('Admin');
  await page.getByPlaceholder('Password').fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/dashboard/);

  // Logout
  await page.locator('.oxd-userdropdown-tab').click();
  await page.getByText('Logout').click();

  // Login again
  await page.getByPlaceholder('Username').fill('Admin');
  await page.getByPlaceholder('Password').fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();

  // Verify login successful again
  await expect(page).toHaveURL(/dashboard/);

});