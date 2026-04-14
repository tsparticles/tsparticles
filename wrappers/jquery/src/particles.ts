import { type Container, type ISourceOptions, getRandom, tsParticles } from "@tsparticles/engine";

export type ParticlesPluginRegistrar = (engine: typeof tsParticles) => Promise<void> | void;

let initialized = false;
let initPromise: Promise<void> | undefined;
let initCallback: ParticlesPluginRegistrar | undefined;

export async function initParticlesEngine(init?: ParticlesPluginRegistrar): Promise<void> {
  if (initialized) {
    return;
  }

  if (initPromise) {
    if (initCallback !== init) {
      throw new Error("initParticlesEngine callback must be stable across the app lifecycle.");
    }

    await initPromise;

    return;
  }

  initCallback = init;
  initPromise = (async () => {
    if (init) {
      await init(tsParticles);
    }

    initialized = true;
  })().catch((error: unknown) => {
    initPromise = undefined;
    initCallback = undefined;
    initialized = false;

    throw error;
  });

  await initPromise;
}

export function isParticlesEngineInitialized(): boolean {
  return initialized;
}

export async function waitForParticlesEngineInitialization(): Promise<void> {
  await (initPromise ?? Promise.resolve());
}

/**
 * Extend the jQuery result declaration with the example plugin.
 */
type ParticlesResult = {
  init: (options: ISourceOptions, callback: (container: Container | undefined) => Promise<void>) => void;
  ajax: (jsonUrl: string, callback: (container: Container | undefined) => Promise<void>) => void;
};

export type IParticlesProps = ISourceOptions;

declare global {
  interface JQuery {
    /**
     * Extension of the example plugin.
     */
    particles: () => ParticlesResult;
  }
}

$.fn.particles = function (): ParticlesResult {
  const baseId = "tsparticles";

  const init = (options: IParticlesProps, callback: (container: Container | undefined) => Promise<void>): void => {
    this.each((index, element) => {
      if (element.id === undefined) {
        element.id = baseId + Math.floor(getRandom() * 1000);
      }

      void (async () => {
        await waitForParticlesEngineInitialization();

        if (!isParticlesEngineInitialized()) {
          throw new Error("initParticlesEngine(...) must be called once before rendering jQuery particles.");
        }

        const container = await tsParticles.load({ id: element.id, options });

        await callback(container);
      })();
    });
  };

  const ajax = (jsonUrl: string, callback: (container: Container | undefined) => Promise<void>): void => {
    this.each((index, element) => {
      if (element.id === undefined) {
        element.id = baseId + Math.floor(getRandom() * 1000);
      }

      void (async () => {
        await waitForParticlesEngineInitialization();

        if (!isParticlesEngineInitialized()) {
          throw new Error("initParticlesEngine(...) must be called once before rendering jQuery particles.");
        }

        const container = await tsParticles.load({ id: element.id, url: jsonUrl });

        await callback(container);
      })();
    });
  };

  return { init, ajax };
};
