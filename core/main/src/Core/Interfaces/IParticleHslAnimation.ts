import { IParticleValueAnimation } from "./IParticleValueAnimation";

export interface IParticleHslAnimation {
    h: IParticleValueAnimation<number>;
    s: IParticleValueAnimation<number>;
    l: IParticleValueAnimation<number>;
}
