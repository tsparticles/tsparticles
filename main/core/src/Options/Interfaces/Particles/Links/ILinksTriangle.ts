import type { IColor } from "../../../../Core/Interfaces/Colors";

/**
 * @category Options
 */
export interface ILinksTriangle {
    color?: string | IColor;
    enable: boolean;
    frequency: number;
    opacity?: number;
}
