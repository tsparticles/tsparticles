import type { IParticleValueAnimation } from "./IParticleValueAnimation.js";

export interface IParticleHslAnimation {
    h: IParticleValueAnimation<number>;
    l: IParticleValueAnimation<number>;
    s: IParticleValueAnimation<number>;
}
