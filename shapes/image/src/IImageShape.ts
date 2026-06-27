import type { IShapeValues } from "@tsparticles/engine";

export interface IImageShape extends IShapeValues {
  height: number;
  name: string;
  replaceColor: boolean;
  src: string;
  width: number;
}
