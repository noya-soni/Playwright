import { test, expect } from '@playwright/test';

test('TC_01 - Login with valid credentials', async ({ page }) => {

  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  await page.getByPlaceholder('Username').fill('Admin');
  await page.getByPlaceholder('Password').fill('admin123');

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/dashboard/);

});

test('TC_02 - Login with invalid credentials', async ({ page }) => {

  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  await page.getByPlaceholder('Username').fill('wronguser');
  await page.getByPlaceholder('Password').fill('wrongpassword');

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Invalid credentials')).toBeVisible();

});

test('TC_03 - Login with empty username and password', async ({ page }) => {
 
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  await page.getByRole('button', {name: 'Login' }).click();

  await expect(page.getByText('Required')).toHaveCount(2);

});

test('TC_04 - Login with valid username and invalid password', async ({ page }) => {

  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  await page.getByPlaceholder('Username').fill('Admin');
  await page.getByPlaceholder('Password').fill('wrongpassword');

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.locator('p.oxd-alert-content-text')).toHaveText('Invalid credentials');

});

test('TC_05 - Login with blank username and valid password', async ({ page }) => {

  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  await page.getByPlaceholder('Password').fill('admin123');

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Required')).toBeVisible();

});

test('TC_06 - Login with valid username and blank password', async ({ page }) => {

  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  await page.getByPlaceholder('Username').fill('Admin');

  // Password blank chhoda hai
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Required')).toBeVisible();

});

test('TC_07 - Login with both username and password blank', async ({ page }) => {

  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  await page.getByRole('button', { name: 'Login' }).click();

  const requiredMessages = page.locator('span.oxd-input-field-error-message');

  await expect(requiredMessages).toHaveCount(2);

});

test('TC_08 - Login with username containing only spaces', async ({ page }) => {

  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  await page.getByPlaceholder('Username').fill('   ');
  await page.getByPlaceholder('Password').fill('admin123');

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).not.toHaveURL(/dashboard/);

});

test('TC_09 - Login with password containing only spaces', async ({ page }) => {

  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  await page.getByPlaceholder('Username').fill('Admin');
  await page.getByPlaceholder('Password').fill('   ');

  await page.getByRole('button', { name: 'Login' }).click();

  // Login successful nahi hona chahiye
  await expect(page).not.toHaveURL(/dashboard/);

});

test('TC_10 - Login with special characters in username', async ({ page }) => {

  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  await page.getByPlaceholder('Username').fill('!@#$%^&*');
  await page.getByPlaceholder('Password').fill('admin123');

  await page.getByRole('button', { name: 'Login' }).click();

  // Login successful nahi hona chahiye
  await expect(page).not.toHaveURL(/dashboard/);

});

test('TC_11 - Login with username in different letter case', async ({ page }) => {

  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  await page.getByPlaceholder('Username').fill('admin');
  await page.getByPlaceholder('Password').fill('admin123');

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/dashboard/);

});

test('TC_12 - Login with password in different letter case', async ({ page }) => {

  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  await page.getByPlaceholder('Username').fill('Admin');
  await page.getByPlaceholder('Password').fill('ADMIN123');

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.locator('p.oxd-alert-content-text'))
    .toHaveText('Invalid credentials');

});

test('TC_13 - Login with username and password exceeding allowed length', async ({ page }) => {

  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  const longValue = 'A'.repeat(300);

  await page.getByPlaceholder('Username').fill(longValue);
  await page.getByPlaceholder('Password').fill(longValue);

  await page.getByRole('button', { name: 'Login' }).click();

  // Login successful nahi hona chahiye
  await expect(page).not.toHaveURL(/dashboard/);

});

test('TC_14 - Verify password is masked while entering password', async ({ page }) => {

  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  await page.getByPlaceholder('Password').fill('admin123');

  await expect(page.getByPlaceholder('Password')).toHaveAttribute('type', 'password');

});

test('TC_15 - Verify login using Enter key with valid credentials', async ({ page }) => {

  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  await page.getByPlaceholder('Username').fill('Admin');
  await page.getByPlaceholder('Password').fill('admin123');

  await page.getByPlaceholder('Password').press('Enter');

  await expect(page).toHaveURL(/dashboard/);

});

test('TC_16 - Verify login page loads with all essential login components', async ({ page }) => {

  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  await expect(page.getByPlaceholder('Username')).toBeVisible();

  await expect(page.getByPlaceholder('Password')).toBeVisible();

  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();

});

test('TC_17 - Verify valid login functionality after a new build/deployment', async ({ page }) => {

  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  await page.getByPlaceholder('Username').fill('Admin');
  await page.getByPlaceholder('Password').fill('admin123');

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/dashboard/);

});

test('TC_18 - Verify valid login after changes in authentication module', async ({ page }) => {

  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  await page.getByPlaceholder('Username').fill('Admin');
  await page.getByPlaceholder('Password').fill('admin123');

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/dashboard/);

});

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
