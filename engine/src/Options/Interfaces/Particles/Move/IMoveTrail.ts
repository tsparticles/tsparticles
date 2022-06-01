import type { IOptionsColor } from "../../IOptionsColor";

/**
 * @category Options
 */
export interface IMoveTrail {
    fillColor: string | IOptionsColor;
    enable: boolean;
    length: number;
}
