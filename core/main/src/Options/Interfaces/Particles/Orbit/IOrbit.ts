import type { IHsl } from "../../../../Core/Interfaces/Colors";
import type { IOrbitAnimation } from "./IOrbitAnimation";
import type { IOrbitRotation } from "./IOrbitRotation";

/**
 * @category Options
 */
export interface IOrbit {
    /**
     * Enables/disables the animation
     */
    enable: boolean;
    animation: IOrbitAnimation;
    opacity: number;
    width: number;
    color?: IHsl;
    radius?: number;
    rotation: IOrbitRotation;
}
