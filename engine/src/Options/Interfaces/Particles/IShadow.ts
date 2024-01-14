import type { ICoordinates } from "../../../Core/Interfaces/ICoordinates.js";
import type { IOptionsColor } from "../IOptionsColor.js";

/**
 * [[include:Shadow.md]]
 */
export interface IShadow {
    /**
     * The blur of the shadow.
     */
    blur: number;

    /**
     * The color of the shadow.
     */
    color: string | IOptionsColor;

    /**
     * Sets if the shadow is enabled.
     */
    enable: boolean;

    /**
     * The distance of the shadow from the particle.
     */
    offset: ICoordinates;
}
