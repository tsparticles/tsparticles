/**
 * [[include:Options/Particles.md]]
 */
import type { IAnimatableColor } from "../IAnimatableColor.js";
import type { IEffect } from "./Effect/IEffect.js";
import type { IMove } from "./Move/IMove.js";
import type { IOpacity } from "./Opacity/IOpacity.js";
import type { IParticlesBounce } from "./Bounce/IParticlesBounce.js";
import type { IParticlesNumber } from "./Number/IParticlesNumber.js";
import type { IShape } from "./Shape/IShape.js";
import type { ISize } from "./Size/ISize.js";
import type { IStroke } from "./IStroke.js";
import type { IZIndex } from "./ZIndex/IZIndex.js";
import type { ParticlesGroups } from "../../../Types/ParticlesGroups.js";
import type { SingleOrMultiple } from "../../../Types/SingleOrMultiple.js";

/**
 * [[include:Options/Particles.md]]
 */
export interface IParticlesOptions {
  [name: string]: unknown;

  /**
   * Options for customizing the behavior when a particle bounces
   */
  bounce: IParticlesBounce;

  /**
   * Particles color options
   */
  color: IAnimatableColor;

  /**
   * Particles effects options
   */
  effect: IEffect;

  /**
   * Particles groups
   */
  groups: ParticlesGroups;

  /**
   * Particles movement options
   */
  move: IMove;

  /**
   * Particles number options
   */
  number: IParticlesNumber;

  /**
   * Particles opacity options
   */
  opacity: IOpacity;

  /**
   * Particles options for reducing the randomization of duplicate particles, the index will be used for choosing the array values
   */
  reduceDuplicates: boolean;

  /**
   * Particles shape options
   */
  shape: IShape;

  /**
   * Particles size options
   */
  size: ISize;

  /**
   * Particles stroke options
   */
  stroke: SingleOrMultiple<IStroke>;

  /**
   * Particles z-index options
   */
  zIndex: IZIndex;
}
