import {
  type CustomEventArgs,
  DestroyType,
  type Engine,
  EventType,
  type ISourceOptions,
  MoveDirection,
  OutMode,
  type Particle,
  type RecursivePartial,
  StartValueType,
  getRangeMax,
  getRangeMin,
  isNumber,
  isString,
  setRangeValue,
  tsParticles,
} from "@tsparticles/engine";
import { FireworkOptions } from "./FireworkOptions.js";
import type { FireworksInstance } from "./FireworksInstance.js";
import type { IFireworkOptions } from "./IFireworkOptions.js";

declare const __VERSION__: string;

let initialized = false,
  initializing = false;

type FireworksFunc = ((
  idOrOptions: string | RecursivePartial<IFireworkOptions>,
  sourceOptions?: RecursivePartial<IFireworkOptions>,
) => Promise<FireworksInstance | undefined>) & {
  version: string;
};

declare global {
  var fireworks: FireworksFunc & {
    create: (
      canvas: HTMLCanvasElement,
      options: RecursivePartial<IFireworkOptions>,
    ) => Promise<FireworksInstance | undefined>;
    init: () => Promise<void>;
    version: string;
  };
}

const explodeSoundCheck = (args: CustomEventArgs): boolean => {
  const data = args.data as { particle?: Particle } | undefined;

  return data?.particle?.options.move.gravity.enable ?? false;
};

/**
 * @param engine - the engine to use for loading all plugins
 */
async function initPlugins(engine: Engine): Promise<void> {
  if (initialized) {
    return;
  }

  if (initializing) {
    return new Promise<void>(resolve => {
      const timeout = 100,
        interval = setInterval(() => {
          if (!initialized) {
            return;
          }

          clearInterval(interval);
          resolve();
        }, timeout);
    });
  }

  initializing = true;

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
      import("@tsparticles/basic"),
      import("@tsparticles/shape-line"),
      import("@tsparticles/plugin-blend"),
      import("@tsparticles/plugin-emitters/plugin"),
      import("@tsparticles/plugin-emitters-shape-square"),
      import("@tsparticles/plugin-sounds"),
      import("@tsparticles/updater-rotate"),
      import("@tsparticles/updater-destroy"),
      import("@tsparticles/updater-life"),
      import("@tsparticles/updater-paint"),
    ]);

    await Promise.all([
      loadBasic(e),
      loadLineShape(e),
      loadBlendPlugin(e),
      (async (): Promise<void> => {
        await loadEmittersPluginSimple(e);

        await loadEmittersShapeSquare(e);
      })(),
      loadSoundsPlugin(e),
      loadRotateUpdater(e),
      loadDestroyUpdater(e),
      loadLifeUpdater(e),
      loadPaintUpdater(e),
    ]);
  });

  initializing = false;
  initialized = true;
}

/**
 *
 * @param options -
 * @param canvas -
 * @returns the options for the tsParticles instance
 */
