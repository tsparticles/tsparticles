import type { IColor } from "../../../../Core/Interfaces/IColor";

/**
 * @category Options
 */
export interface ITrail {
    fillColor: string | IColor;
    enable: boolean;
    length: number;
}
