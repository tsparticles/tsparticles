import type { IColor } from "../../../../Core/Interfaces/Colors";
import type { IRollLight } from "./IRollLight";
import type { RangeValue } from "../../../../Types/RangeValue";
import type { RollMode } from "../../../../Enums/Modes/RollMode";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";

export interface IRoll {
    backColor?: SingleOrMultiple<string> | IColor;
    darken: IRollLight;
    enable: boolean;
    enlighten: IRollLight;
    mode: RollMode | keyof typeof RollMode;
    speed: RangeValue;
}
