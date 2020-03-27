import type { IOptionLoader } from "../IOptionLoader";
import type { IColor } from "./IColor";

export interface ITrail extends IOptionLoader<ITrail> {
    fillColor: string | IColor;
    enable: boolean;
    length: number;
}
