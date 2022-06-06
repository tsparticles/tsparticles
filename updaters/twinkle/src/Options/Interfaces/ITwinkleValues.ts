import type { IOptionsColor, RangeValue } from "tsparticles-engine";

/**
 * @category Options
 */
export interface ITwinkleValues {
    color?: string | IOptionsColor;
    enable: boolean;
    frequency: number;
    opacity: RangeValue;
}
