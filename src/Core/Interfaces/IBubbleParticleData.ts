import type { IHsl } from "./IHsl";

export interface IBubbleParticleData {
    inRange: boolean;
    opacity?: number;
    radius?: number;
    color?: IHsl;
    divId?: string;
}
