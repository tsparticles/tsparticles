import type { IMouseData } from "./IMouseData";

/**
 * @category Interfaces
 */
export interface IContainerInteractivity {
    element?: HTMLElement | Window | Node | null;
    mouse: IMouseData;
    status?: string;
}
