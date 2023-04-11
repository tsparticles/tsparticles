import type { IMouseData } from "./IMouseData";

/**
 
 */
export interface IContainerInteractivity {
    element?: HTMLElement | Window | Node | null;
    mouse: IMouseData;
    status?: string;
}
