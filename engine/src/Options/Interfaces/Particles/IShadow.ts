import type { ICoordinates } from "../../../Core/Interfaces/ICoordinates.js";
import type { IOptionsColor } from "../IOptionsColor.js";

/**
 * [[include:Shadow.md]]
 */
export interface IShadow {
    blur: number;
    color: string | IOptionsColor;
    enable: boolean;
    offset: ICoordinates;
}
