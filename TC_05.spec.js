import { test, expect } from '@playwright/test';

test('TC_05 - Login with blank username and valid password', async ({ page }) => {

  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  await page.getByPlaceholder('Password').fill('admin123');

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Required')).toBeVisible();

});