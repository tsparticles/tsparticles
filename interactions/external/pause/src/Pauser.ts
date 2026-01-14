import { type Container, ExternalInteractorBase, type IInteractivityData } from "@tsparticles/engine";

const pauseMode = "pause";

/**
 * Particle attract manager
 */
export class Pauser extends ExternalInteractorBase {
    handleClickMode: (mode: string, interactivityData: IInteractivityData) => void;

    constructor(container: Container) {
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
