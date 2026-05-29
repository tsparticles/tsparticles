import { type Container, type Engine, type ISourceOptions } from "@tsparticles/engine";
import type { EmitterContainer } from "@tsparticles/plugin-emitters";
import { RibbonsOptions } from "./RibbonsOptions.js";
import type { RibbonsParams } from "./RibbonsParams.js";

const sizeFactor = 8,
  emitterTop = 0,
  ids = new Map<string, Container | Promise<Container | undefined> | undefined>();

/**
 * Adds an emitter to the container for ribbon particles
 * @param container -
 * @param actualOptions -
 */
export async function addEmitter(container: EmitterContainer, actualOptions: RibbonsOptions): Promise<void> {
  await container.addEmitter?.({
    startCount: actualOptions.count,
    position: {
      x: actualOptions.position.x,
      y: emitterTop,
    },
    shape: {
      type: "square",
    },
    size: {
      width: actualOptions.emitterSize.width,
      height: actualOptions.emitterSize.height,
    },
    rate: {
      delay: 0,
      quantity: 0,
    },
    life: {
      duration: 0.1,
      count: 1,
    },
    particles: {
      paint: {
        fill: {
          color: {
            value: actualOptions.colors,
          },
          enable: true,
        },
      },
      shape: {
        type: "ribbon",
        options: {
          ribbon: actualOptions.ribbonOptions,
        },
      },
      life: {
        count: 1,
      },
      size: {
        value: sizeFactor * actualOptions.scalar,
      },
      move: {
        direction: "bottom",
        enable: true,
        outModes: {
          top: "none",
          default: "destroy",
        },
        speed: {
          min: 4,
          max: 6,
        },
      },
      roll: {
        enable: false,
      },
      rotate: {
        value: 0,
        move: false,
        animation: {
          enable: false,
        },
      },
      tilt: {
        enable: false,
      },
      wobble: {
        enable: false,
      },
    },
  });
}

/**
 * Converts ribbons options to tsParticles source options
 * @param actualOptions -
 * @param params -
 * @returns the converted options
 */
export function convertOptions(actualOptions: RibbonsOptions, params: RibbonsParams): ISourceOptions {
  return {
    fullScreen: {
      enable: !params.canvas,
      zIndex: actualOptions.zIndex,
    },
    fpsLimit: 120,
    particles: {
      number: {
        value: 0,
      },
      paint: {
        fill: {
          color: {
            value: actualOptions.colors,
          },
          enable: true,
        },
      },
      shape: {
        type: "ribbon",
        options: {
          ribbon: actualOptions.ribbonOptions,
        },
      },
      size: {
        value: sizeFactor * actualOptions.scalar,
      },
      links: {
        enable: false,
      },
      life: {
        count: 1,
      },
      move: {
        direction: "bottom",
        enable: true,
        outModes: {
          top: "none",
          default: "destroy",
        },
        speed: {
          min: 4,
          max: 6,
        },
      },
      roll: {
        enable: false,
      },
      rotate: {
        value: 0,
        move: false,
        animation: {
          enable: false,
        },
      },
      tilt: {
        enable: false,
      },
      wobble: {
        enable: false,
      },
    },
    motion: {
      disable: actualOptions.disableForReducedMotion,
    },
    emitters: {
      name: "ribbons",
      startCount: actualOptions.count,
      position: {
        x: actualOptions.position.x,
        y: emitterTop,
      },
      shape: {
        type: "square",
      },
      size: {
        width: actualOptions.emitterSize.width,
        height: actualOptions.emitterSize.height,
      },
      rate: {
        delay: 0,
        quantity: 0,
      },
      life: {
        duration: 0.1,
        count: 1,
      },
    },
  };
}

/**
 * @param engine - the engine object
 * @param params - the parameters object used for the ribbons animation
 * @returns the tsParticles Container for more customizations
 */
export async function setRibbons(engine: Engine, params: RibbonsParams): Promise<Container | undefined> {
  const actualOptions = new RibbonsOptions();

  actualOptions.load(params.options);

  let containerOrPromise = ids.get(params.id);

  if (containerOrPromise instanceof Promise) {
    await containerOrPromise;
    containerOrPromise = ids.get(params.id);
  }

  const container = containerOrPromise as Container | undefined;

  if (container && !container.destroyed) {
    const alias = container as EmitterContainer;

    if ("addEmitter" in alias) {
      await addEmitter(alias, actualOptions);

      return container;
    }
  }

  const create = async (): Promise<Container | undefined> => {
      const particlesOptions = convertOptions(actualOptions, params),
        newContainer = await engine.load({
          id: params.id,
          element: params.canvas,
          options: particlesOptions,
        });

      ids.set(params.id, newContainer);

      return newContainer;
    },
    createPromise = create();

  ids.set(params.id, createPromise);

  return createPromise;
}
