import type { IOptionLoader } from "../../IOptionLoader";
import type { IColor } from "../../../../Core/Interfaces/IColor";

export interface IGrabLineLinked extends IOptionLoader<IGrabLineLinked> {
    opacity: number;
    color?: string | IColor;
}
