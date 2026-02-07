import type { IShapeValues, SingleOrMultiple } from "@tsparticles/engine";

/**
 */
export interface ITextShape extends IShapeValues {
  font?: string;
  style?: string;
  value: SingleOrMultiple<string>;
  weight?: string;
}
