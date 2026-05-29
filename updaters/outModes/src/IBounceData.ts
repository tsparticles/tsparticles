import type { IBounds, ICoordinates, IDimension, OutMode, OutModeDirection, Particle } from "@tsparticles/engine";

/** Bounce data interface for out mode handling */
export interface IBounceData {
  /** Particle bounds */
  bounds: IBounds;
  /** Canvas dimensions */
  canvasSize: IDimension;
  /** Out mode direction */
  direction: OutModeDirection;
  /** Position offset */
  offset: ICoordinates;
  /** Out mode type */
  outMode: OutMode | keyof typeof OutMode;
  /** True when particle-owned bounds report outside for this direction */
  outOfCanvas: boolean;
  /** The particle */
  particle: Particle;
  /** Particle size */
  size: number;
}
