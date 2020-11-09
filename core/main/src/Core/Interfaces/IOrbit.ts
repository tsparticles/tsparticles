import { IOrbitRotation } from "../../Options/Interfaces/Particles/Orbit/IOrbitRotation";
import { IOrbitAnimation } from "../../Options/Interfaces/Particles/Orbit/IOrbitAnimation";
import type { IHsl } from "./Colors";

/**
 * @category Interfaces
 */
export interface IOrbit {
    animation: IOrbitAnimation;
    enable: boolean;
    opacity: number;
    width: number;
    color?: IHsl;
    radius?: number;
    rotation: IOrbitRotation;
}
