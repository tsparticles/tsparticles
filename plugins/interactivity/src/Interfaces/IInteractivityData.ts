import type { IMouseData } from "./IMouseData.js";

/** Interactivity data interface containing mouse and element info */
export interface IInteractivityData {
  element?: HTMLElement | Node | typeof globalThis | null;
  mouse: IMouseData;
  status?: string;
}
