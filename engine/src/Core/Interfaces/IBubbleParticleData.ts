import type { IHsl } from "./Colors";

/**
 
 */
export interface IBubbleParticleData {
    color?: IHsl;
    div?: HTMLElement;
    finalColor?: IHsl;
    inRange: boolean;
    opacity?: number;
    radius?: number;
}
