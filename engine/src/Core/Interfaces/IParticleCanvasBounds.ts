import type { IDimension } from "./IDimension.js";
import type { OutMode } from "../../Enums/Modes/OutMode.js";
import type { OutModeDirection } from "../../Enums/Directions/OutModeDirection.js";
import type { Particle } from "../Particle.js";

/** Canvas bounds callback payload for particle-owned bounds checks */
export interface IParticleCanvasBoundsData<TParticle extends Particle = Particle> {
  /** Canvas size */
  canvasSize: IDimension;
  /** Optional out mode direction-specific check */
  direction?: OutModeDirection;
  /** Optional out mode type for strategy-specific checks */
  outMode?: OutMode | keyof typeof OutMode;
  /** Particle instance */
  particle: TParticle;
  /** Particle radius */
  radius: number;
}

/** Canvas bounds callback result */
export interface IParticleCanvasBoundsResult {
  /** Whether the particle is considered inside canvas bounds */
  inside: boolean;
  /** Optional margin used by the drawer calculation */
  margin?: number;
  /** Optional source hint for debugging */
  reason?: "combined" | "default" | "effect" | "shape";
}
