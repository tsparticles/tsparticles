/**
 * Absorber split options, used for splitting an absorber when it reaches its size limits
 */
export interface IAbsorberSplit {
  /**
   * Enables absorber splitting, when disabled the absorber grows until its limits and then stops
   */
  enable: boolean;

  /**
   * Number of particles generated at the absorber position when it splits, `0` disables the particles
   * generation, the absorber is still replaced. Values are truncated and clamped between
   * `0` and the maximum supported quantity
   */
  quantity: number;
}
