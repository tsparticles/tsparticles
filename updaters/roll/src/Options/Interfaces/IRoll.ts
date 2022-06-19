import type { IOptionsColor, RangeValue, SingleOrMultiple } from "tsparticles-engine";
import type { IRollLight } from "./IRollLight";
import type { RollMode } from "../../RollMode";

export interface IRoll {
    backColor?: SingleOrMultiple<string> | IOptionsColor;
    darken: IRollLight;
    enable: boolean;
    enlighten: IRollLight;
    mode: RollMode | keyof typeof RollMode;
    speed: RangeValue;
}
