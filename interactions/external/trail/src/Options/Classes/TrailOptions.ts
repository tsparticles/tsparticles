import type { Options } from "@tsparticles/engine";
import type { TrailMode } from "../../Types.js";

export type TrailOptions = Options & {
    interactivity: {
        modes: TrailMode;
    };
};
