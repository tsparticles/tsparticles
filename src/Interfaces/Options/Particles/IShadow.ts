import {ICoordinates} from "../../ICoordinates";
import {IOptionLoader} from "../IOptionLoader";
import {IColor} from "./IColor";

export interface IShadow extends IOptionLoader<IShadow> {
    blur: number;
    color: string | IColor;
    enable: boolean;
    offset: ICoordinates;
}
