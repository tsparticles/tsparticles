import type { IOptionLoader } from "../IOptionLoader";
import type { IColor } from "./IColor";

export interface ILineLinkedShadow extends IOptionLoader<ILineLinkedShadow> {
    blur: number;
    color: string | IColor;
    enable: boolean;
}