function getOptions(options: IFireworkOptions, canvas?: HTMLCanvasElement): ISourceOptions {
  const identity = 1;

  return {
    detectRetina: true,
    background: {
      color: options.background,
    },
    blend: {
      enable: true,
      mode: "lighter",
    },
    fullScreen: {
      enable: !canvas,
    },
    fpsLimit: 60,
    emitters: {
      direction: MoveDirection.top,
      life: {
        count: 0,
        duration: 0.1,
        delay: 0.1,
      },
      rate: {
        delay: isNumber(options.rate)
          ? identity / options.rate
          : { min: identity / getRangeMin(options.rate), max: identity / getRangeMax(options.rate) },
        quantity: 1,
      },
      size: {
        width: 100,
        height: 0,
      },
      position: {
        y: 100,
        x: 50,
      },
    },
    particles: {
      number: {
        value: 0,
      },
      paint: {
        stroke: {
          color: {
            value: options.colors,
          },
          width: 2,
        },
      },
      destroy: {
        mode: "split",
        bounds: {
          top: setRangeValue(options.minHeight),
        },
        split: {
          count: 1,
          factor: {
            value: 0.333333,
          },
          rate: {
            value: options.splitCount,
          },
          strokeColorOffset: {
            s: options.saturation,
            l: options.brightness,
          },
          particles: {
            group: "split",
            number: {
              value: 0,
            },
            opacity: {
              value: {
                min: 0.1,
                max: 1,
              },
              animation: {
                enable: true,
                speed: { min: 2, max: 4 },
                sync: true,
                startValue: StartValueType.max,
                destroy: DestroyType.min,
                count: 1,
              },
            },
            size: {
              value: { min: 5, max: 10 },
            },
            life: {
              count: 1,
              duration: {
                value: {
                  min: 0.5,
                  max: 1,
                },
              },
            },
            move: {
              decay: 0.05,
              enable: true,
              gravity: {
                enable: false,
              },
              speed: {
                min: 10,
                max: 25,
              },
              direction: "outside",
              outModes: OutMode.destroy,
            },
          },
        },
      },
      life: {
        count: 1,
      },
      shape: {
        type: "line",
        options: {
          line: {
            cap: "round",
          },
        },
      },
      size: {
        value: { min: 10, max: 20 },
      },
      rotate: {
        path: true,
      },
      move: {
        enable: true,
        gravity: {
          acceleration: setRangeValue(options.gravity),
          enable: true,
          inverse: true,
          maxSpeed: 150,
        },
        speed: setRangeValue(options.speed),
        outModes: {
          default: OutMode.destroy,
          top: OutMode.none,
        },
      },
    },
    sounds: {
      enable: options.sounds,
      events: [
        {
          event: EventType.particleRemoved,
          filter: explodeSoundCheck,
          audio: [
            "https://particles.js.org/audio/explosion0.mp3",
            "https://particles.js.org/audio/explosion1.mp3",
            "https://particles.js.org/audio/explosion2.mp3",
          ],
        },
      ],
      volume: 50,
    },
  };
}

/**
 *
 * @param id -
 * @param sourceOptions -
 * @param canvas -
 * @returns the loaded instance
 */
async function getFireworksInstance(
  id: string,
  sourceOptions: RecursivePartial<IFireworkOptions>,
  canvas?: HTMLCanvasElement,
): Promise<FireworksInstance | undefined> {
  await initPlugins(tsParticles);

  const options = new FireworkOptions();

  options.load(sourceOptions);

  const particlesOptions = getOptions(options, canvas),
    container = await tsParticles.load({ id, element: canvas, options: particlesOptions });

  if (!container) {
    return;
  }

  const { FireworksInstance } = await import("./FireworksInstance.js");

  return new FireworksInstance(container);
}

/**
 * @param idOrOptions - the id used for displaying the animation, or the animation configuration if an id is not necessary
 * @param sourceOptions - the animation configuration if an id is provided
 * @returns the loaded instance
 */
export async function fireworks(
  idOrOptions?: string | RecursivePartial<IFireworkOptions>,
  sourceOptions?: RecursivePartial<IFireworkOptions>,
): Promise<FireworksInstance | undefined> {
  let id: string, options: RecursivePartial<IFireworkOptions>;

  if (isString(idOrOptions)) {
    id = idOrOptions;
    options = sourceOptions ?? {};
  } else {
    id = "fireworks";
    options = idOrOptions ?? {};
  }

  return getFireworksInstance(id, options);
}

fireworks.create = async (
  canvas: HTMLCanvasElement,
  options?: RecursivePartial<IFireworkOptions>,
): Promise<FireworksInstance | undefined> => {
  const id = canvas.id || "fireworks";

  return getFireworksInstance(id, options ?? {}, canvas);
};

fireworks.init = async (): Promise<void> => {
  await initPlugins(tsParticles);
};

fireworks.version = __VERSION__;

globalThis.fireworks = fireworks;
