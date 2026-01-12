import type { Options } from "@tsparticles/engine";
import type { ParallaxMode } from "../../Types.js";

export type ParallaxOptions = Options & {
    interactivity: {
        modes: ParallaxMode;
    };
};
