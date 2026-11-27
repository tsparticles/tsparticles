import { type Engine, type RecursivePartial, isString } from "@tsparticles/engine/lazy";
import type { FireworksApi } from "./types.js";
import type { FireworksInstance } from "./FireworksInstance.js";
import type { IFireworkOptions } from "./IFireworkOptions.js";
import { getFireworksInstance } from "./utils.js";

declare const __VERSION__: string;

/** Creates an animation API bound to the supplied engine.
 * @param tsParticles - the application-owned engine
 * @returns the animation API
 */
export function createFireworks(tsParticles: Engine): FireworksApi {
  let initPromise: Promise<void> | null = null;

  /**
   * Initializes all required plugins for the fireworks bundle
   * @param engine - the engine to use for loading all plugins
   * @returns the promise of initialization
   * @internal
   */
  async function doInitPlugins(engine: Engine): Promise<void> {
    engine.checkVersion(__VERSION__);

    await engine.pluginManager.register(async e => {
      const [
          { loadBasic },
          { loadLineShape },
          { loadBlendPlugin },
          { loadEmittersPluginSimple },
          { loadEmittersShapeSquare },
          { loadSoundsPlugin },
          { loadRotateUpdater },
          { loadDestroyUpdater },
          { loadLifeUpdater },
          { loadPaintUpdater },
        ] = await Promise.all([
          import("@tsparticles/basic/lazy"),
          import("@tsparticles/shape-line"),
          import("@tsparticles/plugin-blend"),
          import("@tsparticles/plugin-emitters/plugin"),
          import("@tsparticles/plugin-emitters-shape-square"),
          import("@tsparticles/plugin-sounds"),
          import("@tsparticles/updater-rotate/lazy"),
          import("@tsparticles/updater-destroy/lazy"),
          import("@tsparticles/updater-life/lazy"),
          import("@tsparticles/updater-paint/lazy"),
        ]),
        loadEmittersForFireworks = async (e: Engine): Promise<void> => {
          await loadEmittersPluginSimple(e);

          await loadEmittersShapeSquare(e);
        };

      await Promise.all([
        loadBasic(e),
        loadLineShape(e),
        loadBlendPlugin(e),
        loadEmittersForFireworks(e),
        loadSoundsPlugin(e),
        loadRotateUpdater(e),
        loadDestroyUpdater(e),
        loadLifeUpdater(e),
        loadPaintUpdater(e),
      ]);
    });
  }

  /**
   * @param engine - the engine to use for loading all plugins
   * @returns the promise of initialization
   * @internal
   */
  async function initPlugins(engine: Engine): Promise<void> {
    if (initPromise) {
      return initPromise;
    }

    initPromise = doInitPlugins(engine).catch((error: unknown) => {
      initPromise = null;
      throw error;
    });

    return initPromise;
  }

  /**
   * @param idOrOptions - the id used for displaying the animation, or the animation configuration if an id is not necessary
   * @param sourceOptions - the animation configuration if an id is provided
   * @returns the loaded instance
   */
  async function fireworks(
    idOrOptions?: string | RecursivePartial<IFireworkOptions>,
    sourceOptions?: RecursivePartial<IFireworkOptions>,
  ): Promise<FireworksInstance | undefined> {
    await initPlugins(tsParticles);

    let id: string, options: RecursivePartial<IFireworkOptions>;

    if (isString(idOrOptions)) {
      id = idOrOptions;
      options = sourceOptions ?? {};
    } else {
      id = "fireworks";
      options = idOrOptions ?? {};
    }

    return getFireworksInstance(tsParticles, id, options);
  }

  /**
   * Creates a fireworks animation on the given canvas
   * @param canvas - The canvas
   * @param options - The options to handle
   * @returns A promise
   */
  fireworks.create = async (
    canvas?: HTMLCanvasElement | null,
    options?: RecursivePartial<IFireworkOptions>,
  ): Promise<FireworksInstance | undefined> => {
    await initPlugins(tsParticles);

    const id = canvas?.id ?? "fireworks";

    return getFireworksInstance(tsParticles, id, options ?? {}, canvas ?? undefined);
  };

  /** Initializes the fireworks plugins without creating an animation */
  fireworks.init = async (): Promise<void> => {
    await initPlugins(tsParticles);
  };

  /** The fireworks bundle version */
  fireworks.version = __VERSION__;

  return fireworks;
}
