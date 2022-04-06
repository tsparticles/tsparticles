import type { IColor } from "../../../../Core/Interfaces/Colors";

/**
 * @category Options
 */
export interface IGrabLinks {
    blink: boolean;
    color?: IColor | string;
    consent: boolean;
    opacity: number;
}
