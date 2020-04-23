import type { IOptionLoader } from "../IOptionLoader";
import type { ICoordinates } from "../../ICoordinates";
import type { IColor } from "../../IColor";
import type { IAbsorberSize } from "./IAbsorberSize";

export interface IAbsorber extends IOptionLoader<IAbsorber> {
    color: IColor | string;
    position?: ICoordinates;
    size: IAbsorberSize;
}

