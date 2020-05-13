import type { IOptionLoader } from "../../IOptionLoader";
import type { ILineLinkedShadow } from "./ILineLinkedShadow";
import type { IAnimatableColor } from "../IAnimatableColor";

export interface ILineLinked extends IOptionLoader<ILineLinked> {
    blink: boolean;
    color: string | IAnimatableColor;
    consent: boolean;
    distance: number;
    enable: boolean;
    opacity: number;
    shadow: ILineLinkedShadow;
    warp: boolean;
    width: number;
}
