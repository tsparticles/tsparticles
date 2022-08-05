import type { Options, ParticlesOptions } from "tsparticles-engine";
import type { LightInteractivity } from "../../Types";

export type LightOptions = Options & {
    interactivity?: LightInteractivity;
};

export type LightParticlesOptions = ParticlesOptions & {
    interactivity?: LightInteractivity;
};
