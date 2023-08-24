import { Button_object } from './Button_object';

/**
 * Representing browser Button object
 * @class
 */
export class SlowButton_object extends Button_object{


/**
 * Clicking Button object
 * Function will wait pauseTimeS seconds before clicking
 * @function
 */
  async click(pauseTimeS = 0.5): Promise<void> {
    console.log(`>>> Pause and plicking button: locator${this.element}`);
    this.page.waitForTimeout(pauseTimeS * 1000);
    if (await this.element.count() > 1) {
      await this.element.first().click();
      return;
    }
    await this.element.first().click();
  }

}

