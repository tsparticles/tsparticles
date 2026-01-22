import {
  ExternalInteractorBase,
  type IInteractivityData,
  type InteractivityContainer,
} from "@tsparticles/plugin-interactivity";

const popMode = "pop";

/**
 * Particle attract manager
 */
export class Popper extends ExternalInteractorBase {
  handleClickMode: (mode: string, interactivityData: IInteractivityData) => void;

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

      const poppedParticles = container.particles.quadTree.queryCircle(clickPos, container.retina.pixelRatio);

      if (!poppedParticles.length) {
        return;
      }

      for (const particle of poppedParticles) {
        container.particles.remove(particle);
      }
    };
  }

  clear(): void {
    // do nothing
  }

  init(): void {
    // do nothing
  }

  interact(): void {
    // do nothing
  }

  isEnabled(): boolean {
    return true;
  }

  reset(): void {
    // do nothing
  }
}
