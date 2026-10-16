import { type Engine, addErrorMessages } from "@tsparticles/engine";
import { type InteractivityEngine, ensureInteractivityPluginLoaded } from "@tsparticles/plugin-interactivity";
import { Collider } from "./Collider.js";
import { ErrorMessages } from "./ErrorMessages.js";
import { OverlapPlugin } from "./OverlapPlugin.js";

declare const __VERSION__: string,
  process:
    | {
        env: {
          NODE_ENV?: string;
        };
      }
    | undefined;

/**
 * @param engine - The engine to use for the interaction
 */
export async function loadParticlesCollisionsInteraction(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  if (typeof process !== "undefined" && process.env.NODE_ENV !== "production") {
    addErrorMessages(ErrorMessages);
  }

  await engine.pluginManager.register((e: InteractivityEngine) => {
    ensureInteractivityPluginLoaded(e);

    e.pluginManager.addPlugin(new OverlapPlugin());

    e.pluginManager.addInteractor?.("particlesCollisions", container => {
      return Promise.resolve(new Collider(container));
    });
  });
}
