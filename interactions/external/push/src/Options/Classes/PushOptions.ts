import type { Options } from "tsparticles-engine";
import type { PushMode } from "../../Types";

export type PushOptions = Options & {
    interactivity: {
        modes: PushMode;
    };
};
