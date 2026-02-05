import type { InteractivityContainer, InteractivityParticle } from "../types.js";
import { type IDelta } from "@tsparticles/engine";
import type { IInteractivityData } from "../Interfaces/IInteractivityData.js";
import type { IParticlesInteractor } from "../Interfaces/IParticlesInteractor.js";
import { InteractorType } from "../Enums/InteractorType.js";

/**
 * Particles interactions manager, base abstract class
 */
export abstract class ParticlesInteractorBase<
  TContainer extends InteractivityContainer = InteractivityContainer,
  TParticle extends InteractivityParticle = InteractivityParticle,
> implements IParticlesInteractor<TParticle> {
  /**
   * Particles interactions type
   */
  type: InteractorType = InteractorType.particles;

  protected readonly container: TContainer;

  /**
   * The particles interactions manager constructor
   * @param container - the parent container
   * @internal
   */
  protected constructor(container: TContainer) {
    this.container = container;
  }

  /**
   * Before interaction clear
   * @param particle - the particle to clear
   * @param delta - this variable contains the delta between the current frame and the previous frame
   */
  abstract clear(particle: TParticle, delta: IDelta): void;

  /**
   * Initializes the interactivity manager
   */
  abstract init(): void;

  /**
   * Interaction handler
   * @param particle - the particle responsible for interactions
   * @param interactivityData - the interactivity data of the event, contains the position of the event, etc
   * @param delta - this variable contains the delta between the current frame and the previous frame
   */
  abstract interact(particle: TParticle, interactivityData: IInteractivityData, delta: IDelta): void;

  /**
   * Interaction enable check
   * @param particle - the particle responsible for interactions
   * @param interactivityData - the interactivity data of the event, contains the position of the event, etc
   * @returns true or false, checking if the options enable this interaction manager
   */
  abstract isEnabled(particle: TParticle, interactivityData: IInteractivityData): boolean;

  /**
   * Before interaction reset
   * @param interactivityData - the interactivity data of the event, contains the position of the event, etc
   * @param particle - the particle to be reset
   */
  abstract reset(interactivityData: IInteractivityData, particle: TParticle): void;
}
