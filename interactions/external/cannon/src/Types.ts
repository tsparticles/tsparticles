import type { Cannon } from "./Options/Classes/Cannon.js";
import type { CannonOptions } from "./Options/Classes/CannonOptions.js";
import type { ICannon } from "./Options/Interfaces/ICannon.js";
import type { InteractivityContainer } from "@tsparticles/plugin-interactivity";

/** Cannon mode interface */
export interface ICannonMode {
  cannon: ICannon;
}

/** Cannon mode options */
export interface CannonMode {
  cannon?: Cannon;
}

/** Cannon container interface */
export type CannonContainer = InteractivityContainer & {
  actualOptions: CannonOptions;
};
