import type { Options } from "@tsparticles/engine";
import type { SlowMode } from "../../Types.js";

export type SlowOptions = Options & {
    interactivity: {
        modes: SlowMode;
    };
};
