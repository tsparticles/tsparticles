import type { IOptions, Options, SingleOrMultiple } from "@tsparticles/engine";
import type { Absorber } from "./Options/Classes/Absorber.js";
import type { IAbsorber } from "./Options/Interfaces/IAbsorber.js";

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
