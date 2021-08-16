import { IParticleHslAnimation } from "./IParticleHslAnimation";

export interface IParticleGradientColorAnimation {
    stop: number;
    value: IParticleHslAnimation;
    opacity?: number;
}
