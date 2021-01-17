import type { IParticlesInteractor } from "./Interfaces/IParticlesInteractor";
import type { IDelta } from "./Interfaces/IDelta";
import type { Particle } from "./Particle";
import { InteractorType } from "../Enums/Types/InteractorType";
import { Container } from "../index";

export abstract class ParticlesInteractorBase implements IParticlesInteractor {
    public name: string;

    protected constructor(protected readonly container: Container, subName: string) {
        this.name = `particles${subName}`;
    }

    public type: InteractorType = InteractorType.Particles;

    public abstract interact(particle: Particle, delta: IDelta): void;

    public abstract isEnabled(particle: Particle): boolean;

    public abstract reset(particle: Particle): void;
}
