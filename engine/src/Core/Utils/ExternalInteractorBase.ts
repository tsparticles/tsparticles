import type { Container } from "../Container";
import type { IDelta } from "../Interfaces/IDelta";
import type { IExternalInteractor } from "../Interfaces/IExternalInteractor";
import { InteractorType } from "../../Enums/Types/InteractorType";
import type { Particle } from "../Particle";

/**
 * External Interactivity manager, base abstract class
 */
export abstract class ExternalInteractorBase<TContainer extends Container = Container> implements IExternalInteractor {
    /**
     * External Interactivity type
     */
    type: InteractorType = InteractorType.external;

    /**
     * Constructor of external interactivity manager
     * @param container the parent container
     * @protected
     */
    protected constructor(protected readonly container: TContainer) {}

    /**
     * Before interaction clear
     * @param particle the particle to clear
     * @param delta this variable contains the delta between the current frame and the previous frame
     */
    abstract clear(particle: Particle, delta: IDelta): void;

    /**
     * Initializes the interactivity manager
     */
    abstract init(): void;

    /**
     * Interaction handler
     * @param delta this variable contains the delta between the current frame and the previous frame
     */
    abstract interact(delta: IDelta): Promise<void>;

    /**
     * Interaction enabled check
     * @param particle the particle to check, if null, checks the container
     * @returns true or false, checking if the options enable this interaction manager
     */
    abstract isEnabled(particle?: Particle): boolean;

    /**
     * Before interaction reset
     * @param particle the particle to reset
     */
    abstract reset(particle: Particle): void;
}
