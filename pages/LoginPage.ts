import { Page } from '@playwright/test';

export class LoginPage {
    private page: Page;
    private usernameInput;
    private passwordInput;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = this.page.getByPlaceholder('Username');
        this.passwordInput = this.page.getByPlaceholder('Password');
    }

    async open(): Promise<void> {
        await this.page.goto('/');
    }

    async fillUsername(username: string): Promise<void> {
        await this.usernameInput.fill(username);
    }

    async fillPassword(password: string): Promise<void> {
        await this.passwordInput.fill(password);
    }

    async clickLoginButton(): Promise<void> {
        await this.page.getByRole('button', { name: 'Login' }).click();
    }

    async login(username: string, password: string): Promise<void> {
        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.clickLoginButton();
    }
}