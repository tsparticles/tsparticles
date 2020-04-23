import type { IOptionLoader } from "../IOptionLoader";
import type { ICoordinates } from "../../ICoordinates";
import type { IColor } from "../../IColor";
import type { IBlackHoleSize } from "./IBlackHoleSize";

export interface IBlackHole extends IOptionLoader<IBlackHole> {
    color: IColor | string;
    position?: ICoordinates;
    size: IBlackHoleSize;
}

