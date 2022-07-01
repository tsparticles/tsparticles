import type { Engine } from "tsparticles-engine";
import type { IEmitterShape } from "./IEmitterShape";
import type { ShapeManager } from "./ShapeManager";

export type EmittersEngine = Engine & {
    addEmitterShape?: (name: string, shape: IEmitterShape) => void;
    emitterShapeManager?: ShapeManager;
};
