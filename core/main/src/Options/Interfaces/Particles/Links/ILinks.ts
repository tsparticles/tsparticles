import type { ILinksShadow } from "./ILinksShadow";
import type { ILinksTriangle } from "./ILinksTriangle";
import type { IColor } from "../../../../Core/Interfaces/IColor";

export interface ILinks {
    id?: string;
    blink: boolean;
    color: string | IColor;
    consent: boolean;
    distance: number;
    enable: boolean;
    opacity: number;
    shadow: ILinksShadow;
    triangles: ILinksTriangle;
    warp: boolean;
    width: number;
}
