import type { ILightArea } from "./ILightArea";
import type { ILightShadow } from "./ILightShadow";

export interface ILight {
    area: ILightArea;
    shadow: ILightShadow;
}
