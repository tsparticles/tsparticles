import type { INoiseValue } from "./INoiseValue";
import type { IOptionLoader } from "../../IOptionLoader";

export interface INoiseFactor extends IOptionLoader<INoiseFactor> {
    horizontal: INoiseValue;
    vertical: INoiseValue;
}
