import type { ITrail } from "./Options/Interfaces/ITrail.js";
import type { InteractivityContainer } from "@tsparticles/plugin-interactivity";
import type { Trail } from "./Options/Classes/Trail.js";
import type { TrailOptions } from "./Options/Classes/TrailOptions.js";

export interface ITrailMode {
  trail: ITrail;
}

export interface TrailMode {
  trail?: Trail;
}

export type TrailContainer = InteractivityContainer & {
  actualOptions: TrailOptions;
};
