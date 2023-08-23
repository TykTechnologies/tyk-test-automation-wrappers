import { Wrapper } from './Wrapper';
import { Locator, Page, expect } from '@playwright/test';
import { Input_object } from'./Input_object';
import { DropDown_object } from './DropDown_object';

/**
 * Representing OAS Map Claims/Client ID to Policy table object
 * @class
 */
export class OasMapToPolicyTable_object extends Wrapper {
/**
 * getting count of currently displayed rows.
 * each 'li' type node is counted as separate row
 * @function
 * @return {int}
 */
  async getRowCount(): Promise<number> {
    return await this.element.locator('li').count();
  }

/**
 * getting row from table that includes given cell value
 * @function
 * @param {String} cellValue value of cell to find. For example client id or claim name
 * @returns {Webelement}
 */
  async getRowWithValue(cellValue: string): Promise<Locator> {
    for (let rowNumber = 0; rowNumber < await this.getRowCount(); rowNumber++) {
      const rowElement = await this.element.locator('li').nth(rowNumber);
      if (await rowElement.locator('input').getAttribute('value') === cellValue)
        return rowElement;
    }
  }

/**
 * checking if row exists, only for VIEW mode
 * @function
 * @param {String} cellValue value of cell to find. For example client id or claim name
 * @returns {boolean}
 */
 async checkIfRowExists(cellValue: string): Promise<boolean> {
  for (let rowNumber = 0; rowNumber < await this.getRowCount(); rowNumber++) {
    const rowElement = await this.element.locator('li').nth(rowNumber);
    if (await rowElement.locator('div').first().textContent() === cellValue){
      return true;
    }
  }
  return false;
}

/**
 * getting row from table that in VIEW mode only
 * @function
 * @param {String} cellValue value of cell to find. For example client id or claim name
 * @returns {Webelement}
 */
 async getRowWithValueFromSavedTable(cellValue: string): Promise<Locator> {
  for (let rowNumber = 0; rowNumber < await this.getRowCount(); rowNumber++) {
    const rowElement = await this.element.locator('li').nth(rowNumber);
    if (await rowElement.locator('div').first().textContent() === cellValue)
      return rowElement;
  }
  throw new Error(`>>> Row with value ${cellValue} was not found`);
}

/**
 * adding new row to the table
 * @function
 * @param {String} cellName value of cell to add. For example client id or claim name
 * @param {String} policyName name of policy to select from dropdown
 */
  async addNewMapping(cellName: string, policyName: string) {
    const row = await this.getRowWithValue('');
    const cellInputField = await row.locator('input');
    const policyDropdown = await row.locator('span');
    await cellInputField.fill(cellName);
    await this.selectPolicyOption(policyDropdown, policyName);
  }

/**
 * changing cell name inside table for existing row
 * @function
 * @param {String} oldCellName value of cell to be replaced. For example client id or claim name
 * @param {String} newCellName new value of cell to be added. For example client id or claim name
 */
  async changeName(oldCellName: string, newCellName: string) {
    const row = await this.getRowWithValue(oldCellName);
    const cellInputField = await row.locator('input');
    await cellInputField.clearValue();
    await cellInputField.setValue(newCellName);
  }

/**
 * changing policy inside table for existing row
 * @function
 * @param {String} cellName value of cell for which policy will be replaced. For example client id or claim name
 * @param {String} policyName name of new policy to select from dropdown
 */
  async changePolicy(cellName: string, policyName: string) {
    const row = await this.getRowWithValue(cellName);
    const policyDropdown = await row.locator('span');
    await this.selectPolicyOption(policyDropdown, policyName);
  }

/**
 * delete row from table for given cell
 * @function
 * @param {String} cellName value of cell for which policy will be replaced. For example client id or claim name
 */
  async deleteMapping(cellName: string) {
    const row = await this.getRowWithValue(cellName);
    await row.locator('i').nth(1).click();
  }

/**
 * getting policy name for specific cell name. Used in VIEW mode only
 * @function
 * @param {String} cellName value of cell for which we return policy name. For example client id or claim name
 * @return {String}
 */
 async getPolicyValueForCell(cellName: string): Promise<string> {
    const row = await this.getRowWithValueFromSavedTable(cellName);
    return await row.locator('div').nth(3).textContent();
}

/**
 * selecting option.
 * function will open dropDown list and click on element with provided text
* @param {Webelement} policyDropdown policy dropdown Webelement to use 
* @param {String} policyName policy name to select from dropdown
 * @function
 */
 async selectPolicyOption(policyDropdown: Locator, policyName: string) {
    console.log(`>>> Selecting option: li*=${policyName}`);
    const optionElement = await this.page.locator(`//li[@title="${policyName}"]`);
    await policyDropdown.waitFor();
    await policyDropdown.click();
    if (await optionElement.isVisible()) {
      optionElement.click();
      return;
    }
    await policyDropdown.click();
    await optionElement.click();
  }

}