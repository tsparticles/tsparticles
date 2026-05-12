import type { IShapeValues } from "@tsparticles/engine";

/** CSS filter effect data interface */
export interface IFilterData extends IShapeValues {
  /** Blur filter value */
  blur?: number | string;
  /** Brightness filter value */
  brightness?: number;
  /** Contrast filter value */
  contrast?: number;
  /** Drop shadow filter value */
  dropShadow?: string;
  /** Grayscale filter value */
  grayscale?: number;
  /** Hue rotate filter value */
  hueRotate?: number | string;
  /** Invert filter value */
  invert?: number;
  /** Opacity filter value */
  opacity?: number;
  /** Saturate filter value */
  saturate?: number;
  /** Sepia filter value */
  sepia?: number;
  /** URL filter */
  url?: string;
}
