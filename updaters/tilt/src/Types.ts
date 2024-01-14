import type {
    IParticleNumericValueAnimation,
    IParticlesOptions,
    Particle,
    ParticlesOptions,
} from "@tsparticles/engine";
import type { ITilt } from "./Options/Interfaces/ITilt.js";
import type { Tilt } from "./Options/Classes/Tilt.js";

export interface IParticleTiltValueAnimation extends IParticleNumericValueAnimation {
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
