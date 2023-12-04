import type { ICoordinates } from "./ICoordinates.js";

/**
 */
export interface IMouseData {
    clickPosition?: ICoordinates;
    clickTime?: number;
    clicking: boolean;
    downPosition?: ICoordinates;
    inside: boolean;
    position?: ICoordinates;
}
