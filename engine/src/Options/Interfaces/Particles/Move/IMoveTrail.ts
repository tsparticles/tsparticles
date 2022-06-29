import type { IOptionsColor } from "../../IOptionsColor";

/**
 * @category Options
 */
export interface IMoveTrail {
    enable: boolean;
    fillColor: string | IOptionsColor;
    length: number;
}
