import type { IParticlesOptions, IValueWithRandom, RecursivePartial, SingleOrMultiple } from "@tsparticles/engine";

export interface ISplit {
    count: number;
    factor: IValueWithRandom;
    particles?: SingleOrMultiple<RecursivePartial<IParticlesOptions>>;
    rate: IValueWithRandom;
    sizeOffset: boolean;
}
