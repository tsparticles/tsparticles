/** Cannon mode options */
export interface ICannon {
  /**
   * Whether to render the dashed aim line and power circle while dragging.
   */
  drawVector: boolean;

  /**
   * Maximum drag distance in canvas pixels.
   * The drag vector is clamped to this length for both visual feedback and force calculation.
   */
  maxDragDistance: number;

  /**
   * Maximum number of particles spawned per shot.
   */
  maxParticles: number;

  /**
   * Minimum number of particles spawned per shot, regardless of drag length.
   */
  minParticles: number;

  /**
   * How many particles to spawn per pixel of drag.
   * The final count is clamped between minParticles and maxParticles.
   */
  particleFactor: number;

  /**
   * Half-angle spread around the launch direction, in degrees.
   * A value of 30 means particles can spread ±30° from the aim angle.
   */
  spread: number;

  /**
   * CSS color string for the aim line and power circle.
   */
  vectorColor: string;

  /**
   * Multiplier applied to the drag length (in canvas pixels) to produce
   * the base particle speed. Larger values = faster particles.
   */
  velocityFactor: number;
}
