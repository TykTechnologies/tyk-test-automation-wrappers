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
    return this.element.locator('tbody').locator('tr').count();
  }

// /**
//  * getting values from n'th row. Return values as map
//  * @function
//  * @param {int} rowNumber row number 0-indexed
//  * @return {String[]}
//  */
//   async getRowValues(rowNumber: number): Promise<string[]> {
//     return this.getRow(rowNumber).all('td').map( row => row.getText());
//   }

// /**
//  * getting values from n'th row. Return values as map
//  * @function
//  * @param {int} rowNumber row number 0-indexed
//  * @return {String[]}
//  */
//   async getRow(rowNumber: number): Promise<Locator> {
//   return (await this.element.locator('tbody tr').all()).at(rowNumber);
//   }

// /**
//  * getting values from first row that includes given value. Return values as map
//  * @function
//  * @param {String} cellValue value of cell to find. For example user name -> to get values that are in user row
//  * @returns {String[]}
//  */
//   getRowWithValue(cellValue) {
//     for (let rowNumber = 0; rowNumber < this.getRowCount(); rowNumber++) {
//       let rowValues = this.getRowValues(rowNumber);
//       if (rowValues.includes(cellValue))
//         return rowValues;
//     }
//   }

//   //TODO:
//   isRowWithValuesPreset(...values) {
//     values.forEach( value => console.log(value) );
//   }

// /**
//  * finding and clicking cell with provided text
//  * @function
//  * @param {String} cellValue value of cell to find and click. Foe example text of hyperlink displayed in cell
//   */
//   clickCellWithText(cellValue) {
//     console.log(`>>> Clicking cell with text locator{cellValue}`);
//     this.element.locator('tbody').waitFor();
//     try{
//       browser.waitUntil(() => this.element.locator('tbody').locator(`.//*[text() = "locator{cellValue}"]`).length === 1)
//       const cell = this.element.locator('tbody').locator(`.//*[text() = "locator{cellValue}"]`)[0];
//       cell.click();
//     }
//     catch(e) {
//       expect.fail(`Unable to click cell with text: locator{cellValue}. locator{e}. Number of cells found: locator{this.element.locator('tbody').locator(`td=locator{cellValue}`).length}`);
//     }

//   }

// /**
//  * checking if table not contains cell with provided value.
//  * Function can be used if we want to check if delete operation was performed correctly
//  *  and data are no longer visible in table
//  * @function
//  * @param {String} cellValue value of cell to find and click. Foe example text of hyperlink displayed in cell
//  * @return {boolean}
//   */
//   isCellWithTextNotDisplayed(text) {
//     if (this.element.isVisible())
//       return this.element.locator('tbody').locator(`.//*[normalize-space() = "locator{text}"]`).waitFor({ reverse: true });
//     return true;
//   }

//   waitForExist() {return this.element.waitFor();}
}

