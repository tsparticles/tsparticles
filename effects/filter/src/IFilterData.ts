import type { IShapeValues } from "@tsparticles/engine";

export interface IFilterData extends IShapeValues {
  blur?: number | string;
  brightness?: number;
  contrast?: number;
  dropShadow?: string;
  grayscale?: number;
  hueRotate?: number | string;
  invert?: number;
  opacity?: number;
  saturate?: number;
  sepia?: number;
  url?: string;
}
