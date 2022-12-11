import type { GrabMode } from "../../Types";
import type { Options } from "tsparticles-engine";

export type GrabOptions = Options & {
    interactivity: {
        modes: GrabMode;
    };
};
