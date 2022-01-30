/**
 * @category Core
 */
import { ClickMode, InteractorType } from "../../Enums";
import type { IDelta, IExternalInteractor, IParticlesInteractor } from "../Interfaces";
import type { Container } from "../Container";
import { Engine } from "../../engine";
import type { Particle } from "../Particle";

export class InteractionManager {
    private readonly externalInteractors: IExternalInteractor[];
    private readonly particleInteractors: IParticlesInteractor[];

    readonly #engine;

    constructor(private readonly container: Container, engine: Engine) {
        this.externalInteractors = [];
        this.particleInteractors = [];
        this.#engine = engine;

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
