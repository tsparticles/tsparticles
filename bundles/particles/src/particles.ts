import { type Engine, type RecursivePartial, isString, tsParticles } from "@tsparticles/engine";
import type { IParticlesOptions } from "./IParticlesOptions.js";
import type { ParticlesFunc } from "./types.js";
import type { ParticlesInstance } from "./ParticlesInstance.js";
import { getParticlesInstance } from "./utils.js";
import { loadBasic } from "@tsparticles/basic";
import { loadInteractivityPlugin } from "@tsparticles/plugin-interactivity";
import { loadParticlesCollisionsInteraction } from "@tsparticles/interaction-particles-collisions";
import { loadParticlesLinksInteraction } from "@tsparticles/interaction-particles-links";

declare const __VERSION__: string;

let initPromise: Promise<void> | null = null;

declare global {
  /** The global particles function */
  var particles: ParticlesFunc & {
    /** Creates a particles animation bound to a specific canvas */
    create: (
      canvas?: HTMLCanvasElement | null,
      options?: RecursivePartial<IParticlesOptions>,
    ) => Promise<ParticlesInstance | undefined>;
    /** Initializes the particles plugins */
    init: () => Promise<void>;
    /** The particles bundle version */
    version: string;
  };
}

/**
 * Initializes all required plugins for the particles bundle
 * @param engine - The engine to register plugins with
 */
async function doInitPlugins(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(async e => {
    const loadParticlesInteractivity = async (e: Engine): Promise<void> => {
      await loadInteractivityPlugin(e);

      await Promise.all([
        loadParticlesCollisionsInteraction(e),
        loadParticlesLinksInteraction(e),
      ]);
    };

    await Promise.all([
      loadBasic(e),
      loadParticlesInteractivity(e),
    ]);
  });
}

/**
 * Ensures plugins are initialized only once
 * @param engine - The engine to register plugins with
 * @returns The initialization promise
 */
async function initPlugins(engine: Engine): Promise<void> {
  if (initPromise) {
    return initPromise;
  }

  initPromise = doInitPlugins(engine);

  return initPromise;
}

/**
 * Creates a particles animation
 * @param idOrOptions - The id or options for the animation
 * @param sourceOptions - The animation options when providing an id
 * @returns The particles instance
 */
export async function particles(
  idOrOptions?: string | RecursivePartial<IParticlesOptions>,
  sourceOptions?: RecursivePartial<IParticlesOptions>,
): Promise<ParticlesInstance | undefined> {
  await initPlugins(tsParticles);

  let id: string, options: RecursivePartial<IParticlesOptions>;

  if (isString(idOrOptions)) {
    id = idOrOptions;
    options = sourceOptions ?? {};
  } else {
    id = "particles";
    options = idOrOptions ?? {};
  }

  return getParticlesInstance(tsParticles, id, options);
}

/**
 * Creates a particles animation on the given canvas
 * @param canvas
 * @param options
 */
particles.create = async (
  canvas?: HTMLCanvasElement | null,
  options?: RecursivePartial<IParticlesOptions>,
): Promise<ParticlesInstance | undefined> => {
  await initPlugins(tsParticles);

  const id = canvas?.id ?? "particles";

  return getParticlesInstance(tsParticles, id, options ?? {}, canvas ?? undefined);
};

/** Initializes the particles plugins without creating an animation */
particles.init = async (): Promise<void> => {
  await initPlugins(tsParticles);
};

/** The particles bundle version */
particles.version = __VERSION__;

globalThis.particles = particles;
