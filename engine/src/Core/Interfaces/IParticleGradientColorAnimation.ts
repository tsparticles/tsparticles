import type { IParticleHslAnimation } from "./IParticleHslAnimation";
import type { IParticleNumericValueAnimation } from "./IParticleValueAnimation";

export interface IParticleGradientColorAnimation {
    stop: number;
    value: IParticleHslAnimation;
    opacity?: IParticleNumericValueAnimation;
}
