import type { IOptionsColor } from "tsparticles-engine";

/**
 * @category Options
 */
export interface ILinksTriangle {
    color?: string | IOptionsColor;
    enable: boolean;
    frequency: number;
    opacity?: number;
}
