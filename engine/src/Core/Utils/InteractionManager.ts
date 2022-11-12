/**
 * @category Core
 */
import type { ClickMode } from "../../Enums/Modes/ClickMode";
import type { Container } from "../Container";
import type { Engine } from "../../engine";
import type { IDelta } from "../Interfaces/IDelta";
import type { IExternalInteractor } from "../Interfaces/IExternalInteractor";
import type { IParticlesInteractor } from "../Interfaces/IParticlesInteractor";
import { InteractorType } from "../../Enums/Types/InteractorType";
import type { Particle } from "../Particle";

export class InteractionManager {
    /**
     * The engine used for registering the interactions managers
     * @private
     */
    private readonly _engine;

    /**
     * Registered external interactivity managers
     * @private
     */
    private _externalInteractors: IExternalInteractor[];

    /**
     * The interactors that are used for initialization
     * @private
     */
    private readonly _interactors;

    /**
     * Registered particles interactions managers
     * @private
     */
    private _particleInteractors: IParticlesInteractor[];

    /**
     * The constructor of the interaction manager
     * @param engine the parent engine
     * @param container the parent container
     */
    constructor(engine: Engine, private readonly container: Container) {
        this._engine = engine;
        this._interactors = this._engine.plugins.getInteractors(this.container, true);
        this._externalInteractors = [];
        this._particleInteractors = [];
    }

    /**
     * Iterates through the external interactivity manager and call the interact method, if they are enabled
     * @param delta this variable contains the delta between the current frame and the previous frame
     */
    async externalInteract(delta: IDelta): Promise<void> {
        for (const interactor of this._externalInteractors) {
            if (interactor.isEnabled()) {
                await interactor.interact(delta);
            }
        }
    }

    handleClickMode(mode: ClickMode | string): void {
        for (const interactor of this._externalInteractors) {
            if (interactor.handleClickMode) {
                interactor.handleClickMode(mode);
            }
        }
    }

    /**
     * Initializes the interaction manager, loading all the engine registered managers into the container
     */
    init(): void {
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
     * @param particle the particle responsible for the current interaction
     * @param delta this variable contains the delta between the current frame and the previous frame
     */
    async particlesInteract(particle: Particle, delta: IDelta): Promise<void> {
        for (const interactor of this._externalInteractors) {
            interactor.clear(particle, delta);
        }

        /* interaction auto between particles */
        for (const interactor of this._particleInteractors) {
            if (interactor.isEnabled(particle)) {
                await interactor.interact(particle, delta);
            }
        }
    }

    /**
     * Iterates through the external interactivity manager and call the interact method, if they are enabled
     * @param particle the particle to reset
     */
    async reset(particle: Particle): Promise<void> {
        for (const interactor of this._externalInteractors) {
            if (interactor.isEnabled()) {
                await interactor.reset(particle);
            }
        }

        for (const interactor of this._particleInteractors) {
            if (interactor.isEnabled(particle)) {
                await interactor.reset(particle);
            }
        }
    }
}
