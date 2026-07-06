import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

const validUsername = 'standard_user';
const validPassword = 'secret_sauce';
const invalidUsername = 'invalid_user';
const invalidPassword = 'wrong_password';

test('User can open login page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await expect(page).toHaveTitle('Swag Labs');
    await expect(page.getByPlaceholder('Username')).toBeVisible();
    await expect(page.getByPlaceholder('Password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
});

test('User can login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(validUsername, validPassword);
    await expect(page).toHaveURL(/.*inventory\.html/);
    await expect(page.getByText('Products')).toBeVisible();
});

test('User cannot login with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(validUsername, invalidPassword);
    await expect(page.locator('[data-test="error"]')).toBeVisible();
});