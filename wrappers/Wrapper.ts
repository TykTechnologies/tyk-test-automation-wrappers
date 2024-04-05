import { Locator, expect, type Page } from '@playwright/test';

/**
 * Representing all browser objects
 * @class
 */

export class Wrapper {
  readonly element: Locator;
  readonly page: Page;

  constructor(selector: Locator | string, page: Page) {
    if (typeof selector === 'string') {
      this.element = page.locator(selector).first();
    } else {
      this.element = selector.first();
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
    await this.element.waitFor();
  }

  async fill(value: string, options?: { force?: boolean; noWaitAfter?: boolean; timeout?: number }): Promise<void> {
    await this.element.waitFor();
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
  async getAttribute(attributeName: string): Promise<string> {
    const attributeValue = await this.element.getAttribute(attributeName);
    if (attributeValue === null) {
      throw new Error(`Unable to get attribute ${attributeName} for element ${this.element}`);
    }
    return attributeValue;
  }

  /**
 * @function
 */
  async getCSSProperty(cssProperty: string): Promise<string | null> { return await this.element.getAttribute(cssProperty); }

  /**
 * @function
 */
  async isVisible(options?: { state?: 'attached' | 'detached' | 'visible' | 'hidden' | undefined; timeout?: number | undefined; } | undefined): Promise<boolean> { return await this.element.first().isVisible(options); }

  /**
* @function
*/
  async waitFor(options?: { state?: 'attached' | 'detached' | 'visible' | 'hidden' | undefined; timeout?: number | undefined; } | undefined): Promise<void> {
    await expect(async () => {
      if (await this.element.count() > 1) {
        return await this.element.first().waitFor(options);
      }
      return await this.element.waitFor(options);
    }).toPass({ timeout: 10000 });
  }


  /**
 * @function
 */
  async scrollIntoView(): Promise<void> { await this.element.scrollIntoViewIfNeeded(); }

  async toHaveValue(value: string): Promise<boolean> {
    return await this.element.inputValue() === value;
  }

  async press(key: string): Promise<void> {
    await this.element.press(key);
  }

  locator(selector: string): Locator {
    return this.element.locator(selector);
  }
}

