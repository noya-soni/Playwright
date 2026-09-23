import { test, expect } from '@playwright/test';

test('TC_14 - Verify password is masked while entering password', async ({ page }) => {

  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  await page.getByPlaceholder('Password').fill('admin123');

  await expect(page.getByPlaceholder('Password')).toHaveAttribute('type', 'password');

});