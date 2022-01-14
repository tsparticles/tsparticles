import type { IColor } from "../../../Core/Interfaces/Colors";
import type { ICoordinates } from "../../../Core/Interfaces/ICoordinates";

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
