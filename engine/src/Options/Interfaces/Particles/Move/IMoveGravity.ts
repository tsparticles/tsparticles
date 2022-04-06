import type { RangeValue } from "../../../../Types/RangeValue";

export interface IMoveGravity {
    acceleration: RangeValue;
    enable: boolean;
    inverse: boolean;
    maxSpeed: RangeValue;
}
