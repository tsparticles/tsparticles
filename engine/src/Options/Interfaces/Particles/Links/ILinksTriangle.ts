import type { IOptionsColor } from "../../IOptionsColor";

/**
 * @category Options
 */
export interface ILinksTriangle {
    color?: string | IOptionsColor;
    enable: boolean;
    frequency: number;
    opacity?: number;
}
