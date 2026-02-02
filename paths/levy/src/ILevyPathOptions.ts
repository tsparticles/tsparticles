export interface ILevyPathOptions {
  /**
   * Stability parameter (0 \< alpha \<= 2)
   */
  alpha?: number;

  /**
   * Clamp max jump length
   */
  maxStep?: number;

  /**
   * Base speed multiplier
   */
  scale?: number;
}
