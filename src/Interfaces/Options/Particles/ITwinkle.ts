import type { IColor } from "../../IColor";
import type { IOptionLoader } from "../IOptionLoader";

export interface ITwinkle extends IOptionLoader<ITwinkle> {
    color?: string | IColor;
    enable: boolean;
    opacity: number;
    frequency: number;
}
