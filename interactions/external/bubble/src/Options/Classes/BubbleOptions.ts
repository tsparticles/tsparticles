import type { BubbleMode } from "../../Types";
import type { Options } from "tsparticles-engine";

export type BubbleOptions = Options & {
    interactivity: {
        modes: BubbleMode;
    };
};
