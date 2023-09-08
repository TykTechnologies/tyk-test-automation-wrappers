import { DropDown_object } from './DropDown_object';

/**
 * Representing browser dropDown object
 * @class
 */
export class SlowDropDown_object extends DropDown_object{
 /**
 * selecting option.
 * function will open dropDown list and click on element equal to provided text or
 * with provided text if equal text option does not exist
 * @param {String} option text
 * @function
 */
 async selectOption(text: string, pauseTimeS = 0.5): Promise<void> {
  await this.page.waitForTimeout(pauseTimeS * 1000);
  await super.selectOption(text);
}

}

