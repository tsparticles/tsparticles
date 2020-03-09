import {IOptionLoader} from "../IOptionLoader";

export interface ILineLinked extends IOptionLoader<ILineLinked> {
    blink: boolean;
    color: string;
    consent: boolean;
    distance: number;
    enable: boolean;
    opacity: number;
    width: number;
}
