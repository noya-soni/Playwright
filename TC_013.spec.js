import { test, expect } from '@playwright/test';

test('TC_13 - Login with username and password exceeding allowed length', async ({ page }) => {

  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  const longValue = 'A'.repeat(300);

  await page.getByPlaceholder('Username').fill(longValue);
  await page.getByPlaceholder('Password').fill(longValue);

  await page.getByRole('button', { name: 'Login' }).click();

  // Login successful nahi hona chahiye
  await expect(page).not.toHaveURL(/dashboard/);

});