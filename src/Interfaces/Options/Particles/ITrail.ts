import {IOptionLoader} from "../IOptionLoader";
import {IColor} from "./IColor";

export interface ITrail extends IOptionLoader<ITrail> {
    fillColor: string | IColor;
    enable: boolean;
    length: number;
}
