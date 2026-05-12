import {
  ExternalInteractorBase,
  type IInteractivityData,
  type InteractivityContainer,
  type InteractivityParticle,
} from "@tsparticles/plugin-interactivity";
import { isInArray } from "@tsparticles/engine";

const pauseMode = "pause";

/**
 * Particle attract manager
 */
export class Pauser extends ExternalInteractorBase {
  /** @inheritDoc */
  handleClickMode: (mode: string, interactivityData: IInteractivityData) => void;

  /** @inheritDoc */
  readonly maxDistance = 0;

  constructor(container: InteractivityContainer) {
    super(container);

    this.handleClickMode = (mode): void => {
      if (mode !== pauseMode) {
        return;
      }

      const container = this.container;

      if (container.animationStatus) {
        container.pause();
      } else {
        container.play();
      }
    };
  }

  /** @inheritDoc */
  clear(): void {
    // do nothing
  }

  /** @inheritDoc */
  init(): void {
    // do nothing
  }

  /** @inheritDoc */
  interact(): void {
    // do nothing
  }

  /** @inheritDoc */
  isEnabled(_interactivityData: IInteractivityData, particle?: InteractivityParticle): boolean {
    const container = this.container,
      options = container.actualOptions,
      events = (particle?.interactivity ?? options.interactivity)?.events;

    return !!events && isInArray(pauseMode, events.onClick.mode);
  }

  /** @inheritDoc */
  reset(): void {
    // do nothing
  }
}
