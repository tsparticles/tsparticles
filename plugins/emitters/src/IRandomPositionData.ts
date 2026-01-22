import type { ICoordinates, IRgb } from "@tsparticles/engine";

export interface IRandomPositionData {
  color?: IRgb;
  opacity?: number;
  position: ICoordinates;
}
