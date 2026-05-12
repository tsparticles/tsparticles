/** Out mode values for particles leaving the canvas */
export enum OutMode {
  /** Bounce the particle back into the canvas */
  bounce = "bounce",
  /** No action, particle stays outside */
  none = "none",
  /** Let the particle move out of the canvas */
  out = "out",
  /** Destroy the particle when it leaves */
  destroy = "destroy",
  /** Split the particle into multiple particles */
  split = "split",
}
