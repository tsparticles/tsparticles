import type { IMouseData } from "./IMouseData.js";

/**
 */
export interface IInteractivityData {
    element?: HTMLElement | Window | Node | null;
    mouse: IMouseData;
    status?: string;
}
