import type { IDelta } from "./IDelta";
import type { IOptions } from "../../Options/Interfaces/IOptions";
import type { IParticlesOptions } from "../../Options/Interfaces/Particles/IParticlesOptions";
import type { InteractorType } from "../../Enums/Types/InteractorType";
import type { Options } from "../../Options/Classes/Options";
import type { Particle } from "../Particle";
import type { ParticlesOptions } from "../../Options/Classes/Particles/ParticlesOptions";
import type { RecursivePartial } from "../../Types/RecursivePartial";

/**
 * @category Interfaces
 */
export interface IInteractor {
    loadOptions?: (options: Options, ...sources: (RecursivePartial<IOptions> | undefined)[]) => void;

    loadParticlesOptions?: (
        options: ParticlesOptions,
        ...sources: (RecursivePartial<IParticlesOptions> | undefined)[]
    ) => void;

    type: InteractorType;

    clear(particle: Particle, delta: IDelta): void;

    init(): void;

    reset(particle: Particle): void;
}
