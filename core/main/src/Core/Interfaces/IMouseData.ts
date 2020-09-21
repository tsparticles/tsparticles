import type { ICoordinates } from "./ICoordinates";

/**
 * @category Interfaces
 */
export interface IMouseData {
    clickPosition?: ICoordinates;
    position?: ICoordinates;
    downPosition?: ICoordinates;
    clickTime?: number;
    inside: boolean;
    clicking: boolean;
}
