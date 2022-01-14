import type { IColor } from "../../../../Core";

/**
 * @category Options
 */
export interface IGrabLinks {
    blink: boolean;
    color?: IColor | string;
    consent: boolean;
    opacity: number;
}
