import type { RangeValue, SingleOrMultiple } from "../../../../Types";
import type { IColor } from "../../../../Core/Interfaces";
import type { IRollLight } from "./IRollLight";
import type { RollMode } from "../../../../Enums";

export interface IRoll {
    backColor?: SingleOrMultiple<string> | IColor;
    darken: IRollLight;
    enable: boolean;
    enlighten: IRollLight;
    mode: RollMode | keyof typeof RollMode;
    speed: RangeValue;
}
