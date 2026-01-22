import {
  type SingleOrMultiple,
  executeOnSingleOrMultiple,
  findItemFromSingleOrMultiple,
  isArray,
  isInArray,
} from "@tsparticles/engine";
import type { DivEvent } from "./Options/Classes/Events/DivEvent.js";
import type { IModeDiv } from "./Options/Interfaces/Modes/IModeDiv.js";

/**
 * Checks if the given selectors matches the element
 * @param element - element to check
 * @param selectors - selectors to check
 * @returns true or false, if the selector has found something
 */
function checkSelector(element: HTMLElement, selectors: SingleOrMultiple<string>): boolean {
  const res = executeOnSingleOrMultiple(selectors, selector => {
    return element.matches(selector);
  });

  return isArray(res) ? res.some(t => t) : res;
}

/**
 * Checks if the given div mode is enabled in the given div elements
 * @param mode - the div mode to check
 * @param divs - the div elements to check
 * @returns true if the div mode is enabled
 */
export function isDivModeEnabled(mode: string, divs: SingleOrMultiple<DivEvent>): boolean {
  return !!findItemFromSingleOrMultiple(divs, t => t.enable && isInArray(mode, t.mode));
}

/**
 * Execute the given callback if div mode in the given div elements is enabled
 * @param mode - the div mode to check
 * @param divs - the div elements to check
 * @param callback - the callback to execute
 */
export function divModeExecute(
  mode: string,
  divs: SingleOrMultiple<DivEvent>,
  callback: (id: string, div: DivEvent) => void,
): void {
  executeOnSingleOrMultiple(divs, div => {
    const divMode = div.mode,
      divEnabled = div.enable;

    if (divEnabled && isInArray(mode, divMode)) {
      singleDivModeExecute(div, callback);
    }
  });
}

/**
 * Execute the given callback for the given div event
 * @param div - the div event to execute the callback for
 * @param callback - the callback to execute
 */
export function singleDivModeExecute(div: DivEvent, callback: (selector: string, div: DivEvent) => void): void {
  const selectors = div.selectors;

  executeOnSingleOrMultiple(selectors, selector => {
    callback(selector, div);
  });
}

/**
 * Checks if the given element targets any of the div modes
 * @param divs - the div elements to check
 * @param element - the element to check
 * @returns true if the element targets any of the div modes
 */
export function divMode<T extends IModeDiv>(divs?: SingleOrMultiple<T>, element?: HTMLElement): T | undefined {
  if (!element || !divs) {
    return;
  }

  return findItemFromSingleOrMultiple(divs, div => {
    return checkSelector(element, div.selectors);
  });
}
