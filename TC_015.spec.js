import { test, expect } from '@playwright/test';

test('TC_15 - Verify login using Enter key with valid credentials', async ({ page }) => {

  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  await page.getByPlaceholder('Username').fill('Admin');
  await page.getByPlaceholder('Password').fill('admin123');

  await page.getByPlaceholder('Password').press('Enter');

  await expect(page).toHaveURL(/dashboard/);

});