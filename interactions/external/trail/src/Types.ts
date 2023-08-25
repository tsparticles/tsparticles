import type { Container } from "@tsparticles/engine";
import type { ITrail } from "./Options/Interfaces/ITrail.js";
import type { Trail } from "./Options/Classes/Trail.js";
import type { TrailOptions } from "./Options/Classes/TrailOptions.js";

export type ITrailMode = {
    trail: ITrail;
};

export type TrailMode = {
    trail?: Trail;
};

export type TrailContainer = Container & {
    actualOptions: TrailOptions;
};
