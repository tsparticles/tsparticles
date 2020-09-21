import type { IColor } from "../../../../Core/Interfaces/IColor";

/**
 * @category Options
 */
export interface IGrabLinks {
    blink: boolean;
    color?: string | IColor;
    consent: boolean;
    opacity: number;
}
