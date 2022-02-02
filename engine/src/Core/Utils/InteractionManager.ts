import type { IDelta, IExternalInteractor, IParticlesInteractor } from "../Interfaces";
import type { Container } from "../Container";
import type { Engine } from "../../engine";
import { InteractorType } from "../../Enums";
import type { Particle } from "../Particle";

/**
 * @category Core
 */
export class InteractionManager {
    private readonly externalInteractors: IExternalInteractor[];
    private readonly particleInteractors: IParticlesInteractor[];
    readonly #engine;

    constructor(engine: Engine, private readonly container: Container) {
        this.#engine = engine;
        this.externalInteractors = [];
        this.particleInteractors = [];

        this.init();
    }

    init(): void {
        const interactors = this.#engine.plugins.getInteractors(this.container, true);

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

    async externalInteract(delta: IDelta): Promise<void> {
        for (const interactor of this.externalInteractors) {
            if (interactor.isEnabled()) {
                await interactor.interact(delta);
            }
        }
    }

    async particlesInteract(particle: Particle, delta: IDelta): Promise<void> {
        for (const interactor of this.externalInteractors) {
            interactor.reset(particle);
        }

        /* interaction auto between particles */
        for (const interactor of this.particleInteractors) {
            if (interactor.isEnabled(particle)) {
                await interactor.interact(particle, delta);
            }
        }
    }
}
