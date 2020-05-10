import type { ICoordinates } from "../../../Core/Interfaces/ICoordinates";
import type { IOptionLoader } from "../IOptionLoader";
import type { IColor } from "../../../Core/Interfaces/IColor";

export interface IShadow extends IOptionLoader<IShadow> {
    blur: number;
    color: string | IColor;
    enable: boolean;
    offset: ICoordinates;
}
