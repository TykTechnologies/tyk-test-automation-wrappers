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
  get ICON() {return this.element.locator('i');}
  /**
 * expanding section.
 * function will expand section by clicking on accordion icon.
 * @function
 */
  async expand() {
    console.log(`>>> Trying to expand section`);
    const accordionIcon = await this.element.locator('i');
    let accordionIconClass = await this.ICON.getAttribute('class');
    console.log(`>> Accordion class: ${accordionIconClass}`);
    if (accordionIconClass.includes(accordionExpandedState)) {
      console.log('>>> Section was already expanded');
      return;
    }
    let i = retryCount;
    while (accordionIconClass.includes(accordionCollapsedState) && (i > 0)){
      console.log('>>> clicking to expand');
      await this.element.click();
      i-- ;
      accordionIconClass = await this.element.locator('i').getAttribute('class');
    }
    if (accordionIconClass.includes(accordionCollapsedState)) {
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
    const accordionIcon = await this.element.locator('i').getAttribute('class');
    let accordionIconClass = await accordionIcon.getAttribute('class');
    console.log(accordionIcon);
    if (accordionIcon.includes(accordionCollapsedState)) {
      console.log('>>> Section was already collapsed');
      return;
    }
    let i = retryCount;
    while (accordionIconClass.includes(accordionExpandedState) && (i > 0)){
      console.log('>>> clicking to collapse');
      await this.element.click();
      i--;
      // browser.pause(1000);
      accordionIconClass = await this.element.locator('i').getAttribute('class');
    }
    if (accordionIconClass.includes(accordionExpandedState)) {
      throw '>>> Was not able to collapse section';
    }
  }

  async get

}