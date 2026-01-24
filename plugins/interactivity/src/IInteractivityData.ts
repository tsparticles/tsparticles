import type { IMouseData } from "./IMouseData.js";

/**
 */
export interface IInteractivityData {
  element?: HTMLElement | Node | typeof globalThis | null;
  mouse: IMouseData;
  status?: string;
}
