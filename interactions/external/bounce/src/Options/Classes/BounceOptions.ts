import type { BounceMode } from "../../Types.js";
import type { Options } from "@tsparticles/engine";

export type BounceOptions = Options & {
    interactivity: {
        modes: BounceMode;
    };
};
