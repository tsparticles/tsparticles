import type { Container } from "../Container.js";
import type { IDelta } from "../Interfaces/IDelta.js";
import type { IParticlesInteractor } from "../Interfaces/IParticlesInteractor.js";
import { InteractorType } from "../../Enums/Types/InteractorType.js";
import type { Particle } from "../Particle.js";

/**
 * Particles interactions manager, base abstract class
 */
export abstract class ParticlesInteractorBase<
    TContainer extends Container = Container,
    TParticle extends Particle = Particle,
> implements IParticlesInteractor<TParticle>
{
    /**
     * Particles interactions type
     */
    type: InteractorType = InteractorType.particles;

    protected readonly container: TContainer;

    /**
     * The particles interactions manager constructor
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
     * @param particle - the particle responsible for interactions
     * @param delta - this variable contains the delta between the current frame and the previous frame
     */
    abstract interact(particle: TParticle, delta: IDelta): void;

    /**
     * Interaction enable check
     * @param particle - the particle responsible for interactions
     * @returns true or false, checking if the options enable this interaction manager
     */
    abstract isEnabled(particle: TParticle): boolean;

    /**
     * Before interaction reset
     * @param particle - the particle to be reset
     */
    abstract reset(particle: TParticle): void;
}
