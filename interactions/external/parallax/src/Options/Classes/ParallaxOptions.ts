import type { InteractivityOptions } from "@tsparticles/plugin-interactivity";
import type { ParallaxMode } from "../../Types.js";

export type ParallaxOptions = InteractivityOptions & {
    interactivity?: {
        modes: ParallaxMode;
    };
};
