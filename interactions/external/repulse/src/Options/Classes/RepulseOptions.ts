import type { Options } from "tsparticles-engine";
import type { RepulseMode } from "../../Types";

export type RepulseOptions = Options & {
    interactivity: {
        modes: RepulseMode;
    };
};
