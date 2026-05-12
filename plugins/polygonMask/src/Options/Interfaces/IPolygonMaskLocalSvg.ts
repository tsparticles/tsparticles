import type { IDimension, SingleOrMultiple } from "@tsparticles/engine";

/** The polygon mask local svg options */
export interface IPolygonMaskLocalSvg {
  /** The svg path */
  path: SingleOrMultiple<string>;
  /** The svg size */
  size: IDimension;
}
