import type { IShapeValues } from "@tsparticles/engine";

export interface IImageShape extends IShapeValues {
  gif: boolean;
  height: number;
  name: string;
  src: string;
  tint: boolean;
  width: number;
}
