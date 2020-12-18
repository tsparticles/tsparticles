import type { IMouseData } from "./IMouseData";

/**
 * @category Interfaces
 */
export interface IContainerInteractivity {
    element?: HTMLElement | Window | Node | null;
    status?: string;
    mouse: IMouseData;
}
