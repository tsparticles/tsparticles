import type { Container } from "./Container";
import type { Particle } from "./Particle";
import type { IDelta, IExternalInteractor, IParticlesInteractor } from "./Interfaces";
import type { ClickMode } from "../Enums";
import { Plugins } from "../Utils";
import { InteractorType } from "../Enums";

/**
 * @category Core
 */
export class InteractionManager {
    private readonly externalInteractors: IExternalInteractor[];
    private readonly particleInteractors: IParticlesInteractor[];

    constructor(private readonly container: Container) {
        this.externalInteractors = [];
        this.particleInteractors = [];

        this.init();
    }

    init(): void {
        const interactors = Plugins.getInteractors(this.container, true);

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

    handleClickMode(mode: ClickMode | string): void {
        for (const interactor of this.externalInteractors) {
            if (interactor.handleClickMode) {
                interactor.handleClickMode(mode);
            }
        }
    }
}
