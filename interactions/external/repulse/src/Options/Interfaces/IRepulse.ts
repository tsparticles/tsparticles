import type { IRepulseBase } from "./IRepulseBase.js";
import type { IRepulseDiv } from "./IRepulseDiv.js";
import type { SingleOrMultiple } from "@tsparticles/engine";

/** Repulse mode options */
export interface IRepulse extends IRepulseBase {
  /** Repulse divs to apply the mode to */
  divs?: SingleOrMultiple<IRepulseDiv>;
}
