import type { Container } from "../Container.js";
import type { IDelta } from "./IDelta.js";
import type { IParticleColorStyle } from "./IParticleColorStyle.js";
import type { IParticleTransformValues } from "./IParticleTransformValues.js";
import type { Particle } from "../Particle.js";

export interface IDrawParticleParams {
  /**
   * The color styles value
   */
  colorStyles: IParticleColorStyle;
  /**
   * The container of the particle
   */
  container: Container;
  /**
   * The canvas context to draw on
   */
  context: CanvasRenderingContext2D;
  /**
   * This variable contains the delta between the current frame and the previous frame
   */
  delta: IDelta;
  /**
   * The opacity of the particle
   */
  opacity: number;
  /**
   * The particle to draw
   */
  particle: Particle;
  /**
   * The radius of the particle
   */
  radius: number;
  /**
   * The particle transform values
   */
  transform: Partial<IParticleTransformValues>;
}
