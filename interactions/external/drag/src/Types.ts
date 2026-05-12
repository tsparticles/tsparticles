import type { Drag } from "./Options/Classes/Drag.js";
import type { DragOptions } from "./Options/Classes/DragOptions.js";
import type { IDrag } from "./Options/Interfaces/IDrag.js";
import type { InteractivityContainer } from "@tsparticles/plugin-interactivity";

/** Drag mode interface */
export interface IDragMode {
  drag: IDrag;
}

/** Drag mode options */
export interface DragMode {
  drag?: Drag;
}

/** Drag container interface */
export type DragContainer = InteractivityContainer & {
  actualOptions: DragOptions;
};
