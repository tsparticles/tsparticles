import type { IParticlesOptions } from "../../Options/Interfaces/Particles/IParticlesOptions.js";
import type { RecursivePartial } from "../../Types/RecursivePartial.js";

/** Shape values interface for custom particle shapes */
export interface IShapeValues {
  [key: string]: unknown;

  /** Whether the shape path should be closed */
  close?: boolean;
  /** Particles options for shape-specific particles */
  particles?: RecursivePartial<IParticlesOptions>;
}
