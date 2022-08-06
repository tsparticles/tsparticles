import type { Container } from "tsparticles-engine";
import type { ITrail } from "./Options/Interfaces/ITrail";
import type { Trail } from "./Options/Classes/Trail";
import type { TrailOptions } from "./Options/Classes/TrailOptions";

export type ITrailInteractivity = {
    modes: {
        trail: ITrail;
    };
};

export type TrailInteractivity = {
    modes: {
        trail?: Trail;
    };
};

export type TrailContainer = Container & {
    actualOptions: TrailOptions;
};
