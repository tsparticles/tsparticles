import { ClickMode, ExternalInteractorBase } from "tsparticles-engine";
import type { Container } from "tsparticles-engine";

/**
 * Particle attract manager
 * @category Interactions
 */
export class Remover extends ExternalInteractorBase {
    handleClickMode: (mode: string) => void;

    constructor(container: Container) {
        super(container);

        this.handleClickMode = (mode): void => {
            if (mode !== ClickMode.remove) {
                return;
            }

            const container = this.container,
                options = container.actualOptions,
                removeNb = options.interactivity.modes.remove.quantity;

            container.particles.removeQuantity(removeNb);
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
