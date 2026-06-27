import type { IShapeValues } from "@tsparticles/engine";

export interface IGifShape extends IShapeValues {
  height: number;
  loopCount?: number;
  name?: string;
  src: string;
  width: number;
}
