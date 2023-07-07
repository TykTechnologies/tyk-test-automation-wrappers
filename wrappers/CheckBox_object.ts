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
    if (await this.isSelected()) 
      return;
    await this.element.click();
    await expect(this.element).toHaveValue('true');
  }

/**
 * unselecting checkbox
 * if checkbox is already unselected nothing will happen
 * @function
 */
   async uncheck() {
    console.log('>>> Unchecking Checkbox!');
    if (await this.isNotSelected()) 
      return;
    await this.element.click();
    await expect(this.element).toHaveValue('false');
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
      return await this.element.isDisabled();
    }
    
}