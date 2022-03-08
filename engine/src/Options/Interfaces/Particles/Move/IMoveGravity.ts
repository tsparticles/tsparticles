import type { RangeValue } from "../../../../Types";

export interface IMoveGravity {
    acceleration: RangeValue;
    enable: boolean;
    inverse: boolean;
    maxSpeed: RangeValue;
}
