import type { IOptionsColor } from "tsparticles-engine";

/**
 * @category Options
 */
export interface IGrabLinks {
    blink: boolean;
    color?: string | IOptionsColor;
    consent: boolean;
    opacity: number;
}
