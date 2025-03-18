import type { IParticlesOptions, RangeValue, RecursivePartial, SingleOrMultiple } from "@tsparticles/engine";

/**
 */
export interface IPush {
    default: boolean;
    groups: string[];
    particles?: SingleOrMultiple<RecursivePartial<IParticlesOptions>>;
    quantity: RangeValue;
}
