import { DomEngine } from "../Dom/DomEngine.js";

/**
 * Creates a DOM-aware engine instance.
 * @returns A browser-ready engine instance
 */
export function createBrowserEngine(): DomEngine {
  return new DomEngine();
}
