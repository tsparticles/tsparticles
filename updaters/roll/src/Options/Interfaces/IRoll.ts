import type { IOptionsColor, RangeValue, RollMode, SingleOrMultiple } from "tsparticles-engine";
import type { IRollLight } from "./IRollLight";

export interface IRoll {
    backColor?: SingleOrMultiple<string> | IOptionsColor;
    darken: IRollLight;
    enable: boolean;
    enlighten: IRollLight;
    mode: RollMode | keyof typeof RollMode;
    speed: RangeValue;
}
