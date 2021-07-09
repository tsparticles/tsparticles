import type { ILightArea } from "./ILightArea";
import type { ILightShadow } from "./ILightShadow";

export interface ILight {
    shadow: ILightShadow;
    area: ILightArea;
}
