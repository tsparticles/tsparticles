import type { ICoordinates } from "../../../../Core/Interfaces/ICoordinates";
import type { RangeValue } from "../../../../Types/RangeValue";

export interface ISpin {
    acceleration: RangeValue;
    enable: boolean;
    position?: ICoordinates;
}
