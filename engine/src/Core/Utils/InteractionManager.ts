/**
 */
import type { Container } from "../Container.js";
import type { Engine } from "../Engine.js";
import type { IDelta } from "../Interfaces/IDelta.js";
import type { IExternalInteractor } from "../Interfaces/IExternalInteractor.js";
import type { IInteractor } from "../Interfaces/IInteractor.js";
import type { IParticlesInteractor } from "../Interfaces/IParticlesInteractor.js";
import { InteractorType } from "../../Enums/Types/InteractorType.js";
import type { Particle } from "../Particle.js";

export class InteractionManager {
    /**
     * The engine used for registering the interactions managers
     * @internal
     */
    private readonly _engine;

    /**
     * Registered external interactivity managers
     * @internal
     */
    private _externalInteractors: IExternalInteractor[];

    /**
     * The interactors that are used for initialization
     * @internal
     */
    private _interactors: IInteractor[];

    /**
     * Registered particles interactions managers
     * @internal
     */
    private _particleInteractors: IParticlesInteractor[];

    /**
     * The constructor of the interaction manager
     * @param engine - the parent engine
     * @param container - the parent container
     */
    constructor(
        engine: Engine,
        private readonly container: Container,
    ) {
        this._engine = engine;
        this._interactors = [];
        this._externalInteractors = [];
        this._particleInteractors = [];
    }

    /**
     * Iterates through the external interactivity manager and call the interact method, if they are enabled
     * @param delta - this variable contains the delta between the current frame and the previous frame
     */
    externalInteract(delta: IDelta): void {
        for (const interactor of this._externalInteractors) {
            if (interactor.isEnabled()) {
                interactor.interact(delta);
            }
        }
    }

    handleClickMode(mode: string): void {
        for (const interactor of this._externalInteractors) {
            interactor.handleClickMode?.(mode);
        }
    }

    /**
     * Initializes the interaction manager, loading all the engine registered managers into the container
     */
    async init(): Promise<void> {
        this._interactors = await this._engine.getInteractors(this.container, true);

        this._externalInteractors = [];
        this._particleInteractors = [];

        for (const interactor of this._interactors) {
            switch (interactor.type) {
                case InteractorType.external:
                    this._externalInteractors.push(interactor as IExternalInteractor);
                    break;
                case InteractorType.particles:
                    this._particleInteractors.push(interactor as IParticlesInteractor);
                    break;
            }

            interactor.init();
        }
    }

    /**
     * Iterates through the particles interactions manager and call the interact method, if they are enabled
     * @param particle - the particle responsible for the current interaction
     * @param delta - this variable contains the delta between the current frame and the previous frame
     */
    particlesInteract(particle: Particle, delta: IDelta): void {
        for (const interactor of this._externalInteractors) {
            interactor.clear(particle, delta);
        }

        /* interaction auto between particles */
        for (const interactor of this._particleInteractors) {
            if (interactor.isEnabled(particle)) {
                interactor.interact(particle, delta);
            }
        }
    }

    /**
     * Iterates through the external interactivity manager and call the interact method, if they are enabled
     * @param particle - the particle to reset
     */
    reset(particle: Particle): void {
        for (const interactor of this._externalInteractors) {
            if (interactor.isEnabled()) {
                interactor.reset(particle);
            }
        }

        for (const interactor of this._particleInteractors) {
            if (interactor.isEnabled(particle)) {
                interactor.reset(particle);
            }
        }
    }
}
