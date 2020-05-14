import type { IColor } from "../../../../Core/Interfaces/IColor";
import type { IOptionLoader } from "../../IOptionLoader";

export interface ILineLinkedTriangle extends IOptionLoader<ILineLinkedTriangle> {
    color?: string | IColor;
    enable: boolean;
    opacity?: number;
}
