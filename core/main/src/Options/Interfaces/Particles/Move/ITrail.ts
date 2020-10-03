import type { IColor } from "../../../../Core/Interfaces/Colors";

/**
 * @category Options
 */
export interface ITrail {
    fillColor: string | IColor;
    enable: boolean;
    length: number;
}
