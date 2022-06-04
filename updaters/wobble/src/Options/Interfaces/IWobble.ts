import type { IWobbleSpeed } from "./IWobbleSpeed";
import type { RangeValue } from "tsparticles-engine";

export interface IWobble {
    distance: RangeValue;
    enable: boolean;
    speed: RangeValue | IWobbleSpeed;
}
