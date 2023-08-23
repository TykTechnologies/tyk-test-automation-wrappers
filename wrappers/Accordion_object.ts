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
    if (await this.isExpanded()) {
      console.log('>>> Section was already expanded');
      return;
    }
    let i = retryCount;
    while (await this.isCollapsed() && (i > 0)){
      console.log('>>> clicking to expand');
      await this.element.click();
      i-- ;
      await this.page.waitForTimeout(1000);
    }
    if (await this.isCollapsed()) {
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
    if (await this.isCollapsed()) {
      console.log('>>> Section was already collapsed');
      return;
    }
    let i = retryCount;
    while (await this.isExpanded() && (i > 0)){
      console.log('>>> clicking to collapse');
      await this.element.click();
      i--;
      await this.page.waitForTimeout(1000);
    }
    if (await this.isExpanded()) {
      throw '>>> Was not able to collapse section';
    }
  }

  async isExpanded(): Promise<boolean> {
    const accordionIconClass = await this.ICON.getAttribute('class');
    if (accordionIconClass === null) {
      throw '>>> Was not able to get accordion icon class';
    }
    return accordionIconClass.includes(accordionExpandedState);
  }

  async isCollapsed(): Promise<boolean> {
    const isExpanded = await this.isExpanded();
    return !isExpanded;
  }

}