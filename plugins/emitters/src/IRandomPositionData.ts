import type { ICoordinates, IRgb } from "@tsparticles/engine";

export interface IRandomPositionData {
  /** Raw sampled source-pixel channels; converted when adopted as a particle color. */
  color?: IRgb;
  /** Primaries used for the raw sampled channels; absent means sRGB. */
  colorSpace?: "display-p3" | "srgb";
  opacity?: number;
  position: ICoordinates;
}
