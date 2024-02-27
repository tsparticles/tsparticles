import { type Container, ExternalInteractorBase } from "@tsparticles/engine";

const pauseMode = "pause";

/**
 * Particle attract manager
 */
export class Pauser extends ExternalInteractorBase {
    handleClickMode: (mode: string) => void;

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
