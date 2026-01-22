import type { Container, IOptions, Options } from "@tsparticles/engine";
import type { ITrail } from "./Options/Interfaces/ITrail.js";
import type { Trail } from "./Options/Classes/Trail.js";

export type ITrailOptions = IOptions & {
  trail?: ITrail;
};

export type TrailOptions = Options & {
  trail?: Trail;
};

export type TrailContainer = Container & {
  actualOptions: TrailOptions;
};
