import type { DomEngine } from "./Dom/DomEngine.js";
import { createBrowserEngine } from "./Dom/Api/createBrowserEngine.js";

/**
 * @returns the initialized engine object (DOM-aware)
 */
export function initEngine(): DomEngine {
  return createBrowserEngine();
}
