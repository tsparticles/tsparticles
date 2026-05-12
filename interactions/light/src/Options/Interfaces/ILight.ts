import type { ILightArea } from "./ILightArea.js";
import type { ILightShadow } from "./ILightShadow.js";

/** Light mode options */
export interface ILight {
  /** The light area options */
  area: ILightArea;
  /** The light shadow options */
  shadow: ILightShadow;
}
