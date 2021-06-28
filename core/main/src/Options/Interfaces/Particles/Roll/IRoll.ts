import type { RangeValue, SingleOrMultiple } from "../../../../Types";
import type { IColor } from "../../../../Core/Interfaces/Colors";
import type { IRollLight } from "./IRollLight";

export interface IRoll {
    backColor?: SingleOrMultiple<string> | IColor;
    darken: IRollLight;
    enable: boolean;
    enlighten: IRollLight;
    speed: RangeValue;
}
