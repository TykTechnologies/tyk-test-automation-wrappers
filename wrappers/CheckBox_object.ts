import { Wrapper } from './Wrapper';
import { Locator, Page, expect } from '@playwright/test';

/**
 * Representing browser Checkbox object
 * @class
 */
export class Checkbox_object extends Wrapper{
  constructor(selector: Locator | string, page: Page) {
    super(selector, page);
  }

/**
 * selecting checkbox
 * if checkbox is already selected nothing will happen
 * @function
 */
  async check() {
    console.log('>>> Checking Checkbox!');
    await expect.poll( async () => {
      await this.element.waitFor();
      if (await this.element.isChecked()) {
        return true;
      }
      await this.element.click();
      return false;
    }).toBeTruthy();
  }

/**
 * unselecting checkbox
 * if checkbox is already unselected nothing will happen
 * @function
 */
   async uncheck() {
    console.log('>>> Unchecking Checkbox!');
    await expect.poll( async () => {
      await this.element.waitFor();
      const isChecked = await this.element.isChecked();
      if (!isChecked) {
        return true;
      }
      await this.element.click();
      return false;
    }).toBeTruthy();
  }

/**
 * checking if checkbox is selected (checked)
 * @function
 * @return {boolean}
 */
  async isSelected(): Promise<boolean> {
    await this.element.waitFor();
    return await this.element.isChecked();
  }

/**
 * checking if checkbox is not selected (unchecked)
 * @function
 * @return {boolean}
 */
     async isNotSelected(): Promise<boolean> {
      const isChecked = await this.element.isChecked();
      return !isChecked;
    }
    
}