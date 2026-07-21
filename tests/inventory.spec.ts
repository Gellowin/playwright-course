import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { MainPage } from '../pages/MainPage';
import { CartPage } from '../pages/CartPage';

const validUsername = 'standard_user';
const validPassword = 'secret_sauce';
const firstItemName = 'Sauce Labs Backpack';

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(validUsername, validPassword);
})

test('Should display 6 inventory items', async ({ page }) => {
    const mainPage = new MainPage(page);
    await mainPage.expectInventoryItemsCount(6);
    await mainPage.expectProductsHeaderVisible();
});

test('Should add item to cart', async ({ page }) => {
    const mainPage = new MainPage(page);
    const cartPage = new CartPage(page);
    await mainPage.addItemToCart(firstItemName);
    await cartPage.expectItemsInCartBadgeCount(1);
    await mainPage.openCart();
    await cartPage.expectCartContainsItem(firstItemName);
    await cartPage.correctItemInCart(firstItemName);
    await cartPage.removeItemFromCart(firstItemName);
    await cartPage.expectItemsInCartBadgeCount(0);
});