import type { ICoordinates } from "./ICoordinates.js";
import type { IDelta } from "./IDelta.js";
import type { Particle } from "../Particle.js";

export interface IShapeDrawData<TParticle extends Particle = Particle> {
  /**
   * the canvas context for drawing
   */
  context: CanvasRenderingContext2D;

  /**
   * this variable contains the delta between the current frame and the previous frame
   */
  delta: IDelta;

  /**
   * the position used for drawing (already scaled)
   */
  drawPosition: ICoordinates;

  /**
   * the particle radius used for drawing (already scaled)
   */
  drawRadius: number;

  /**
   * the scale applied for drawing
   */
  drawScale: number;

  /**
   * the particle fill status
   */
  fill: boolean;

  /**
   * the particle opacity
   */
  opacity: number;

  /**
   * the particle to be drawn using the shape
   */
  particle: TParticle;

  /**
   * the device pixel ratio, used for retina displays
   */
  pixelRatio: number;

  /**
   * the original position of the particle (before zoom transformations)
   */
  position: {
    /**
     * x coordinate
     */
    x: number;

    /**
     * y coordinate
     */
    y: number;
  };

  /**
   * the particle radius
   */
  radius: number;

  /**
   * the particle stroke status
   */
  stroke: boolean;

  /**
   * the transform data of the particle
   */
  transformData: {
    /**
     * the horizontal scale of the particle
     */
    a: number;

    /**
     * the horizontal skew of the particle
     */
    b: number;

    /**
     * the vertical skew of the particle
     */
    c: number;

    /**
     * the vertical scale of the particle
     */
    d: number;
  };
}
