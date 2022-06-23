import type { Container } from "../Core/Container";
import type { Engine } from "../engine";
import type { IOptionLoader } from "../Options/Interfaces/IOptionLoader";
import type { IParticlesOptions } from "../Options/Interfaces/Particles/IParticlesOptions";
import { ParticlesOptions } from "../Options/Classes/Particles/ParticlesOptions";
import type { RecursivePartial } from "../Types/RecursivePartial";

export function loadOptions<T>(
    options: IOptionLoader<T>,
    ...sourceOptionsArr: RecursivePartial<T | undefined>[]
): void {
    for (const sourceOptions of sourceOptionsArr) {
        options.load(sourceOptions);
    }
}

export function loadParticlesOptions(
    engine: Engine,
    container: Container,
    ...sourceOptionsArr: RecursivePartial<IParticlesOptions | undefined>[]
): ParticlesOptions {
    const options = new ParticlesOptions(engine, container);

    loadOptions(options, ...sourceOptionsArr);

    return options;
}
