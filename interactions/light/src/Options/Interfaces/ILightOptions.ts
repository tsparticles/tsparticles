import type { IOptions, IParticlesOptions } from "tsparticles-engine";
import type { LightInteractivity } from "../../Types";

export type ILightOptions = IOptions & {
    interactivity?: LightInteractivity;
};

export type ILightParticlesOptions = IParticlesOptions & {
    interactivity?: LightInteractivity;
};
