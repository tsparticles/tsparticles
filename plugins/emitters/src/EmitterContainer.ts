import type { ICoordinates, RecursivePartial } from "@tsparticles/engine";
import type { EmitterInstance } from "./EmitterInstance.js";
import type { EmitterOptions } from "./types.js";
import type { IEmitter } from "./Options/Interfaces/IEmitter.js";
import type { InteractivityContainer } from "@tsparticles/plugin-interactivity";

export type EmitterContainer = InteractivityContainer & {
  actualOptions: EmitterOptions;
  addEmitter?: (options: RecursivePartial<IEmitter>, position?: ICoordinates) => Promise<EmitterInstance>;
  getEmitter?: (idxOrName?: number | string) => EmitterInstance | undefined;
  pauseEmitter?: (idxOrName?: number | string) => void;
  playEmitter?: (idxOrName?: number | string) => void;
  removeEmitter?: (idxOrName?: number | string) => void;
};
