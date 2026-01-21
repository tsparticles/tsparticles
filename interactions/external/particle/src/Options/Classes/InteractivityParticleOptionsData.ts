import type { Options } from "@tsparticles/engine";
import type { ParticleMode } from "../../Types.js";

export type InteractivityParticleOptionsData = Options & {
    interactivity?: {
        modes: ParticleMode;
    };
};
