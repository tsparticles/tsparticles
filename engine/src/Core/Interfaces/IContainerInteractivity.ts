import type { IMouseData } from "./IMouseData.js";

/**
 */
export interface IContainerInteractivity {
    element?: HTMLElement | Window | Node | null;
    mouse: IMouseData;
    status?: string;
}
