import type { IParticleValueAnimation, IParticlesOptions, Particle, ParticlesOptions } from "tsparticles-engine";
import type { ITilt } from "./Options/Interfaces/ITilt";
import type { Tilt } from "./Options/Classes/Tilt";

export interface IParticleTiltValueAnimation extends IParticleValueAnimation<number> {
    cosDirection: number;
    sinDirection: number;
}

export type TiltParticle = Particle & {
    options: TiltParticlesOptions;
    tilt?: IParticleTiltValueAnimation;
};

export type ITiltParticlesOptions = IParticlesOptions & {
    tilt?: ITilt;
};

export type TiltParticlesOptions = ParticlesOptions & {
    tilt?: Tilt;
};
