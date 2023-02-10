import type {
    IOptionsColor,
    IParticlesOptions,
    IRangeHsl,
    IValueWithRandom,
    RecursivePartial,
    SingleOrMultiple,
} from "tsparticles-engine";

export interface ISplit {
    color?: string | IOptionsColor;
    colorOffset?: Partial<IRangeHsl>;
    count: number;
    factor: IValueWithRandom;
    particles?: SingleOrMultiple<RecursivePartial<IParticlesOptions>>;
    rate: IValueWithRandom;
    sizeOffset: boolean;
}
