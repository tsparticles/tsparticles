import type { IHsl } from "../../../Core/Interfaces/Colors";

/**
 * @category Options
 */
export interface IOrbit {
    /**
     * Enables/disables the animation
     */
    enable: boolean;
    opacity: number;
    width: number;
    color?: IHsl;
    radius?: number;
    rotation: number;
}
