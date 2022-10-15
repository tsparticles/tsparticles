import type { IOptions, Options, SingleOrMultiple } from "tsparticles-engine";
import type { Absorber } from "./Options/Classes/Absorber";
import type { IAbsorber } from "./Options/Interfaces/IAbsorber";

export type AbsorberOptions = Options & {
    absorbers: SingleOrMultiple<Absorber>;
    interactivity: {
        modes: {
            absorbers: SingleOrMultiple<Absorber>;
        };
    };
};

export type IAbsorberOptions = IOptions & {
    absorbers: SingleOrMultiple<IAbsorber>;
    interactivity: {
        modes: {
            absorbers: SingleOrMultiple<IAbsorber>;
        };
    };
};
