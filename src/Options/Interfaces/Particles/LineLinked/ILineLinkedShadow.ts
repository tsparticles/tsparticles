import type { IOptionLoader } from "../../IOptionLoader";
import type { IColor } from "../../../../Core/Interfaces/IColor";

export interface ILineLinkedShadow extends IOptionLoader<ILineLinkedShadow> {
    blur: number;
    color: string | IColor;
    enable: boolean;
}
