/**
 * [[include:Options/Plugins/Poisson.md]]
 */
export interface IPoisson {
  /** The poisson dimensions */
  dimensions: number;
  /** Enables the poisson disc sampling */
  enable: boolean;
  /** The poisson radius */
  radius: number;
  /** The poisson retries */
  retries: number;
  /** The poisson steps */
  steps: number;
}
