import type { ITrail } from "./Options/Interfaces/ITrail.js";
import type { InteractivityContainer } from "@tsparticles/plugin-interactivity";
import type { Trail } from "./Options/Classes/Trail.js";
import type { TrailOptions } from "./Options/Classes/TrailOptions.js";

/** Trail mode interface */
export interface ITrailMode {
  trail: ITrail;
}

/** Trail mode options interface */
export interface TrailMode {
  trail?: Trail;
}

/** Trail container type */
export type TrailContainer = InteractivityContainer & {
  actualOptions: TrailOptions;
};
