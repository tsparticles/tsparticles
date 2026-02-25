export interface IBranchesInertiaOptions {
  /**
   * Enable smooth inertia-based movement
   */
  enable?: boolean;

  /**
   * How fast velocity approaches target (0..1)
   */
  factor?: number;
}

export interface IBranchesPathOptions {
  /**
   * Probability [0..1] of a sharp branch
   */
  branchChance?: number;

  /**
   * Inertia configuration
   */
  inertia?: IBranchesInertiaOptions;

  /**
   * Max angle deviation in radians
   */
  maxAngle?: number;

  /**
   * Length of each segment in pixels
   */
  segmentLength: number;

  /**
   * Random speed multiplier
   */
  speedVariation?: number;
}
