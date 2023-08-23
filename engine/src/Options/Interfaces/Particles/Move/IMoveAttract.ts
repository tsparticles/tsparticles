import type { ICoordinates } from "../../../../Core/Interfaces/ICoordinates";
import type { RangeValue } from "../../../../Types/RangeValue";

/**
 */
export interface IMoveAttract {
    distance: RangeValue;

    enable: boolean;

    rotate: ICoordinates;
}
