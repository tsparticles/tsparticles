import type { IEmitterShapeGenerator } from "./IEmitterShapeGenerator.js";
import type { InteractivityPluginManager } from "@tsparticles/plugin-interactivity";
import type { ShapeManager } from "./ShapeManager.js";

export type EmittersPluginManager = InteractivityPluginManager & {
  addEmitterShapeGenerator?: (name: string, shape: IEmitterShapeGenerator) => void;
  emitterShapeManager?: ShapeManager;
};
