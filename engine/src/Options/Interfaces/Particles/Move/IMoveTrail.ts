import type { IColor } from "../../../../Core/Interfaces/Colors";

/**
 * @category Options
 */
export interface IMoveTrail {
    fillColor: string | IColor;
    enable: boolean;
    length: number;
}
