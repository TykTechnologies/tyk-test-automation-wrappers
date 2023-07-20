import { Wrapper } from './Wrapper';

/**
 * Representing browser input object
 * @class
 */
export class Input_object extends Wrapper{
/**
 * setting value of input field.
 * if field contains any value -> it will be replaced
 * @param {String} value text
 * @function
 */
  async fill(value: string): Promise<void> {
    console.log(`>>> Setting value: ${value} to ${this.element}`);
    await this.element.fill(value);
  }

//   clear() {
//     this.element.click();
//     //preparing CTRL/COMMAND key code depending on system
//     const CTRL_KEY =  (process.platform == 'darwin') ? '\uE03D' : '\uE009'; 
//     this.element.keys([CTRL_KEY, 'a']);
//     this.element.keys("\uE017"); //sending 'delete'
//     if (this.element.getValue() !== '')
//       console.warn(`>>> Field was not cleared. Current value: ${this.element.getValue()}`);
//   }

/**
 * @function
 */
  clearValue() {return this.element.clear();}

  /**
 * @function
 */
  type(text: string, options?: {delay?: number; noWaitAfter?: boolean; timeout?: number;}) {return this.element.type(text, options);}

}