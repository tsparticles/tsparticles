import type { Container } from "./Container";
import type { IExternalInteractor } from "./Interfaces/IExternalInteractor";
import type { IParticlesInteractor } from "./Interfaces/IParticlesInteractor";
import type { IDelta } from "./Interfaces/IDelta";
import { Particle } from "./Particle";
import { InteractorType } from "../Enums/Types/InteractorType";
import { Plugins } from "../Utils";

/**
 * @category Core
 */
export class InteractionManager {
    private readonly externalInteractors: IExternalInteractor[];
    private readonly particleInteractors: IParticlesInteractor[];

    constructor(private readonly container: Container) {
        const interactors = Plugins.getInteractors(container);

        this.externalInteractors = [];
        this.particleInteractors = [];

        for (const interactor of interactors) {
            switch (interactor.type) {
                case InteractorType.External:
                    this.externalInteractors.push(interactor as IExternalInteractor);
                    break;
                case InteractorType.Particles:
                    this.particleInteractors.push(interactor as IParticlesInteractor);
                    break;
            }
        }
    }

    externalInteract(delta: IDelta): void {
        for (const interactor of this.externalInteractors) {
            if (interactor.isEnabled()) {
                interactor.interact(delta);
            }
        }
    }

    particlesInteract(particle: Particle, delta: IDelta): void {
        for (const interactor of this.externalInteractors) {
            interactor.reset(particle);
        }

        /* interaction auto between particles */
        for (const interactor of this.particleInteractors) {
            if (interactor.isEnabled(particle)) {
                interactor.interact(particle, delta);
            }
        }
    }
}
