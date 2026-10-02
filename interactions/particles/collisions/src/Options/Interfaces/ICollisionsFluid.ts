import type { RangeValue } from "@tsparticles/engine";

/**
 * Collisions fluid options, used by the `fluid` collision mode
 */
export interface ICollisionsFluid {
  /** The maximum pressure force applied to a single neighbor pair */
  maxForce: RangeValue;
  /** The maximum number of neighbors used by the density calculation */
  maxNeighbors: number;
  /** The near pressure stiffness */
  nearStiffness: RangeValue;
  /** The fluid interaction radius, in pixels */
  radius: RangeValue;
  /** The rest density used by the pressure calculation */
  restDensity: RangeValue;
  /** The pressure stiffness */
  stiffness: RangeValue;
}
