import {
  ExternalInteractorBase,
  type IInteractivityData,
  type InteractivityContainer,
  type InteractivityParticle,
} from "@tsparticles/plugin-interactivity";
import { isInArray } from "@tsparticles/engine";

const popMode = "pop";

/**
 * Particle attract manager
 */
export class Popper extends ExternalInteractorBase {
  /** @inheritDoc */
  handleClickMode: (mode: string, interactivityData: IInteractivityData) => void;

  /** @inheritDoc */
  readonly maxDistance = 0;

  constructor(container: InteractivityContainer) {
    super(container);

    this.handleClickMode = (mode, interactivityData): void => {
      const container = this.container;

      if (mode !== popMode) {
        return;
      }

      const clickPos = interactivityData.mouse.clickPosition;

      if (!clickPos) {
        return;
      }

      const poppedParticles = container.particles.grid.queryCircle(clickPos, container.retina.pixelRatio);

      if (!poppedParticles.length) {
        return;
      }

      for (const particle of poppedParticles) {
        particle.destroy();
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
  isEnabled(interactivityData: IInteractivityData, particle?: InteractivityParticle): boolean {
    const container = this.container,
      options = container.actualOptions,
      mouse = interactivityData.mouse,
      events = (particle?.interactivity ?? options.interactivity)?.events;

    return !!events && mouse.clicking && mouse.inside && !!mouse.position && isInArray(popMode, events.onClick.mode);
  }

  /** @inheritDoc */
  reset(): void {
    // do nothing
  }
}
