import type { ICoordinates } from "@tsparticles/engine";

export interface IPoissonPoint {
  gridPosition: ICoordinates;
  position: ICoordinates;
}
