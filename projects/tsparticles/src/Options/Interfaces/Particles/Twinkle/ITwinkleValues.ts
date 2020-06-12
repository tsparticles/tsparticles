import type { IOptionLoader } from "../../IOptionLoader";
import type { IColor } from "../../../../Core/Interfaces/IColor";

export interface ITwinkleValues extends IOptionLoader<ITwinkleValues> {
    color?: string | IColor;
    enable: boolean;
    frequency: number;
    opacity: number;
}
