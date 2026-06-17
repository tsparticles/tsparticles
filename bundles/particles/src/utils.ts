import type { Engine, ISourceOptions, RecursivePartial } from "@tsparticles/engine";
import type { IParticlesOptions } from "./IParticlesOptions.js";
import type { ParticlesInstance } from "./ParticlesInstance.js";

const instances = new Map<string, ParticlesInstance | Promise<ParticlesInstance | undefined>>();

/**
 * @param id
 * @internal
 */
export function deleteParticlesInstance(id: string): void {
  instances.delete(id);
}

const defaultCount = 80,
  defaultLinksWidth = 100,
  defaultSpeed = 3,
  defaultOpacity = 1,
  defaultRadius = 3;

/**
 * Creates engine source options from high-level particles options.
 * @param options - Public particles options used to build engine options.
 * @param canvas - The custom canvas element to use, if present. If set, fullScreen will be disabled.
 * @returns The normalized source options for engine.load.
 */
function getDefaultOptions(options: RecursivePartial<IParticlesOptions>, canvas?: HTMLCanvasElement): ISourceOptions {
  return {
    fullScreen: {
      enable: !canvas,
    },
    particles: {
      number: {
        value: options.count ?? defaultCount,
      },
      color: {
        value: options.color ?? "#fff",
      },
      links: {
        enable: options.links ?? false,
        color: options.linksColor ?? "#fff",
        distance: options.linksLength ?? defaultLinksWidth,
      },
      collisions: {
        enable: options.collisions ?? false,
      },
      move: {
        enable: true,
        speed: options.speed ?? defaultSpeed,
      },
      opacity: {
        value: options.opacity ?? defaultOpacity,
      },
      shape: {
        type: options.shape ?? "circle",
      },
      size: {
        value: options.radius ?? defaultRadius,
      },
    },
  };
}

/**
 * Gets or creates a cached particles instance.
 * @param engine - Engine instance used to load the container.
 * @param id - Unique instance id used as cache key.
 * @param sourceOptions - User options for particles initialization.
 * @param canvas - Optional target canvas element.
 * @returns The cached or newly created particles instance.
 */
export async function getParticlesInstance(
  engine: Engine,
  id: string,
  sourceOptions: RecursivePartial<IParticlesOptions>,
  canvas?: HTMLCanvasElement,
): Promise<ParticlesInstance | undefined> {
  const existing = instances.get(id);

  if (existing instanceof Promise) {
    return existing;
  }

  if (existing) {
    if (!existing.destroyed) {
      return existing;
    }

    instances.delete(id);
  }

  const create = async (): Promise<ParticlesInstance | undefined> => {
      const particlesOptions = getDefaultOptions(sourceOptions, canvas),
        container = await engine.load({ id, element: canvas, options: particlesOptions });

      if (!container) {
        instances.delete(id);

        return;
      }

      const { ParticlesInstance } = await import("./ParticlesInstance.js"),
        instance = new ParticlesInstance(container, id);

      instances.set(id, instance);

      return instance;
    },
    createPromise = create();

  instances.set(id, createPromise);

  return createPromise;
}
