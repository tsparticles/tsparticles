import type { IOptionsColor, RangeValue, SingleOrMultiple } from "@tsparticles/engine";
import type { IRollLight } from "./IRollLight.js";
import type { RollMode } from "../../RollMode.js";

export interface IRoll {
  backColor?: SingleOrMultiple<string> | IOptionsColor;
  darken: IRollLight;
  enable: boolean;
  enlighten: IRollLight;
  mode: RollMode | keyof typeof RollMode;
  speed: RangeValue;
}
