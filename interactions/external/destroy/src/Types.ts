import type { Destroy } from "./Options/Classes/Destroy.js";
import type { DestroyOptions } from "./Options/Classes/DestroyOptions.js";
import type { IDestroy } from "./Options/Interfaces/IDestroy.js";
import type { InteractivityContainer } from "@tsparticles/plugin-interactivity";

export interface IDestroyMode {
  destroy: IDestroy;
}

export interface DestroyMode {
  destroy?: Destroy;
}

export type DestroyContainer = InteractivityContainer & {
  actualOptions: DestroyOptions;
  retina: {
    destroyModeDistance?: number;
  };
};
