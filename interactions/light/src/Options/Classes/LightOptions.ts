import type { Options, ParticlesOptions } from "tsparticles-engine";
import type { LightMode } from "../../Types";

export type LightOptions = Options & {
    interactivity: {
        modes: LightMode;
    };
};

export type LightParticlesOptions = ParticlesOptions & {
    interactivity: {
        modes: LightMode;
    };
};
