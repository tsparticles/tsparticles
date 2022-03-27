import type { IDelta, IExternalInteractor } from "../Interfaces";
import type { Container } from "../Container";
import { InteractorType } from "../../Enums";
import type { Particle } from "../Particle";

/**
 * External Interactivity manager, base abstract class
 */
export abstract class ExternalInteractorBase implements IExternalInteractor {
    /**
     * Constructor of external interactivity manager
     * @param container
     * @protected
     */
    protected constructor(protected readonly container: Container) {}

    /**
     * External Interactivity type
     */
    type: InteractorType = InteractorType.External;

    /**
     * Interaction handler
     * @param delta
     */
    abstract interact(delta: IDelta): Promise<void>;

    /**
     * Interaction enabled check
     */
    abstract isEnabled(): boolean;

    /**
     * Before interaction reset
     * @param particle the particle to be reset
     */
    abstract reset(particle: Particle): void;
}
