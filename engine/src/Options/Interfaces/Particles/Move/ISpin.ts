import type { ICoordinatesWithMode } from "../../../../Core/Interfaces/ICoordinates.js";
import type { RangeValue } from "../../../../Types/RangeValue.js";

export interface ISpin {
    acceleration: RangeValue;
    enable: boolean;
    position?: ICoordinatesWithMode;
}
