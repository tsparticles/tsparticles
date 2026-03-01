import type { ICoordinates } from "@tsparticles/engine";

/**
 */
export interface IMouseData {
  clickPosition?: ICoordinates;
  clickTime?: number;
  clicking: boolean;
  downPosition?: ICoordinates;
  inside: boolean;
  position?: ICoordinates;
}
