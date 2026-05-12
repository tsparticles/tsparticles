import type { IInteractivityOptions, InteractivityOptions } from "@tsparticles/plugin-interactivity";
import type { Absorber } from "./Options/Classes/Absorber.js";
import type { IAbsorber } from "./Options/Interfaces/IAbsorber.js";
import type { SingleOrMultiple } from "@tsparticles/engine";

/** Absorber mode options */
export interface AbsorberModeOptions {
  /** The absorbers array */
  absorbers?: Absorber[];
}

/** Absorber mode options interface */
export interface IAbsorberModeOptions {
  /** The absorbers, single or multiple */
  absorbers?: SingleOrMultiple<IAbsorber>;
}

/** Absorber options */
export type AbsorberOptions = InteractivityOptions & {
  /** The absorbers */
  absorbers: SingleOrMultiple<Absorber>;
  /** Interactivity modes */
  interactivity: {
    modes: AbsorberModeOptions;
  };
};

/** Absorber options interface */
export type IAbsorberOptions = IInteractivityOptions & {
  /** The absorbers */
  absorbers: SingleOrMultiple<IAbsorber>;
  /** Interactivity modes */
  interactivity: {
    modes: IAbsorberModeOptions;
  };
};
