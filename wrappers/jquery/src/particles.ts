import { type Container, type Engine, type ISourceOptions } from "@tsparticles/engine";

export type ParticlesPluginRegistrar = (engine: Engine) => Promise<void> | void;

type InitializationState = {
  loaded: boolean;
  started: boolean;
  promise: Promise<void>;
  resolve: () => void;
  reject: (error: unknown) => void;
};

const states = new WeakMap<Engine, InitializationState>();

function getInitializationState(engine: Engine): InitializationState {
  const existing = states.get(engine);
  if (existing) {
    return existing;
  }
  let resolve = (): void => {},
    reject: (error: unknown) => void = () => {};
  const promise = new Promise<void>((onResolve, onReject) => {
    resolve = onResolve;
    reject = onReject;
  });
  const state = { loaded: false, started: false, promise, resolve, reject };
  states.set(engine, state);
  return state;
}

export async function initParticlesEngine(engine: Engine, init?: ParticlesPluginRegistrar): Promise<void> {
  const state = getInitializationState(engine);
  if (!state.started) {
    state.started = true;
    void Promise.resolve()
      .then(async () => {
        await init?.(engine);
        await engine.init();
        state.loaded = true;
        state.resolve();
      })
      .catch((error: unknown) => {
        states.delete(engine);
        state.reject(error);
      });
  }
  return state.promise;
}

export function isParticlesEngineInitialized(engine: Engine): boolean {
  return states.get(engine)?.loaded ?? false;
}

export async function waitForParticlesEngineInitialization(engine: Engine): Promise<void> {
  await getInitializationState(engine).promise;
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
    particles: (engine: Engine) => StaticParticlesResult;
  }

  interface JQuery {
    /**
     * Extension of the example plugin.
     */
    particles: (engine: Engine) => ParticlesResult;
  }
}

$.fn.particles = function (engine: Engine): ParticlesResult {
  const load = (options: IParticlesProps): Promise<Container | undefined> => {
    const promises: Promise<Container | undefined>[] = [];

    this.each((index, element) => {
      const p = (async () => {
        await waitForParticlesEngineInitialization(engine);

        if (!isParticlesEngineInitialized(engine)) {
          throw new Error("$.particles.init(...) must be called once before rendering jQuery particles.");
        }

        const container = await engine.load({ element, options });

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
      const p = (async () => {
        await waitForParticlesEngineInitialization(engine);

        if (!isParticlesEngineInitialized(engine)) {
          throw new Error("$.particles.init(...) must be called once before rendering jQuery particles.");
        }

        const container = await engine.load({ element, url: jsonUrl });

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

$.particles = function (engine: Engine): StaticParticlesResult {
  // $.particles().init(callback?) initializes the engine; callback is the
  // plugin registrar that receives the engine object and can register plugins.
  const init = (init?: ParticlesPluginRegistrar) => initParticlesEngine(engine, init);

  return { init };
};
