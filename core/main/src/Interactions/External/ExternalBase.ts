import type { IExternalInteractor } from "../../Core/Interfaces/IExternalInteractor";
import type { IDelta } from "../../Core/Interfaces/IDelta";
import type { Particle } from "../../Core/Particle";
import { InteractorType } from "../../Enums/Types/InteractorType";
import { Container } from "../..";

export abstract class ExternalBase implements IExternalInteractor {
    public name: string;

    protected constructor(protected readonly container: Container, subName: string) {
        this.name = `external${subName}`;
    }

    public type: InteractorType = InteractorType.External;

    public abstract interact(delta: IDelta): void;

    public abstract isEnabled(): boolean;

    public abstract reset(particle: Particle): void;
}
