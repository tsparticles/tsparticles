import type { IParticleColorAnimation } from "./IParticleValueAnimation.js";

export interface IParticleHslAnimation {
    h: IParticleColorAnimation;
    l: IParticleColorAnimation;
    s: IParticleColorAnimation;
}
