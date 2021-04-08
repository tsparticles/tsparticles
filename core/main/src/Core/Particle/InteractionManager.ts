import { Grabber } from "../../Interactions/External/Grabber";
import { Repulser } from "../../Interactions/External/Repulser";
import { Bubbler } from "../../Interactions/External/Bubbler";
import { Connector } from "../../Interactions/External/Connector";
import type { Container } from "../Container";
import { Linker } from "../../Interactions/Particles/Linker";
import { Attractor as ParticlesAttractor } from "../../Interactions/Particles/Attractor";
import { Collider } from "../../Interactions/Particles/Collider";
import { Infecter } from "../../Interactions/Particles/Infecter";
import type { IExternalInteractor } from "../Interfaces/IExternalInteractor";
import type { IParticlesInteractor } from "../Interfaces/IParticlesInteractor";
import { TrailMaker } from "../../Interactions/External/TrailMaker";
import type { IDelta } from "../Interfaces/IDelta";
import { Attractor as MouseAttractor } from "../../Interactions/External/Attractor";
import { Particle } from "../Particle";
import { Lighter as ParticlesLighter } from "../../Interactions/Particles/Lighter";
import { Lighter as MouseLighter } from "../../Interactions/External/Lighter";
import { Bouncer } from "../../Interactions/External/Bouncer";

/**
 * @category Core
 */
export class InteractionManager {
    private readonly externalInteractors: IExternalInteractor[];
    private readonly particleInteractors: IParticlesInteractor[];

    constructor(private readonly container: Container) {
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
            new Infecter(container),
            new Linker(container),
        ];
    }

    init(): void {
        // TODO: filter interactors
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
