import type { ConnectMode } from "../../Types";
import type { Options } from "tsparticles-engine";

export type ConnectOptions = Options & {
    interactivity: {
        modes: ConnectMode;
    };
};
