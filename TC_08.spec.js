import { test, expect } from '@playwright/test';

test('TC_08 - Login with username containing only spaces', async ({ page }) => {

  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  await page.getByPlaceholder('Username').fill('   ');
  await page.getByPlaceholder('Password').fill('admin123');

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).not.toHaveURL(/dashboard/);

});