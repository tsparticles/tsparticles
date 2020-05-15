import type { IOptionLoader } from "../../IOptionLoader";
import type { ILineLinkedShadow } from "./ILineLinkedShadow";
import { ILineLinkedTriangle } from "./ILineLinkedTriangle";
import { IColor } from "../../../../Core/Interfaces/IColor";

export interface ILineLinked extends IOptionLoader<ILineLinked> {
    blink: boolean;
    color: string | IColor;
    consent: boolean;
    distance: number;
    enable: boolean;
    opacity: number;
    shadow: ILineLinkedShadow;
    triangles: ILineLinkedTriangle;
    warp: boolean;
    width: number;
}
