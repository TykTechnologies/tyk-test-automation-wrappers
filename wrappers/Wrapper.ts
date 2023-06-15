import { Locator, type Page } from '@playwright/test';

/**
 * Representing all browser objects
 * @class
 */

export class Wrapper  {
  readonly element: Locator;
  readonly page: Page;

  constructor(selector: Locator | string, page: Page) {
    if (typeof selector === 'string') {
      this.element = page.locator(selector);
    } else {
      this.element = selector;
    }
    this.page = page;
  }

  /**
 * Clicking object
 * if button not exists or is not clickable - function will wait
 * @function
 */
  async click(): Promise<void> {
    if (await this.element.count() > 1) {
      await this.element.nth(0).click();
    } else {
      await this.element.click();
    }
  }

  /**
 * @function
 */
  async waitForExist(): Promise<void> {
		await await this.element.waitFor();
  }

  async fill(value: string, options?: {force?: boolean;noWaitAfter?: boolean;timeout?: number}): Promise<void> {
    await this.element.fill(value, options);
  }

  /**
 * @function
 */
  async getText(): Promise<string | null> { return await this.element.textContent(); }

  /**
 * @function
 */
  async getValue(): Promise<string> { return await this.element.inputValue(); }

  /**
 * @function
 */
  async waitForDisplayed(): Promise<void> { await this.element.waitFor({ state: 'visible' }); }

  /**
 * @function
 */
  async getAttribute(attributeName: string): Promise<string | null> { return await this.element.getAttribute(attributeName); }

  /**
 * @function
 */
  async getCSSProperty(cssProperty: string): Promise<string | null> { return await this.element.getAttribute(cssProperty); }

  /**
 * @function
 */
  async isVisible(options?: { state?: 'attached' | 'detached' | 'visible' | 'hidden' | undefined; timeout?: number | undefined; } | undefined): Promise<boolean> 
  { return await this.element.isVisible(options); }

    /**
 * @function
 */
    waitFor(options?: { state?: 'attached' | 'detached' | 'visible' | 'hidden' | undefined; timeout?: number | undefined; } | undefined): Promise<void> {
			return this.element.waitFor(options);
    }

  /**
 * @function
 */
  async scrollIntoView(): Promise<void> { await this.element.scrollIntoViewIfNeeded(); }

  async toHaveValue(value: string): Promise<boolean> {
    return await this.element.inputValue() === value;
  }
}

