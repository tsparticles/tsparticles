import type { IHsl } from "./Colors";

/**
 * @category Interfaces
 */
export interface IBubbleParticleData {
    inRange: boolean;
    opacity?: number;
    radius?: number;
    color?: IHsl;
    div?: HTMLElement;
}
