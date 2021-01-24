import type { IExternalInteractor } from "./Interfaces/IExternalInteractor";
import type { IDelta } from "./Interfaces/IDelta";
import type { Particle } from "./Particle";
import { InteractorType } from "../Enums/Types/InteractorType";
import { Container } from "../index";

export abstract class ExternalInteractorBase implements IExternalInteractor {
    public name: string;

    protected constructor(protected readonly container: Container, subName: string) {
        this.name = `external${subName}`;
    }

    public type: InteractorType = InteractorType.External;

    public abstract interact(delta: IDelta): void;

    public abstract isEnabled(): boolean;

    public abstract reset(particle: Particle): void;
}
