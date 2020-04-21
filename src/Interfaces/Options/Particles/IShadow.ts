import type { ICoordinates } from "../../ICoordinates";
import type { IOptionLoader } from "../IOptionLoader";
import type { IColor } from "../../IColor";

export interface IShadow extends IOptionLoader<IShadow> {
    blur: number;
    color: string | IColor;
    enable: boolean;
    offset: ICoordinates;
}
