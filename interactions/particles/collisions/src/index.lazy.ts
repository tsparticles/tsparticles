import { type Engine, addErrorMessages } from "@tsparticles/engine/lazy";
import { ErrorMessages } from "./ErrorMessages.js";
import type { InteractivityEngine } from "@tsparticles/plugin-interactivity/lazy";

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

  await engine.pluginManager.register(async (e: InteractivityEngine) => {
    const [
      { ensureInteractivityPluginLoaded },
      { OverlapPlugin },
    ] = await Promise.all([
      import("@tsparticles/plugin-interactivity/lazy"),
      import("./OverlapPlugin.js"),
    ]);

    ensureInteractivityPluginLoaded(e);

    e.pluginManager.addPlugin(new OverlapPlugin());

    e.pluginManager.addInteractor?.("particlesCollisions", async container => {
      const { Collider } = await import("./Collider.js");

      return new Collider(container);
    });
  });
}
