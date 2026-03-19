import type { Drag } from "./Options/Classes/Drag.js";
import type { DragOptions } from "./Options/Classes/DragOptions.js";
import type { IDrag } from "./Options/Interfaces/IDrag.js";
import type { InteractivityContainer } from "@tsparticles/plugin-interactivity";

export interface IDragMode {
  drag: IDrag;
}

export interface DragMode {
  drag?: Drag;
}

export type DragContainer = InteractivityContainer & {
  actualOptions: DragOptions;
};
