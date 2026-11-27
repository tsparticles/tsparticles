import type { InteractivityContainer, InteractivityParticle } from "../types.js";
import type { IDelta } from "@tsparticles/engine";
import type { IExternalInteractor } from "../Interfaces/IExternalInteractor.js";
import type { IInteractivityData } from "../Interfaces/IInteractivityData.js";
import { InteractorType } from "../Enums/InteractorType.js";

/**
 * External Interactivity manager, base abstract class
 */
export abstract class ExternalInteractorBase<
  TContainer extends InteractivityContainer = InteractivityContainer,
  TParticle extends InteractivityParticle = InteractivityParticle,
> implements IExternalInteractor<TParticle> {
  /**
   * External Interactivity type
   */
  type: InteractorType = InteractorType.external;

  protected readonly container: TContainer;

  abstract maxDistance: number;

  /**
   * Constructor of external interactivity manager
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
  clear(_particle?: TParticle, _delta?: IDelta): void {
    // Stateless interactors have nothing to clear.
  }

  /**
   * Before interaction reset
   * @param interactivityData - the interactivity data of the event, contains the position of the event, etc
   * @param particle - the particle to reset
   */
  reset(_interactivityData?: IInteractivityData, _particle?: TParticle): void {
    // Stateless interactors have nothing to reset.
  }

  /**
   * Initializes the interactivity manager
   */
  abstract init(): void;

  /**
   * Interaction handler
   * @param interactivityData - the interactivity data of the event, contains the position of the event, etc
   * @param delta - this variable contains the delta between the current frame and the previous frame
   */
  abstract interact(interactivityData: IInteractivityData, delta: IDelta): void;

  /**
   * Interaction enabled check
   * @param interactivityData - the interactivity data of the event, contains the position of the event, etc
   * @param particle - the particle to check, if null, checks the container
   * @returns true or false, checking if the options enable this interaction manager
   */
  abstract isEnabled(interactivityData: IInteractivityData, particle?: TParticle): boolean;
}
