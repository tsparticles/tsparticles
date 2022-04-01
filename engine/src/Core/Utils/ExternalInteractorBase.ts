import type { Container } from "../Container";
import type { IDelta } from "../Interfaces/IDelta";
import type { IExternalInteractor } from "../Interfaces/IExternalInteractor";
import { InteractorType } from "../../Enums/Types/InteractorType";
import type { Particle } from "../Particle";

/**
 * External Interactivity manager, base abstract class
 */
export abstract class ExternalInteractorBase implements IExternalInteractor {
    /**
     * Constructor of external interactivity manager
     * @param container the parent container
     * @protected
     */
    protected constructor(protected readonly container: Container) {}

    /**
     * External Interactivity type
     */
    type: InteractorType = InteractorType.External;

    /**
     * Interaction handler
     * @param delta this variable contains the delta between the current frame and the previous frame
     */
    abstract interact(delta: IDelta): Promise<void>;

    /**
     * Interaction enabled check
     * @returns true or false, checking if the options enable this interaction manager
     */
    abstract isEnabled(): boolean;

    /**
     * Before interaction reset
     * @param particle the particle to be reset
     */
    abstract reset(particle: Particle): void;
}
