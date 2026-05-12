import type { ICoordinates } from "@tsparticles/engine";

/** Mouse event data for interactivity */
export interface IMouseData {
  clickPosition?: ICoordinates;
  clickTime?: number;
  clicking: boolean;
  downPosition?: ICoordinates;
  inside: boolean;
  position?: ICoordinates;
}
