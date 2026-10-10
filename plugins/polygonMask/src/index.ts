import { type Engine, addErrorMessages } from "@tsparticles/engine";
import { ErrorMessages } from "./ErrorMessages.js";
import { PolygonMaskPlugin } from "./PolygonMaskPlugin.js";

declare const __VERSION__: string,
  process:
    | {
        env: {
          NODE_ENV?: string;
        };
      }
    | undefined;

/**
 * @param engine - The engine to add the plugin to
 */
export async function loadPolygonMaskPlugin(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  if (typeof process !== "undefined" && process.env.NODE_ENV !== "production") {
    addErrorMessages(ErrorMessages);
  }

  await engine.pluginManager.register(e => {
    e.pluginManager.addPlugin(new PolygonMaskPlugin(e.pluginManager));
  });
}

export * from "./Enums/PolygonMaskInlineArrangement.js";
export * from "./Enums/PolygonMaskMoveType.js";
export * from "./Enums/PolygonMaskType.js";
