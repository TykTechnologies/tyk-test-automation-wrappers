import { Wrapper } from './Wrapper';

/**
 * Representing browser Button object
 * @class
 */
export class Button_object extends Wrapper{


/**
 * Clicking Button object
 * if button not exists or is not clickable - function will wait
 * @function
 */
  async click(): Promise<void> {
    console.log(`>>> Clicking button: locator${this.element}`);
    if (await this.element.count() > 1) {
      await this.element.first().click();
      return;
    }
    await super.waitFor({state: 'visible'});
    await this.element.first().click();
  }

}

