import type { IColor } from "../../../../Core/Interfaces/IColor";

export interface IGrabLinks {
    blink: boolean;
    color?: string | IColor;
    consent: boolean;
    opacity: number;
}
