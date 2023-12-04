import type { AttractMode } from "../../Types.js";
import type { Options } from "@tsparticles/engine";

export type AttractOptions = Options & {
    interactivity: {
        modes: AttractMode;
    };
};
