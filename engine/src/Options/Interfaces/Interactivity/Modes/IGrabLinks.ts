import type { IColor } from "../../../../Core/Interfaces/Colors";

/**
 * @category Options
 */
export interface IGrabLinks {
    blink: boolean;
    color?: string | IColor;
    consent: boolean;
    opacity: number;
}
