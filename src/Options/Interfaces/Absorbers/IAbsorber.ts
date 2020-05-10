import type { IOptionLoader } from "../IOptionLoader";
import type { ICoordinates } from "../../../Core/Interfaces/ICoordinates";
import type { IColor } from "../../../Core/Interfaces/IColor";
import type { IAbsorberSize } from "./IAbsorberSize";

export interface IAbsorber extends IOptionLoader<IAbsorber> {
    color: IColor | string;
    opacity: number;
    position?: ICoordinates;
    size: IAbsorberSize;
}

