import type { IOptionsColor, RangeValue, SingleOrMultiple } from "@tsparticles/engine";
import type { IRollLight } from "./IRollLight.js";
import type { RollMode } from "../../RollMode.js";

/** The roll options */
export interface IRoll {
  /** The roll back color */
  backColor?: SingleOrMultiple<string> | IOptionsColor;
  /** The roll darken options */
  darken: IRollLight;
  /** Enables the roll */
  enable: boolean;
  /** The roll enlighten options */
  enlighten: IRollLight;
  /** The roll mode */
  mode: RollMode | keyof typeof RollMode;
  /** The roll speed */
  speed: RangeValue;
}
