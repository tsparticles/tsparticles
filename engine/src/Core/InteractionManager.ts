import type { Container } from "./Container";
import type { Particle } from "./Particle";
import type { IDelta, IExternalInteractor, IParticlesInteractor } from "./Interfaces";
import { Plugins } from "../Utils";
import { InteractorType } from "../Enums";
import { Grabber } from "../Interactions/External/Grabber";
import { Repulser } from "../Interactions/External/Repulser";
import { TrailMaker } from "../Interactions/External/TrailMaker";
import { Attractor as ParticlesAttractor } from "../Interactions/Particles/Attractor";
import { Collider } from "../Interactions/Particles/Collider";
import { Linker } from "../Interactions/Particles/Linker";

/**
 * @category Core
 */
export class InteractionManager {
    private readonly externalInteractors: IExternalInteractor[];
    private readonly particleInteractors: IParticlesInteractor[];

    constructor(private readonly container: Container) {
        const interactors = Plugins.getInteractors(container);

        this.externalInteractors = [new Grabber(container), new Repulser(container), new TrailMaker(container)];

        this.particleInteractors = [new ParticlesAttractor(container), new Collider(container), new Linker(container)];

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
