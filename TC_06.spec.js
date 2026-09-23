import { test, expect } from '@playwright/test';

test('TC_06 - Login with valid username and blank password', async ({ page }) => {

  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  await page.getByPlaceholder('Username').fill('Admin');

  // Password blank chhoda hai
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Required')).toBeVisible();

});
