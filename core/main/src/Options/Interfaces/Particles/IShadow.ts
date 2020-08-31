import type { ICoordinates } from "../../../Core/Interfaces/ICoordinates";
import type { IColor } from "../../../Core/Interfaces/IColor";

/**
 * @category Options
 */
export interface IShadow {
    blur: number;
    color: string | IColor;
    enable: boolean;
    offset: ICoordinates;
}
