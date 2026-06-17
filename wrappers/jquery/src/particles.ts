import { type Container, getRandom, type ISourceOptions, tsParticles } from "@tsparticles/engine";

export type ParticlesPluginRegistrar = (engine: typeof tsParticles) => Promise<void> | void;

let initialized = false;
let initPromise: Promise<void> | undefined;
let initCallback: ParticlesPluginRegistrar | undefined;

async function initParticlesEngine(init?: ParticlesPluginRegistrar): Promise<void> {
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

    await tsParticles.init();

    initialized = true;
  })().catch((error: unknown) => {
    initPromise = undefined;
    initCallback = undefined;
    initialized = false;

    throw error;
  });

  await initPromise;
}

function isParticlesEngineInitialized(): boolean {
  return initialized;
}

async function waitForParticlesEngineInitialization(): Promise<void> {
  await (initPromise ?? Promise.resolve());
}

const containers = new WeakMap<Element, Container>();

/**
 * Extend the jQuery result declaration with the example plugin.
 */
type ParticlesResult = {
  load: (options: ISourceOptions) => Promise<Container | undefined>;
  ajax: (jsonUrl: string) => Promise<Container | undefined>;
  setTheme: (theme: string) => Promise<void>;
};

type StaticParticlesResult = {
  init: (init?: ParticlesPluginRegistrar) => Promise<void>;
};

export type IParticlesProps = ISourceOptions;

declare global {
  interface JQueryStatic {
    /**
     * Extension of the example plugin.
     */
    particles: () => StaticParticlesResult;
  }

  interface JQuery {
    /**
     * Extension of the example plugin.
     */
    particles: () => ParticlesResult;
  }
}

$.fn.particles = function (): ParticlesResult {
  const baseId = "tsparticles";

  const load = (options: IParticlesProps): Promise<Container | undefined> => {
    const promises: Promise<Container | undefined>[] = [];

    this.each((index, element) => {
      if (element.id === undefined) {
        element.id = baseId + Math.floor(getRandom() * 1000);
      }

      const p = (async () => {
        // If the wrapper hasn't been initialized yet, attempt a safe
        // default initialization (no registrar). This avoids throwing
        // when consumers forget to call $.particles.init(...) while
        // preserving the ability for apps to call init explicitly.
        if (!initPromise) {
          // start initialization (will set initPromise)
          initParticlesEngine();
        }

        await waitForParticlesEngineInitialization();

        if (!isParticlesEngineInitialized()) {
          throw new Error("$.particles.init(...) must be called once before rendering jQuery particles.");
        }

        const container = await tsParticles.load({ id: element.id, options });

        if (container) {
          containers.set(element, container);
        }

        return container;
      })();

      promises.push(p);
    });

    return Promise.all(promises).then(list => (list.length > 0 ? list[0] : undefined));
  };

  const ajax = (jsonUrl: string): Promise<Container | undefined> => {
    const promises: Promise<Container | undefined>[] = [];

    this.each((index, element) => {
      if (element.id === undefined) {
        element.id = baseId + Math.floor(getRandom() * 1000);
      }

      const p = (async () => {
        await waitForParticlesEngineInitialization();

        if (!isParticlesEngineInitialized()) {
          throw new Error("$.particles.init(...) must be called once before rendering jQuery particles.");
        }

        const container = await tsParticles.load({ id: element.id, url: jsonUrl });

        if (container) {
          containers.set(element, container);
        }

        return container;
      })();

      promises.push(p);
    });

    return Promise.all(promises).then(list => (list.length > 0 ? list[0] : undefined));
  };

  const setTheme = async (theme: string): Promise<void> => {
    for (const element of this) {
      const container = containers.get(element);

      if (container) {
        await (container as unknown as { loadTheme?: (name?: string) => Promise<void> }).loadTheme?.(theme);
      }
    }
  };

  return { load, ajax, setTheme };
};

$.particles = function (): StaticParticlesResult {
  // $.particles().init(callback?) initializes the engine; callback is the
  // plugin registrar that receives the engine object and can register plugins.
  const init = (init?: ParticlesPluginRegistrar) => initParticlesEngine(init);

  return { init };
};
