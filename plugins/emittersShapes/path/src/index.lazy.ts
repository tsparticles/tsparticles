import { type Engine, addErrorMessages } from "@tsparticles/engine/lazy";
import type { EmittersEngine } from "@tsparticles/plugin-emitters/lazy";
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
 * @param engine - The engine to load the shape in
 */
export async function loadEmittersShapePath(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  if (typeof process !== "undefined" && process.env.NODE_ENV !== "production") {
    addErrorMessages(ErrorMessages);
  }

  await engine.pluginManager.register(async (e: EmittersEngine) => {
    const { ensureEmittersPluginLoaded } = await import("@tsparticles/plugin-emitters/lazy");

    ensureEmittersPluginLoaded(e);

    const { EmittersPathShapeGenerator } = await import("./EmittersPathShapeGenerator.js");

    e.pluginManager.addEmitterShapeGenerator?.("path", new EmittersPathShapeGenerator());
  });
}
