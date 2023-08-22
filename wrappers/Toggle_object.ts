import { Wrapper } from './Wrapper';
import { Locator } from '@playwright/test';

const containerClass = 'tyk-toggle__item';
const selectedToggleClass = 'tyk-toggle__item--active';
/**
 * Representing browser Toggle object
 * @class
 */
export class Toggle_object extends Wrapper{

/**
 * Clicking Toggle object
 * if Toggle not exists or is not clickable - function will wait
 * @function
 */
  async click() {
    console.log(`>>> Clicking toggle: ${this.element}`);
    const clickableElement = await (await this.getContainer()).locator('.tyk-toggle__item-notch');
    clickableElement.waitForClickable();
    clickableElement.click();
  }

  /**
 * Checking if toggle is selected
 * if Toggle is selected return true
 * @return {boolean}
 * @function
 */
  async isSelected(): Promise<boolean> {
    return (await this.getContainer()).getAttribute('class').includes(selectedToggleClass);
  }

  async getContainer(): Promise<Locator> {
    let currentElement = this.element;
    for (let levelsUp = 1; levelsUp <= 6; levelsUp++) {
      currentElement = await currentElement.locator("..");
      const currentElementClass = await currentElement.getAttribute('class');
      if (currentElementClass !== null && currentElementClass.includes(containerClass))
        return currentElement;
    }
    throw new Error('Unable to find container for toggle: ' + this.element);
  }

}