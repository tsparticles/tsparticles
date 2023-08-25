import type { ConnectMode } from "../../Types.js";
import type { Options } from "@tsparticles/engine";

export type ConnectOptions = Options & {
    interactivity: {
        modes: ConnectMode;
    };
};
