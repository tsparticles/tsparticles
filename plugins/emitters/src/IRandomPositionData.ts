import type { ICoordinates, IRgb } from "@tsparticles/engine";

export interface IRandomPositionData {
  /** Raw sampled source-pixel channels; converted when adopted as a particle color. */
  color?: IRgb;
  opacity?: number;
  position: ICoordinates;
}
