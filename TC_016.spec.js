import { test, expect } from '@playwright/test';

test('TC_16 - Verify login page loads with all essential login components', async ({ page }) => {

  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  await expect(page.getByPlaceholder('Username')).toBeVisible();

  await expect(page.getByPlaceholder('Password')).toBeVisible();

  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();

});