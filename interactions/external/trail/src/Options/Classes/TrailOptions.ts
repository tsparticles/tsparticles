import type { Options } from "tsparticles-engine";
import type { TrailMode } from "../../Types";

export type TrailOptions = Options & {
    interactivity: {
        modes: TrailMode;
    };
};
