import { Page, expect, Locator, FrameLocator } from '@playwright/test';

export class CartPage {
    private page: Page;
    private itemsInCartBadge: Locator;


    constructor(page: Page) {
        this.page = page;
        this.itemsInCartBadge = this.page.locator('.shopping_cart_badge');
    }

    async expectItemsInCartBadgeCount(expectedCount: number): Promise<void> {
        if (expectedCount === 0) {
            await expect(this.itemsInCartBadge).toHaveCount(0);
            return;
        }   
        await expect(this.itemsInCartBadge).toHaveText(expectedCount.toString());
    }

    async expectCartContainsItem(itemName: string): Promise<void> {
        const cartItem = this.page.locator(`.cart_item:has-text("${itemName}")`);
        await expect(cartItem).toBeVisible();
    }

    async removeItemFromCart(itemName: string): Promise<void> {
        const removeButton = this.page.locator(`.cart_item:has-text("${itemName}") button`);
        await removeButton.click();
    }

        async correctItemInCart(itemName: string): Promise<void> {
        const cartItem = this.page.locator(`.cart_item:has-text("${itemName}")`);
        await expect(cartItem).toBeVisible();
    }
}


    