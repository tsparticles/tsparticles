import { Grabber } from "./Interactions/Mouse/Grabber";
import { Repulser } from "./Interactions/Mouse/Repulser";
import { Bubbler } from "./Interactions/Mouse/Bubbler";
import { Connector } from "./Interactions/Mouse/Connector";
import { Container } from "../Container";
import { Linker } from "./Interactions/Particles/Linker";
import { Attractor } from "./Interactions/Particles/Attractor";
import { Collider } from "./Interactions/Particles/Collider";
import { Infecter } from "./Interactions/Particles/Infecter";
import type { IExternalInteractor } from "../Interfaces/IExternalInteractor";
import type { IParticlesInteractor } from "../Interfaces/IParticlesInteractor";
import { TrailMaker } from "./Interactions/Mouse/TrailMaker";
import type { IDelta } from "../Interfaces/IDelta";

export class InteractionManager {
    private readonly externalInteractors: IExternalInteractor[];
    private readonly particleInteractors: IParticlesInteractor[];

    constructor(private readonly container: Container) {
        this.externalInteractors = [
            new Bubbler(container),
            new Connector(container),
            new Grabber(container),
            new Repulser(container),
            new TrailMaker(container),
        ];

        this.particleInteractors = [
            new Attractor(container),
            new Collider(container),
            new Infecter(container),
            new Linker(container),
        ];
    }

    public init(): void {
        // TODO: filter interactors
    }

    public interact(delta: IDelta): void {
        this.externalInteract(delta);

        this.particlesInteract(delta);
    }

    private externalInteract(delta: IDelta): void {
        for (const interactor of this.externalInteractors) {
            if (interactor.isEnabled()) {
                interactor.interact(delta);
            }
        }
    }

    private particlesInteract(delta: IDelta): void {
        // this loop is required to be done after mouse interactions
        for (const particle of this.container.particles.array) {
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
}
