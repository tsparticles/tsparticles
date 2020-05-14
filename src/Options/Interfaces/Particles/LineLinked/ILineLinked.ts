import type { IOptionLoader } from "../../IOptionLoader";
import type { ILineLinkedShadow } from "./ILineLinkedShadow";
import type { IAnimatableColor } from "../IAnimatableColor";
import { ILineLinkedTriangle } from "./ILineLinkedTriangle";

export interface ILineLinked extends IOptionLoader<ILineLinked> {
    blink: boolean;
    color: string | IAnimatableColor;
    consent: boolean;
    distance: number;
    enable: boolean;
    opacity: number;
    shadow: ILineLinkedShadow;
    triangles: ILineLinkedTriangle;
    warp: boolean;
    width: number;
}
