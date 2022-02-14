import type { IColor } from "../../../../Core";

/**
 * @category Options
 */
export interface IMoveTrail {
    fillColor: string | IColor;
    enable: boolean;
    length: number;
}
