import {IOptionLoader} from "../IOptionLoader";
import {ILineLinkedShadow} from "./ILineLinkedShadow";
import {IColor} from "./IColor";

export interface ILineLinked extends IOptionLoader<ILineLinked> {
    blink: boolean;
    color: string | IColor;
    consent: boolean;
    distance: number;
    enable: boolean;
    opacity: number;
    shadow: ILineLinkedShadow;
    width: number;
}
