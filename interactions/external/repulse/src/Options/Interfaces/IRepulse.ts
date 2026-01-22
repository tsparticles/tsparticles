import type { IRepulseBase } from "./IRepulseBase.js";
import type { IRepulseDiv } from "./IRepulseDiv.js";
import type { SingleOrMultiple } from "@tsparticles/engine";

/**
 */
export interface IRepulse extends IRepulseBase {
  divs?: SingleOrMultiple<IRepulseDiv>;
}
