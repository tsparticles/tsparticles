import type { Container, IRgb } from "tsparticles-engine";
import type { Grab } from "./Options/Classes/Grab";
import type { GrabOptions } from "./Options/Classes/GrabOptions";
import type { IGrab } from "./Options/Interfaces/IGrab";

export type IGrabMode = {
    grab: IGrab;
};

export type GrabMode = {
    grab?: Grab;
};

export type GrabContainer = Container & {
    actualOptions: GrabOptions;
    particles: {
        grabLineColor?: IRgb | string;
    };
    retina: {
        grabModeDistance?: number;
    };
};
