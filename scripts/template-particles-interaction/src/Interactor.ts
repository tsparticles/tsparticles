import type { Container, IParticle, Particle } from "tsparticles-engine";
import {
    ParticlesInteractorBase
} from "tsparticles-engine";

/**
 * Particle attract manager
 * @category Interactions
 */
export class Interactor extends ParticlesInteractorBase {
    constructor(container: Container) {
        super(container, "interactor");
    }

    public isEnabled(particle: Particle): boolean {
        // return the condition for enable or disable this interactor for the provided particle
        return false;
    }

    public reset(): void {
        // do nothing
    }

    public interact(p1: IParticle): void {
        // interact with particles here, the source particles is p1
    }
}
