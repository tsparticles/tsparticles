import type { BounceMode } from "../../Types.js";
import type { InteractivityOptions } from "@tsparticles/plugin-interactivity";

export type BounceOptions = InteractivityOptions & {
    interactivity?: {
        modes: BounceMode;
    };
};
