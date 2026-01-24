import type { IInteractivityOptions, InteractivityOptions } from "@tsparticles/plugin-interactivity";
import type { Absorber } from "./Options/Classes/Absorber.js";
import type { IAbsorber } from "./Options/Interfaces/IAbsorber.js";
import type { SingleOrMultiple } from "@tsparticles/engine";

export interface AbsorberModeOptions {
  absorbers?: Absorber[];
}

export interface IAbsorberModeOptions {
  absorbers?: SingleOrMultiple<IAbsorber>;
}

export type AbsorberOptions = InteractivityOptions & {
  absorbers: SingleOrMultiple<Absorber>;
  interactivity: {
    modes: AbsorberModeOptions;
  };
};

export type IAbsorberOptions = IInteractivityOptions & {
  absorbers: SingleOrMultiple<IAbsorber>;
  interactivity: {
    modes: IAbsorberModeOptions;
  };
};
