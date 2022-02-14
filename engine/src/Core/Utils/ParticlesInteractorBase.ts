import type { IDelta, IParticlesInteractor } from "../Interfaces";
import type { Container } from "../Container";
import { InteractorType } from "../../Enums";
import type { Particle } from "../Particle";

export abstract class ParticlesInteractorBase implements IParticlesInteractor {
    protected constructor(protected readonly container: Container) {}

    type: InteractorType = InteractorType.Particles;

    public abstract interact(particle: Particle, delta: IDelta): Promise<void>;

    abstract isEnabled(particle: Particle): boolean;

    abstract reset(particle: Particle): void;
}
