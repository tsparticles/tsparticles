import type { IParticlesOptions, ParticlesOptions } from "tsparticles-engine";
import type { IParticlesRepulse } from "./Options/Interfaces/IParticlesRepulse";
import type { ParticlesRepulse } from "./Options/Classes/ParticlesRepulse";

export type RepulseParticlesOptions = ParticlesOptions & {
    repulse?: ParticlesRepulse;
};

export type IRepulseParticlesOptions = IParticlesOptions & {
    repulse?: IParticlesRepulse;
};
