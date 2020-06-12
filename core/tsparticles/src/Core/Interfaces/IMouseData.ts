import type { ICoordinates } from "./ICoordinates";

export interface IMouseData {
    clickPosition?: ICoordinates;
    position?: ICoordinates;
    clickTime?: number;
}
