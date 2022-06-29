import type { ICoordinates } from "./ICoordinates";

/**
 * @category Interfaces
 */
export interface IMouseData {
    clickPosition?: ICoordinates;
    clickTime?: number;
    clicking: boolean;
    downPosition?: ICoordinates;
    inside: boolean;
    position?: ICoordinates;
}
