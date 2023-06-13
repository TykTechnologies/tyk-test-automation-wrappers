import { type Locator } from '@playwright/test'

/**
 * Representing all browser objects
 * @class
 */
class Wrapper {
  readonly element: Locator

  constructor (element: Locator) {
    this.element = element
  }

  /**
 * Clicking object
 * if button not exists or is not clickable - function will wait
 * @function
 */
  async click (): Promise<void> {
    await this.element.click()
  }

  /**
 * Clicking object
 * if button not exists or is not clickable - function will wait
 * @function
 */
  $ (selector: string): Locator {
    return this.element.locator(selector)
  }

  /**
 * Clicking browser object using js command executed inside browser
 * Could be used when regular $element.click() is not working
 * @function
 */
  // jsClick() {
  //   console.log(`>>> Clicking ${this.element} executing JS command`)
  //   return browser.execute("arguments[0].click();", this.element);
  // }

  /**
 * @function
 */
  async waitForExist (): Promise<void> {
    await this.element.waitFor()
  };

  /**
 * @function
 */
  async waitForClickable (): Promise<void> {
    await this.waitForExist()
    await this.element.waitFor({ state: 'visible' })
  }

  /**
 * @function
 */
  async fill (value: string): Promise<void> {
    return await this.element.fill(value)
  }

//   /**
//  * @function
//  */
//   async getText () { return await this.element.getText() }

//   /**
//  * @function
//  */
//   async getValue () { return await this.element.getValue() }

//   /**
//  * @function
//  */
//   async waitForDisplayed () { return await this.element.waitForDisplayed() }

//   /**
//  * @function
//  */
//   async getAttribute (attributeName) { return await this.element.getAttribute(attributeName) }

//   /**
//  * @function
//  */
//   async getCSSProperty (cssProperty) { return await this.element.getCSSProperty(cssProperty) }

//   /**
//  * @function
//  */
//   async getSize () { return await this.element.getSize() }

//   /**
//  * @function
//  */
//   async isDisplayed () { return await this.element.isDisplayed() }

//   /**
//  * @function
//  */
//   async isClickable () { return await this.element.isClickable() }

//   /**
//  * @function
//  */
//   async isFocused () { return await this.element.isFocused() }

//   /**
//  * @function
//  */
//   async isExisting () { return await this.element.isExisting() }

//   /**
//  * @function
//  */
//   async getProperty (property) { return await this.element.getProperty(property) }

//   /**
//  * @function
//  */
//   async scrollIntoView () { return await this.element.scrollIntoView() }

//   /**
//  * @function
//  */
//   async waitForEnabled () { return await this.element.waitForEnabled() }

//   /**
//  * @function
//  */
//   async setValue (value) { return await this.element.setValue(value) }
}

module.exports = Wrapper
