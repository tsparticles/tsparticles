import type { IParticleValueAnimation } from "./IParticleValueAnimation";

export interface IParticleHslAnimation {
    h: IParticleValueAnimation<number>;
    l: IParticleValueAnimation<number>;
    s: IParticleValueAnimation<number>;
}
