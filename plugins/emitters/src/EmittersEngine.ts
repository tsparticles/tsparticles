import type { Engine } from "@tsparticles/engine";
import type { IEmitterShape } from "./IEmitterShape.js";
import type { ShapeManager } from "./ShapeManager.js";

export type EmittersEngine = Engine & {
    addEmitterShape?: (name: string, shape: IEmitterShape) => void;
    emitterShapeManager?: ShapeManager;
};
