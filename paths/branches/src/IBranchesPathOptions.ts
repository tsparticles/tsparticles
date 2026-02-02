export interface IBranchesPathOptions {
  /**
   * Probability [0..1] of a sharp branch
   */
  branchChance?: number;

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
