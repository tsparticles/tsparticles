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

        this.handleClickMode = (mode) => {
            if (mode !== ClickMode.remove) {
                return;
            }

            const container = this.container;
            const options = container.actualOptions;
            const removeNb = options.interactivity.modes.remove.quantity;

            container.particles.removeQuantity(removeNb);
        };
    }

    isEnabled(): boolean {
        return true;
    }

    reset(): void {
        // do nothing
    }

    interact(): void {
        // do nothing
    }
}
