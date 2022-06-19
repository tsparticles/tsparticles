import type { ICoordinates } from "../../../Core/Interfaces/ICoordinates";
import type { IOptionsColor } from "../IOptionsColor";

/**
 * @category Options
 * [[include:Shadow.md]]
 */
export interface IShadow {
    blur: number;
    color: string | IOptionsColor;
    enable: boolean;
    offset: ICoordinates;
}
