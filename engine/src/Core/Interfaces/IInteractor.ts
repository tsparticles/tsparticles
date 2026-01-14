import type { IDelta } from "./IDelta.js";
import type { IInteractivityData } from "./IInteractivityData.js";
import type { IParticlesOptions } from "../../Options/Interfaces/Particles/IParticlesOptions.js";
import type { ISourceOptions } from "../../Types/ISourceOptions.js";
import type { InteractorType } from "../../Enums/Types/InteractorType.js";
import type { Options } from "../../Options/Classes/Options.js";
import type { Particle } from "../Particle.js";
import type { ParticlesOptions } from "../../Options/Classes/Particles/ParticlesOptions.js";
import type { RecursivePartial } from "../../Types/RecursivePartial.js";

/**
 */
export interface IInteractor<TParticle extends Particle = Particle> {
    loadOptions?: (options: Options, ...sources: (ISourceOptions | undefined)[]) => void;

    loadParticlesOptions?: (
        options: ParticlesOptions,
        ...sources: (RecursivePartial<IParticlesOptions> | undefined)[]
    ) => void;

    type: InteractorType;

    clear(particle: TParticle, delta: IDelta): void;

    init(): void;

    reset(interactivityData: IInteractivityData, particle: TParticle): void;
}
