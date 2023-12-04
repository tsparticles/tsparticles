import type { IParticlesOptions, ParticlesOptions } from "@tsparticles/engine";
import type { IParticlesRepulse } from "./Options/Interfaces/IParticlesRepulse.js";
import type { ParticlesRepulse } from "./Options/Classes/ParticlesRepulse.js";

export type RepulseParticlesOptions = ParticlesOptions & {
    repulse?: ParticlesRepulse;
};

export type IRepulseParticlesOptions = IParticlesOptions & {
    repulse?: IParticlesRepulse;
};
