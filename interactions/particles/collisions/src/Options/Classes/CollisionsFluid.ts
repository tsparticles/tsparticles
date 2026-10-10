import {
  type IOptionLoader,
  type RangeValue,
  type RecursivePartial,
  isNull,
  loadProperty,
  loadRangeProperty,
} from "@tsparticles/engine";
import type { ICollisionsFluid } from "../Interfaces/ICollisionsFluid.js";

/**
 * The collisions fluid options, used by the `fluid` collision mode
 */
export class CollisionsFluid implements ICollisionsFluid, IOptionLoader<ICollisionsFluid> {
  /** The maximum pressure force applied to a single neighbor pair */
  maxForce: RangeValue = 2.5;
  /** The maximum number of neighbors used by the density calculation */
  maxNeighbors = 64;
  /** The near pressure stiffness */
  nearStiffness: RangeValue = 0.5;
  /** The fluid interaction radius, in pixels */
  radius: RangeValue = 30;
  /** The rest density used by the pressure calculation */
  restDensity: RangeValue = 3;
  /** The pressure stiffness */
  stiffness: RangeValue = 0.5;

  load(data?: RecursivePartial<ICollisionsFluid>): void {
    if (isNull(data)) {
      return;
    }

    loadRangeProperty(this, "maxForce", data.maxForce);
    loadProperty(this, "maxNeighbors", data.maxNeighbors);
    loadRangeProperty(this, "nearStiffness", data.nearStiffness);
    loadRangeProperty(this, "radius", data.radius);
    loadRangeProperty(this, "restDensity", data.restDensity);
    loadRangeProperty(this, "stiffness", data.stiffness);
  }
}
