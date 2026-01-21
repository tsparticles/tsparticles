import type { IEmitterShapeGenerator } from "./IEmitterShapeGenerator.js";
import type { InteractivityEngine } from "@tsparticles/plugin-interactivity";
import type { ShapeManager } from "./ShapeManager.js";

export type EmittersEngine = InteractivityEngine & {
    addEmitterShapeGenerator?: (name: string, shape: IEmitterShapeGenerator) => void;
    emitterShapeManager?: ShapeManager;
};
