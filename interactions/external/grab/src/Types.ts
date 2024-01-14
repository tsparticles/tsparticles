import type { Container, IRgb, OptionsColor, Particle } from "@tsparticles/engine";
import type { Grab } from "./Options/Classes/Grab.js";
import type { GrabOptions } from "./Options/Classes/GrabOptions.js";
import type { IGrab } from "./Options/Interfaces/IGrab.js";

export interface IGrabMode {
    grab: IGrab;
}

export interface GrabMode {
    grab?: Grab;
}

export type GrabContainer = Container & {
    actualOptions: GrabOptions;
    particles: {
        grabLineColor?: IRgb | string;
    };
    retina: {
        grabModeDistance?: number;
    };
};

export type LinkParticle = Particle & {
    options: {
        links?: {
            color?: OptionsColor;
        };
    };
    retina: {
        linksWidth?: number;
    };
};
