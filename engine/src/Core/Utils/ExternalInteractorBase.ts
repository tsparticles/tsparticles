import type { Container } from "../Container.js";
import type { IDelta } from "../Interfaces/IDelta.js";
import type { IExternalInteractor } from "../Interfaces/IExternalInteractor.js";
import { InteractorType } from "../../Enums/Types/InteractorType.js";
import type { Particle } from "../Particle.js";

/**
 * External Interactivity manager, base abstract class
 */
export abstract class ExternalInteractorBase<
    TContainer extends Container = Container,
    TParticle extends Particle = Particle,
> implements IExternalInteractor<TParticle>
{
    /**
     * External Interactivity type
     */
    type: InteractorType = InteractorType.external;

    protected readonly container: TContainer;

    /**
     * Constructor of external interactivity manager
     * @param container - the parent container
     * @internal
     */
    protected constructor(container: TContainer) {
        this.container = container;
    }

    /**
     * Before interaction clear
     * @param particle - the particle to clear
     * @param delta - this variable contains the delta between the current frame and the previous frame
     */
    abstract clear(particle: TParticle, delta: IDelta): void;

    /**
     * Initializes the interactivity manager
     */
    abstract init(): void;

    /**
     * Interaction handler
     * @param delta - this variable contains the delta between the current frame and the previous frame
     */
    abstract interact(delta: IDelta): Promise<void>;

    /**
     * Interaction enabled check
     * @param particle - the particle to check, if null, checks the container
     * @returns true or false, checking if the options enable this interaction manager
     */
    abstract isEnabled(particle?: TParticle): boolean;

    /**
     * Before interaction reset
     * @param particle - the particle to reset
     */
    abstract reset(particle: TParticle): void;
}
