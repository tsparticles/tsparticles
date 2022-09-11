import type { Options } from "tsparticles-engine";
import type { SlowMode } from "../../Types";

export type SlowOptions = Options & {
    interactivity: {
        modes: SlowMode;
    };
};
