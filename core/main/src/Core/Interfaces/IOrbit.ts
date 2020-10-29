import type { IHsl } from "./Colors";

/**
 * @category Interfaces
 */
export interface IOrbit {
    enable: boolean;
    opacity: number;
    width: number;
    color?: IHsl;
    radius?: number;
    rotation: number;
}
