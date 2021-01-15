import type { IParticlesInteractor } from "../../Core/Interfaces/IParticlesInteractor";
import type { IDelta } from "../../Core/Interfaces/IDelta";
import type { Particle } from "../../Core/Particle";
import { InteractorType } from "../../Enums/Types/InteractorType";
import { Container } from "../..";

export abstract class ParticlesBase implements IParticlesInteractor {
    public name: string;

    protected constructor(protected readonly container: Container, subName: string) {
        this.name = `particles${subName}`;
    }

    public type: InteractorType = InteractorType.Particles;

    public abstract interact(particle: Particle, delta: IDelta): void;

    public abstract isEnabled(particle: Particle): boolean;

    public abstract reset(particle: Particle): void;
}
