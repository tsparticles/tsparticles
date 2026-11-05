import type { ICoordinates } from "@tsparticles/engine";

/** Mouse event data for interactivity */
export interface IMouseData {
  clicking: boolean;
  clickPosition?: ICoordinates;
  clickTime?: number;
  downPosition?: ICoordinates;
  inside: boolean;
  position?: ICoordinates;
}
