import type { Container } from "tsparticles-engine";
import {
    ExternalInteractorBase
} from "tsparticles-engine";

/**
 * Particle attract manager
 * @category Interactions
 */
export class Interactor extends ExternalInteractorBase {
    constructor(container: Container) {
        super(container, "interactor");
    }

    public isEnabled(): boolean {
        // return the condition for enable or disable this interactor
        return false;
    }

    public reset(): void {
        // do nothing
    }

    public interact(): void {
        // interact with particles here
    }
}
