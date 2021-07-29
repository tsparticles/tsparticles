import type { ICoordinates } from "../../../../Core/Interfaces";
import type { RangeValue } from "../../../../Types";

export interface ISpin {
    acceleration: RangeValue;
    enable: boolean;
    position?: ICoordinates;
}
