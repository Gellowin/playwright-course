import { Page, expect, Locator, FrameLocator } from '@playwright/test';

export class MainPage {
    private page: Page;
    private inventoryItems: Locator;
    private itemsInCartBadge: Locator;


    constructor(page: Page) {
        this.page = page;
        this.inventoryItems = this.page.locator('.inventory_item');
        this.itemsInCartBadge = this.page.locator('.shopping_cart_badge');
    }

    async expectInventoryItemsCount(expectedCount: number): Promise<void> {
        await expect(this.inventoryItems).toHaveCount(expectedCount);
    }

    async addItemToCart(itemName: string): Promise<void> {
        const addToCartButton = this.page.locator(`.inventory_item:has-text("${itemName}") button`);
        await addToCartButton.click();
    }

    async openCart(): Promise<void> {
        await this.page.locator('[data-test="shopping-cart-link"]').click();
    }

    async expectProductsHeaderVisible() {
    await expect(
        this.page.getByText('Products')
    ).toBeVisible();
}
}

    