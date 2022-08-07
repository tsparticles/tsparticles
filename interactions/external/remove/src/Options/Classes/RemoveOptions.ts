import type { Options } from "tsparticles-engine";
import type { RemoveMode } from "../../Types";

export type RemoveOptions = Options & {
    interactivity: {
        modes: RemoveMode;
    };
};
