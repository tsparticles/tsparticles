import type { IParticlesOptions, Particle, ParticlesOptions } from "@tsparticles/engine";
import type { ILife } from "./Options/Interfaces/ILife";
import type { Life } from "./Options/Classes/Life";

export interface IParticleLife {
    count: number;
    delay: number;
    delayTime: number;
    duration: number;
    time: number;
}

export type ILifeParticlesOptions = IParticlesOptions & {
    life?: ILife;
};

export type LifeParticlesOptions = ParticlesOptions & {
    life?: Life;
};

export type LifeParticle = Particle & {
    life?: IParticleLife;
    options: LifeParticlesOptions;
};
