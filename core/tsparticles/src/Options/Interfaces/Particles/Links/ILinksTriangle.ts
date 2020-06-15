import type { IColor } from "../../../../Core/Interfaces/IColor";
import type { IOptionLoader } from "../../IOptionLoader";

export interface ILinksTriangle extends IOptionLoader<ILinksTriangle> {
    color?: string | IColor;
    enable: boolean;
    opacity?: number;
}
