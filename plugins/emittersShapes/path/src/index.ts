import { type EmittersEngine, ensureEmittersPluginLoaded } from "@tsparticles/plugin-emitters";
import { type Engine, addErrorMessages } from "@tsparticles/engine";
import { EmittersPathShapeGenerator } from "./EmittersPathShapeGenerator.js";
import { ErrorMessages } from "./ErrorMessages.js";

declare const __VERSION__: string,
  process:
    | {
        env: {
          NODE_ENV?: string;
        };
      }
    | undefined;

/**
 *
 * @param engine - The engine to load the shape in
 */
export async function loadEmittersShapePath(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  if (typeof process !== "undefined" && process.env.NODE_ENV !== "production") {
    addErrorMessages(ErrorMessages);
  }

  await engine.pluginManager.register((e: EmittersEngine) => {
    ensureEmittersPluginLoaded(e);

    e.pluginManager.addEmitterShapeGenerator?.("path", new EmittersPathShapeGenerator());
  });
}
