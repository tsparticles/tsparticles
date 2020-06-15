import type { IOptionLoader } from "../IOptionLoader";
import type { IColor } from "../../../Core/Interfaces/IColor";

export interface ITrail extends IOptionLoader<ITrail> {
    fillColor: string | IColor;
    enable: boolean;
    length: number;
}
