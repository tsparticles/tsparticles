import type { IEmitterShapeReplace } from "./IEmitterShapeReplace.js";

export interface IEmitterShape {
    options: Record<string, unknown>;
    replace: IEmitterShapeReplace;
    type: string;
}
