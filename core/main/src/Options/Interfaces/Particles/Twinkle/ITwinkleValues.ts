import type { IColor } from "../../../../Core/Interfaces/IColor";

export interface ITwinkleValues {
    color?: string | IColor;
    enable: boolean;
    frequency: number;
    opacity: number;
}
