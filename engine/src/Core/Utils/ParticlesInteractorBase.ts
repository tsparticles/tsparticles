import type { Container } from "../Container";
import type { IDelta } from "../Interfaces/IDelta";
import type { IParticlesInteractor } from "../Interfaces/IParticlesInteractor";
import { InteractorType } from "../../Enums/Types/InteractorType";
import type { Particle } from "../Particle";

/**
 * Particles interactions manager, base abstract class
 */
export abstract class ParticlesInteractorBase<TContainer extends Container = Container>
    implements IParticlesInteractor
{
    /**
     * Particles interactions type
     */
    type: InteractorType = InteractorType.particles;

    /**
     * The particles interactions manager constructor
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
     * @param particle the particle responsible for interactions
     * @param delta this variable contains the delta between the current frame and the previous frame
     */
    abstract interact(particle: Particle, delta: IDelta): Promise<void>;

    /**
     * Interaction enable check
     * @param particle the particle responsible for interactions
     * @returns true or false, checking if the options enable this interaction manager
     */
    abstract isEnabled(particle: Particle): boolean;

    /**
     * Before interaction reset
     * @param particle the particle to be reset
     */
    abstract reset(particle: Particle): void;
}
