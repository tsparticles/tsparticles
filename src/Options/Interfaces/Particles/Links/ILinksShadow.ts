import type { IOptionLoader } from "../../IOptionLoader";
import type { IColor } from "../../../../Core/Interfaces/IColor";

export interface ILinksShadow extends IOptionLoader<ILinksShadow> {
    blur: number;
    color: string | IColor;
    enable: boolean;
}
