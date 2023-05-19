import { type IParticlesOptions, type Particle, type ParticlesOptions } from "tsparticles-engine";
import type { IRoll } from "./Options/Interfaces/IRoll";
import type { Roll } from "./Options/Classes/Roll";

export type RollParticle = Particle & {
    options: RollParticlesOptions;
};

export type RollParticlesOptions = ParticlesOptions & {
    roll?: Roll;
};

export type IRollParticlesOptions = IParticlesOptions & {
    roll?: IRoll;
};
