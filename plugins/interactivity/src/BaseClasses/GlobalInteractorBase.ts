import { type Container, type IDelta } from "@tsparticles/engine";
import type { IGlobalInteractor } from "../Interfaces/IGlobalInteractor.js";
import type { IInteractivityData } from "../Interfaces/IInteractivityData.js";
import { InteractorType } from "../Enums/InteractorType.js";

export abstract class GlobalInteractorBase<TContainer = Container> implements IGlobalInteractor {
  type = InteractorType.global;

  protected readonly container: TContainer;

  /**
   * Constructor of external interactivity manager
   * @param container - the parent container
   * @internal
   */
  protected constructor(container: TContainer) {
    this.container = container;
  }

  abstract init(): void;

  abstract interact(interactivityData: IInteractivityData, delta: IDelta): void;

  abstract isEnabled(interactivityData: IInteractivityData): boolean;
}
