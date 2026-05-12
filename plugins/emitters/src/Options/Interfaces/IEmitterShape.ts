import type { IEmitterShapeReplace } from "./IEmitterShapeReplace.js";

/** The emitter shape options */
export interface IEmitterShape {
  /** The emitter shape options */
  options: Record<string, unknown>;
  /** The emitter shape replace options */
  replace: IEmitterShapeReplace;
  /** The emitter shape type */
  type: string;
}
