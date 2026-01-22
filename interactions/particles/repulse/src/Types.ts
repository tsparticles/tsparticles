import type { IInteractivityParticlesOptions, InteractivityParticlesOptions } from "@tsparticles/plugin-interactivity";
import type { IParticlesRepulse } from "./Options/Interfaces/IParticlesRepulse.js";
import type { ParticlesRepulse } from "./Options/Classes/ParticlesRepulse.js";

export type RepulseParticlesOptions = InteractivityParticlesOptions & {
  repulse?: ParticlesRepulse;
};

export type IRepulseParticlesOptions = IInteractivityParticlesOptions & {
  repulse?: IParticlesRepulse;
};
