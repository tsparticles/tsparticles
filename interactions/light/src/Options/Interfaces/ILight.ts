import type { ILightArea } from "./ILightArea.js";
import type { ILightShadow } from "./ILightShadow.js";

export interface ILight {
  area: ILightArea;
  shadow: ILightShadow;
}
