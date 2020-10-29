import type { IHsl } from "./Colors";

/**
 * @category Interfaces
 */
export interface IOrbit {
    enable: boolean;
    opacity: number;
    width: number;
    color: IHsl | undefined;
    radius: number | undefined;
    rotation: number;
}
