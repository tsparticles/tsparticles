import { INoiseFactor } from "./INoiseFactor";
import { IOptionLoader } from "../../IOptionLoader";

export interface INoise extends IOptionLoader<INoise> {
    enable: boolean;
    factor: INoiseFactor;
}
