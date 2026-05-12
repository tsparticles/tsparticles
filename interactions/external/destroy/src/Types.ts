import type { Destroy } from "./Options/Classes/Destroy.js";
import type { DestroyOptions } from "./Options/Classes/DestroyOptions.js";
import type { IDestroy } from "./Options/Interfaces/IDestroy.js";
import type { InteractivityContainer } from "@tsparticles/plugin-interactivity";

/** Destroy mode interface */
export interface IDestroyMode {
  destroy: IDestroy;
}

/** Destroy mode options */
export interface DestroyMode {
  destroy?: Destroy;
}

/** Destroy container interface */
export type DestroyContainer = InteractivityContainer & {
  actualOptions: DestroyOptions;
  retina: {
    destroyModeDistance?: number;
  };
};
