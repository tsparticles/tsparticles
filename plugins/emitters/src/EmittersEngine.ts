import type { Engine } from "@tsparticles/engine";
import type { IEmitterShapeGenerator } from "./IEmitterShapeGenerator.js";
import type { ShapeManager } from "./ShapeManager.js";

export type EmittersEngine = Engine & {
    addEmitterShapeGenerator?: (name: string, shape: IEmitterShapeGenerator) => void;
    emitterShapeManager?: ShapeManager;
};
