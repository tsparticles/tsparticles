import type { Container } from "../Container.js";
import type { IShapeDrawData } from "./IShapeDrawData.js";
import type { Particle } from "../Particle.js";

export interface IEffectDrawer<TParticle extends Particle = Particle> {
  /**
   * Shape destroy function
   * @param container - the container initializing the shape
   */
  destroy?: (container: Container) => void;

  /**
   * Shape draw after function
   * @param data - the data used for drawing
   */
  drawAfter?: (data: IShapeDrawData<TParticle>) => void;

  /**
   * Shape draw before function
   * @param data - the data used for drawing
   */
  drawBefore?: (data: IShapeDrawData<TParticle>) => void;

  /**
   * Shape init function
   * @param container - the container initializing the shape
   */
  init?: (container: Container) => Promise<void>;

  /**
   * Effect load function
   * @param particle - the particle using the shape
   */
  loadEffect?: (particle: TParticle) => void;

  /**
   * Shape particle init function
   * @param container - the container containing the shape
   * @param particle - the particle using the shape
   */
  particleInit?: (container: Container, particle: TParticle) => void;
}
