export interface IBrownianPathOptions {
  /**
   * Max angle delta per step (radians)
   */
  angleDelta?: number;

  /**
   * Damping factor [0..1]
   */
  damping?: number;
}
