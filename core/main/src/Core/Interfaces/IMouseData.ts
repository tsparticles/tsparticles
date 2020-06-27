import type { ICoordinates } from "./ICoordinates";

export interface IMouseData {
    clickPosition?: ICoordinates;
    position?: ICoordinates;
    downPosition?: ICoordinates;
    clickTime?: number;
    inside: boolean;
    clicking: boolean;
}
