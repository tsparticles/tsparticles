import type { IColor, ICoordinates } from "../../../Core";

/**
 * @category Options
 * [[include:Shadow.md]]
 */
export interface IShadow {
    blur: number;
    color: string | IColor;
    enable: boolean;
    offset: ICoordinates;
}
