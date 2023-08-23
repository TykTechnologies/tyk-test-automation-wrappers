import { Wrapper } from './Wrapper';
import { Locator } from '@playwright/test';

const accordionExpandedState = 'fa-chevron-up';
const accordionCollapsedState = 'fa-chevron-down';
const retryCount = 5;
/**
 * Representing browser Accordion object
 * @class
 */
export class Accordion_object extends Wrapper{
/**
 * expanding section.
 * function will expand section by clicking on accordion icon.
 * @function
 */
  async expand() {
    console.log(`>>> Trying to expand section`);
    let accordionIcon = await this.element.locator('i')?.getAttribute('class');
    console.log(accordionIcon);
    if (accordionIcon.includes(accordionExpandedState)) {
      console.log('>>> Section was already expanded');
      return;
    }
    let i = retryCount;
    while (accordionIcon.includes(accordionCollapsedState) && (i > 0)){
      console.log('>>> clicking to expand');
      await this.element.click();
      i-- ;
      accordionIcon = await this.element.locator('i')?.getAttribute('class');
    }
    if (accordionIcon.includes(accordionCollapsedState)) {
      throw '>>> Was not able to expand section';
    }
  }

/**
 * collapsing seciton.
 * function will collaps section by clicking on accordion icon
 * @function
 */
  async collapse() {
    console.log(`>>> Trying to collapse section`);
    let accordionIcon = await this.element.locator('i')?.getAttribute('class');
    console.log(accordionIcon);
    if (accordionIcon.includes(accordionCollapsedState)) {
      console.log('>>> Section was already collapsed');
      return;
    }
    let i = retryCount;
    while (accordionIcon.includes(accordionExpandedState) && (i > 0)){
      console.log('>>> clicking to collapse');
      await this.element.click();
      i--;
      // browser.pause(1000);
      accordionIcon = await this.element.locator('i')?.getAttribute('class');
    }
    if (accordionIcon.includes(accordionExpandedState)) {
      throw '>>> Was not able to collapse section';
    }
  }

}