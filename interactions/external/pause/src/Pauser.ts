import { type Container, ExternalInteractorBase } from "@tsparticles/engine";

/**
 * Particle attract manager
 */
export class Pauser extends ExternalInteractorBase {
    handleClickMode: (mode: string) => void;

    constructor(container: Container) {
        super(container);

        this.handleClickMode = (mode): void => {
            if (mode !== "pause") {
                return;
            }

            const container = this.container;

            if (container.getAnimationStatus()) {
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

    async interact(): Promise<void> {
        // do nothing
    }

    isEnabled(): boolean {
        return true;
    }

    reset(): void {
        // do nothing
    }
}
