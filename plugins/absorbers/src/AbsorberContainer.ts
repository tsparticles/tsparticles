import type { ICoordinates, RecursivePartial } from "@tsparticles/engine";
import type { AbsorberInstance } from "./AbsorberInstance.js";
import type { AbsorberOptions } from "./types.js";
import type { IAbsorber } from "./Options/Interfaces/IAbsorber.js";
import type { InteractivityContainer } from "@tsparticles/plugin-interactivity";

export interface AbsorberContainer extends InteractivityContainer {
  actualOptions: AbsorberOptions;
  addAbsorber?: (options: RecursivePartial<IAbsorber>, position?: ICoordinates) => Promise<AbsorberInstance>;
  getAbsorber?: (idxOrName?: number | string) => AbsorberInstance | undefined;
}
