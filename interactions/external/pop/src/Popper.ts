import { type Container, ExternalInteractorBase } from "@tsparticles/engine";

const popMode = "pop";

/**
 * Particle attract manager
 */
export class Popper extends ExternalInteractorBase {
    handleClickMode: (mode: string) => void;

    constructor(container: Container) {
        super(container);

        this.handleClickMode = (mode): void => {
            const container = this.container;

            if (mode !== popMode) {
                return;
            }

            const clickPos = container.interactivity.mouse.clickPosition;

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
