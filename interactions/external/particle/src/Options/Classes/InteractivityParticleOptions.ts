import type { Options } from "@tsparticles/engine";
import type { ParticleMode } from "../../Types.js";

export type InteractivityParticleOptions = Options & {
    interactivity: {
        modes: ParticleMode;
    };
};
