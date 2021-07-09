import type { Container } from "./Container";
import { Particle } from "./Particle";
import { Plugins } from "../Utils";
import { IDelta, IExternalInteractor, IParticlesInteractor } from "./Interfaces";
import { InteractorType } from "../Enums";
import { Bouncer } from "../Interactions/External/Bouncer";
import { Bubbler } from "../Interactions/External/Bubbler";
import { Connector } from "../Interactions/External/Connector";
import { Grabber } from "../Interactions/External/Grabber";
import { Lighter as MouseLighter } from "../Interactions/External/Lighter";
import { Attractor as MouseAttractor } from "../Interactions/External/Attractor";
import { Repulser } from "../Interactions/External/Repulser";
import { TrailMaker } from "../Interactions/External/TrailMaker";
import { Attractor as ParticlesAttractor } from "../Interactions/Particles/Attractor";
import { Lighter as ParticlesLighter } from "../Interactions/Particles/Lighter";
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

        this.externalInteractors = [
            new Bouncer(container),
            new Bubbler(container),
            new Connector(container),
            new Grabber(container),
            new MouseLighter(container),
            new MouseAttractor(container),
            new Repulser(container),
            new TrailMaker(container),
        ];

        this.particleInteractors = [
            new ParticlesAttractor(container),
            new ParticlesLighter(container),
            new Collider(container),
            new Linker(container),
        ];

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
