import type { IMoveTrailFill } from "./IMoveTrailFill";
import type { IOptionsColor } from "../../IOptionsColor";

/**
 * @category Options
 */
export interface IMoveTrail {
    enable: boolean;

    fill: IMoveTrailFill;

    /**
     * @deprecated use the new fill property instead
     */
    fillColor?: string | IOptionsColor;

    length: number;
}
