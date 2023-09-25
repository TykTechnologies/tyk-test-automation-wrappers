import { Wrapper } from './Wrapper';
import { Locator } from '@playwright/test';

/**
 * Representing table object
 * @class
 */
export class Table_object extends Wrapper {
/**
 * getting count of currently displayed rows.
 * each 'tr' type node is counted as separate row
 * @function
 * @return {int}
 */
  async getRowCount(): Promise<number> {
    await this.element.locator('tbody').waitFor();
    return await this.element.locator('tbody').locator('tr').count();
  }

/**
 * getting values from n'th row. Return values as map
 * @function
 * @param {int} rowNumber row number 0-indexed
 * @return {String[]}
 */
  async getRowValues(rowNumber: number): Promise<string[]> {
    let row = await this.getRow(rowNumber);
    let rowValues = [];
    for (let cell of await row.locator('td').all()) {
      rowValues.push(await cell.innerText());
    }
    return rowValues;
  }

/**
 * getting values from n'th row. Return values as map
 * @function
 * @param {int} rowNumber row number 0-indexed
 * @return {String[]}
 */
  async getRow(rowNumber: number): Promise<Locator> {
  return this.element.locator('tbody tr').nth(rowNumber);
  }

/**
 * getting values from first row that includes given value. Return values as map
 * @function
 * @param {String} cellValue value of cell to find. For example user name -> to get values that are in user row
 * @returns {String[]}
 */
  async getRowWithValue(cellValue: string): Promise<string[]> {
    for (let rowNumber = 0; rowNumber < await this.getRowCount(); rowNumber++) {
      let rowValues = await this.getRowValues(rowNumber);
      if (rowValues.includes(cellValue))
        return rowValues;
    }
    return [];
  }

  async isCellWithTextPreset(text: string): Promise<boolean> {
    return await this.element.getByText(text).isVisible();
  }

/**
 * finding and clicking cell with provided text
 * @function
 * @param {String} cellValue value of cell to find and click. Foe example text of hyperlink displayed in cell
  */
  async clickCellWithText(cellValue: string) {
    console.log(`>>> Clicking cell with text locator{cellValue}`);
    await this.element.locator('tbody').waitFor(); 
    await this.element.getByText(cellValue).click();
  }

/**
 * checking if table not contains cell with provided value.
 * Function can be used if we want to check if delete operation was performed correctly
 *  and data are no longer visible in table
 * @function
 * @param {String} cellValue value of cell to find and click. Foe example text of hyperlink displayed in cell
 * @return {boolean}
  */
  async isCellWithTextNotDisplayed(text: string): Promise<boolean> {
    if (await this.element.isVisible()) {
      const isCellVisible = await this.element.getByText(text).isVisible();
      return !isCellVisible;
    }
    return true; //if table is not visible - we can assume that cell is not visible
  }

}

