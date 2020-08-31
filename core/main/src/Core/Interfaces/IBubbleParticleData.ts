import type { IHsl } from "./IHsl";

/**
 * @category Interfaces
 */
export interface IBubbleParticleData {
    inRange: boolean;
    opacity?: number;
    radius?: number;
    color?: IHsl;
    divId?: string;
}
