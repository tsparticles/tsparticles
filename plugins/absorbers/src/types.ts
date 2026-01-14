import type { IOptions, Options, SingleOrMultiple } from "@tsparticles/engine";
import type { Absorber } from "./Options/Classes/Absorber.js";
import type { IAbsorber } from "./Options/Interfaces/IAbsorber.js";

export interface AbsorberModeOptions {
    absorbers?: Absorber[];
}

export interface IAbsorberModeOptions {
    absorbers?: SingleOrMultiple<IAbsorber>;
}

export type AbsorberOptions = Options & {
    absorbers: SingleOrMultiple<Absorber>;
    interactivity: {
        modes: AbsorberModeOptions;
    };
};

export type IAbsorberOptions = IOptions & {
    absorbers: SingleOrMultiple<IAbsorber>;
    interactivity: {
        modes: IAbsorberModeOptions;
    };
};
