import type { ConfettiFirstParam, ConfettiFunc } from "./types.js";
import { type Container, type Engine, type RecursivePartial, isString, tsParticles } from "@tsparticles/engine";
import type { IConfettiOptions } from "./IConfettiOptions.js";
import { loadBasic } from "@tsparticles/basic";
import { loadCardSuitsShape } from "@tsparticles/shape-cards/suits";
import { loadEmittersPluginSimple } from "@tsparticles/plugin-emitters/plugin";
import { loadEmojiShape } from "@tsparticles/shape-emoji";
import { loadHeartShape } from "@tsparticles/shape-heart";
import { loadImageShape } from "@tsparticles/shape-image";
import { loadLifeUpdater } from "@tsparticles/updater-life";
import { loadMotionPlugin } from "@tsparticles/plugin-motion";
import { loadPolygonShape } from "@tsparticles/shape-polygon";
import { loadRollUpdater } from "@tsparticles/updater-roll";
import { loadRotateUpdater } from "@tsparticles/updater-rotate";
import { loadSquareShape } from "@tsparticles/shape-square";
import { loadStarShape } from "@tsparticles/shape-star";
import { loadTiltUpdater } from "@tsparticles/updater-tilt";
import { loadWobbleUpdater } from "@tsparticles/updater-wobble";
import { setConfetti } from "./utils.js";

declare const __VERSION__: string;

declare global {
  /** The global confetti function */
  var confetti: ConfettiFunc & {
    /** Creates a confetti animation bound to a specific canvas */
    create: (canvas?: HTMLCanvasElement | null, options?: RecursivePartial<IConfettiOptions>) => Promise<ConfettiFunc>;

    /** Initializes the confetti plugins */
    init: () => Promise<void>;

    /** The confetti bundle version */
    version: string;
  };
}

let initPromise: Promise<void> | null = null;

/**
 * Initializes all required plugins for the confetti bundle
 * @param engine - The engine to register plugins with
 * @returns the init plugins promise
 * @internal
 */
async function doInitPlugins(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(async e => {
    await Promise.all([
      loadBasic(e),
      loadMotionPlugin(e),
      loadEmittersPluginSimple(e),
      loadCardSuitsShape(e),
      loadHeartShape(e),
      loadImageShape(e),
      loadPolygonShape(e),
      loadSquareShape(e),
      loadStarShape(e),
      loadEmojiShape(e),

      loadRotateUpdater(e),
      loadLifeUpdater(e),
      loadRollUpdater(e),
      loadTiltUpdater(e),
      loadWobbleUpdater(e),
    ]);
  });
}

/**
 * This function prepares all the plugins needed by the confetti bundle
 * @param engine -
 * @returns the init plugins promise
 * @internal
 */
async function initPlugins(engine: Engine): Promise<void> {
  if (initPromise) {
    return initPromise;
  }

  initPromise = doInitPlugins(engine);

  return initPromise;
}

/**
 * @param idOrOptions - the id used for the canvas, or if not using two parameters, the animation configuration object
 * @param confettiOptions - the animation configuration object, this parameter is mandatory only if providing an id
 * @returns the container of the animation, or undefined if no canvas was found
 */
export async function confetti(
  idOrOptions: ConfettiFirstParam,
  confettiOptions?: RecursivePartial<IConfettiOptions>,
): Promise<Container | undefined> {
  await initPlugins(tsParticles);

  let options: RecursivePartial<IConfettiOptions>, id: string;

  if (isString(idOrOptions)) {
    id = idOrOptions;
    options = confettiOptions ?? {};
  } else {
    id = "confetti";
    options = idOrOptions;
  }

  return setConfetti(tsParticles, {
    id,
    options,
  });
}

/**
 *
 * @param canvas -
 * @param options -
 * @returns the confetti function to use for the given canvas animations
 */
confetti.create = async (
  canvas?: HTMLCanvasElement | null,
  options: RecursivePartial<IConfettiOptions> = {},
): Promise<ConfettiFunc> => {
  await initPlugins(tsParticles);

  const id = canvas?.getAttribute("id") ?? "confetti";

  canvas?.setAttribute("id", id);

  await setConfetti(tsParticles, {
    id,
    canvas: canvas ?? undefined,
    options,
  });

  return async (
    idOrOptions: ConfettiFirstParam,
    confettiOptions?: RecursivePartial<IConfettiOptions>,
  ): Promise<Container | undefined> => {
    let subOptions: RecursivePartial<IConfettiOptions>, subId: string;

    if (isString(idOrOptions)) {
      subId = idOrOptions;
      subOptions = confettiOptions ?? options;
    } else {
      subId = id;
      subOptions = idOrOptions;
    }

    return setConfetti(tsParticles, {
      id: subId,
      canvas: canvas ?? undefined,
      options: subOptions,
    });
  };
};

/** Initializes the confetti plugins without creating an animation */
confetti.init = async (): Promise<void> => {
  await initPlugins(tsParticles);
};

/** The confetti bundle version */
confetti.version = __VERSION__;

globalThis.confetti = confetti;
