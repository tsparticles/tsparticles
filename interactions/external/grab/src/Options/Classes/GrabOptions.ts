import type { GrabMode } from "../../Types.js";
import type { Options } from "@tsparticles/engine";

export type GrabOptions = Options & {
    interactivity: {
        modes: GrabMode;
    };
};
