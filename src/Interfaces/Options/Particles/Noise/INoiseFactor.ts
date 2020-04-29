import { INoiseValue } from "./INoiseValue";
import { IOptionLoader } from "../../IOptionLoader";

export interface INoiseFactor extends IOptionLoader<INoiseFactor> {
    horizontal: INoiseValue;
    vertical: INoiseValue;
}
