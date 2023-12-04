import type { Options } from "@tsparticles/engine";
import type { RepulseMode } from "../../Types.js";

export type RepulseOptions = Options & {
    interactivity: {
        modes: RepulseMode;
    };
};
