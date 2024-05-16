import { Wrapper } from './Wrapper';
import { Locator, Page, expect } from '@playwright/test';


/**
 * Representing browser dropDown object
 * @class
 */
export class DropDown_object extends Wrapper{
  providedOptionTag;
  optionTagName = "li";
  get selectorTag() {return "select";}
  
  constructor(selector: Locator | string, page: Page, options?: {optionTagName: string}) {
    super(selector, page);
    this.providedOptionTag = options?.optionTagName;
  }

  private async setDropDownType() { 
    if (this.providedOptionTag !== undefined) {
      this.optionTagName = this.providedOptionTag;
      return;
    }
    const isDropDownHaveSelectTagName = await this.element.getAttribute('tagName') === this.selectorTag; 
    this.optionTagName =  (isDropDownHaveSelectTagName) ? "option" : "li";
  }

  private async getOptionElement(text: string | RegExp): Promise<Locator> {
    await this.setDropDownType();
    return this.page.locator(`${this.optionTagName}`).filter({ hasText: text });
  }

/**
 * selecting option.
 * function will open dropDown list and click on element equal to provided text or
 * with provided text if equal text option does not exist
 * @param {String} option text
 * @function
 */
 async selectOption(text: string | RegExp): Promise<void> {
  await this.setDropDownType();
  console.log(`>>> Selecting option: locator${this.optionTagName}=locator${text} in locator${this.element}`);
  await this.element.click();
  const optionElement = await this.getOptionElement(text);
  await optionElement.click();
}

/**
 * selecting option in a combobox object.
 * function will click on element equal to provided text or
 * with provided text if equal text option does not exist
 * it does not click the dropdown list
 * @param {String} option text
 * @function
 */
async selectComboboxOption(text: string) {
  console.log(`>>> Selecting option: locator{this.optionTagName}=locator{text} in locator{this.selector}`);
  const optionElement = await this.getOptionElement(text);
  // if (!optionElement.isVisible()){
  //   optionElement = this.page.locator(`locator{this.optionTagName}*=locator{text}`);
  // }
  // if (optionElement.waitFor()) {
  //   optionElement.click();
  //   return;
  // }
  // this.element.click();
  optionElement.click();
}  

/**
 * selecting multiple options.
 * function will open dropDown list and click on element with provided text
 * @param {Array} options array of options to be selected
 * @function
 */
 async selectOptions(options: string[]) {
  console.log(`>>> Selecting options: locator{options} in locator{this.selector}`);
  this.element.click();
  for (const option of options) {
    const optionElement = await this.getOptionElement(option);
    await optionElement.scrollIntoViewIfNeeded();
    await optionElement.click();
  }
  this.element.press('Escape');//sending Escape to close the list
}

/**
 * selecting first option from list.
 * function will open dropDown list and click on first element
 * @function
 */
  async selectFirstOption() {
    await this.setDropDownType();
    await this.element.click();
    const optionsList = this.page.locator('.tyk-combobox2__combobox-list');
    return await optionsList.locator(this.optionTagName).first().click();
  }
/**
 * selecting option at index.
 * function will open dropDown list and click on n-th element
 * @function
 */
  async selectOptionAtIndex(index: number) {
    await this.setDropDownType();
    await this.element.click();
    const optionsList = this.page.locator('.tyk-combobox2__combobox-list');
    const option = optionsList.locator(">" + this.optionTagName ).nth(index);
    await option.click();
  }

  /**
 * returning count of available options.
 * @function
 * @returns {Number} count of options
 */
  async getOptionCount(): Promise<number> {
    await this.setDropDownType();
    await this.element.click();
    const optionsList = this.page.locator('.tyk-combobox2__combobox-list');
    const options = await optionsList.locator(">" + this.optionTagName ).all();
    return options.length;
  }

  /**
   * inputing String values into mixed Input-Dropdown fields 
   * @param {String} value
   * @function
   */
   async setValue(value: string) {
    const inputField = this.element.locator('input');
    await expect(inputField).toBeAttached();
    await inputField.fill(value);
    await inputField.press("Enter");    
  }

}

