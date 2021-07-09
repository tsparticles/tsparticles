import type { IDelta, IParticlesInteractor } from "./Interfaces";
import type { Particle } from "./Particle";
import type { Container } from "./Container";
import { InteractorType } from "../Enums";

export abstract class ParticlesInteractorBase implements IParticlesInteractor {
    protected constructor(protected readonly container: Container) {}

    type: InteractorType = InteractorType.Particles;

    public abstract interact(particle: Particle, delta: IDelta): void;

    public abstract isEnabled(particle: Particle): boolean;

    public abstract reset(particle: Particle): void;
}
