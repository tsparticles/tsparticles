import type { IOptionLoader } from "../../IOptionLoader";
import type { ILinksShadow } from "./ILinksShadow";
import { ILinksTriangle } from "./ILinksTriangle";
import { IColor } from "../../../../Core/Interfaces/IColor";

export interface ILinks extends IOptionLoader<ILinks> {
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
