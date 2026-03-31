import type { Cannon } from "./Options/Classes/Cannon.js";
import type { CannonOptions } from "./Options/Classes/CannonOptions.js";
import type { ICannon } from "./Options/Interfaces/ICannon.js";
import type { InteractivityContainer } from "@tsparticles/plugin-interactivity";

export interface ICannonMode {
  cannon: ICannon;
}

export interface CannonMode {
  cannon?: Cannon;
}

export type CannonContainer = InteractivityContainer & {
  actualOptions: CannonOptions;
};
