import type { IOptionsColor } from "../../IOptionsColor";

/**
 * @category Options
 */
export interface IGrabLinks {
    blink: boolean;
    color?: string | IOptionsColor;
    consent: boolean;
    opacity: number;
}
