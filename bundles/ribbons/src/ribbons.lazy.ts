import { type Container, type Engine, type RecursivePartial, isString, tsParticles } from "@tsparticles/engine/lazy";
import type { RibbonsFirstParam, RibbonsFunc } from "./types.js";
import type { IRibbonsOptions } from "./IRibbonsOptions.js";
import { setRibbons } from "./utils.js";

declare const __VERSION__: string;

declare global {
  /** The global ribbons function */
  var ribbons: RibbonsFunc & {
    /** Creates a ribbons animation bound to a specific canvas */
    create: (canvas?: HTMLCanvasElement | null, options?: RecursivePartial<IRibbonsOptions>) => Promise<RibbonsFunc>;

    /** Initializes the ribbons plugins */
    init: () => Promise<void>;

    /** The ribbons bundle version */
    version: string;
  };
}

let initPromise: Promise<void> | null = null;

/**
 * Initializes all required plugins for the ribbons bundle
 * @param engine - The engine to register plugins with
 * @returns the init plugins promise
 * @internal
 */
async function doInitPlugins(engine: Engine): Promise<void> {
  engine.checkVersion(__VERSION__);

  await engine.pluginManager.register(async e => {
    const [
        { loadBasic },
        { loadEmittersPluginSimple },
        { loadEmittersShapeSquare },
        { loadMotionPlugin },
        { loadRibbonShape },
        { loadLifeUpdater },
      ] = await Promise.all([
        import("@tsparticles/basic/lazy"),
        import("@tsparticles/plugin-emitters/plugin/lazy"),
        import("@tsparticles/plugin-emitters-shape-square/lazy"),
        import("@tsparticles/plugin-motion/lazy"),
        import("@tsparticles/shape-ribbon/lazy"),
        import("@tsparticles/updater-life/lazy"),
      ]),
      emittersRegister = async (engine: Engine): Promise<void> => {
        await loadEmittersPluginSimple(engine);

        await loadEmittersShapeSquare(engine);
      };

    await Promise.all([
      loadBasic(e),
      loadMotionPlugin(e),
      emittersRegister(e),
      loadRibbonShape(e),
      loadLifeUpdater(e),
    ]);
  });
}

/**
 * This function prepares all the plugins needed by the ribbons bundle
 * @param engine - The engine to load the shape in
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
 * @param ribbonsOptions - the animation configuration object, this parameter is mandatory only if providing an id
 * @returns the container of the animation, or undefined if no canvas was found
 */
export async function ribbons(
  idOrOptions?: RibbonsFirstParam,
  ribbonsOptions?: RecursivePartial<IRibbonsOptions>,
): Promise<Container | undefined> {
  await initPlugins(tsParticles);

  let options: RecursivePartial<IRibbonsOptions>, id: string;

  if (isString(idOrOptions)) {
    id = idOrOptions;
    options = ribbonsOptions ?? {};
  } else {
    id = "ribbons";
    options = idOrOptions ?? {};
  }

  return setRibbons(tsParticles, {
    id,
    options,
  });
}

/**
 *
 * @param canvas - The canvas
 * @param options - The options to handle
 * @returns the ribbons function to use for the given canvas animations
 */
ribbons.create = async (
  canvas?: HTMLCanvasElement | null,
  options: RecursivePartial<IRibbonsOptions> = {},
): Promise<RibbonsFunc> => {
  await initPlugins(tsParticles);

  const id = canvas?.getAttribute("id") ?? "ribbons";

  canvas?.setAttribute("id", id);

  await setRibbons(tsParticles, {
    id,
    canvas: canvas ?? undefined,
    options,
  });

  return async (
    idOrOptions?: RibbonsFirstParam,
    subRibbonsOptions?: RecursivePartial<IRibbonsOptions>,
  ): Promise<Container | undefined> => {
    let subOptions: RecursivePartial<IRibbonsOptions>, subId: string;

    if (isString(idOrOptions)) {
      subId = idOrOptions;
      subOptions = subRibbonsOptions ?? options;
    } else {
      subId = id;
      subOptions = idOrOptions ?? {};
    }

    return setRibbons(tsParticles, {
      id: subId,
      canvas: canvas ?? undefined,
      options: subOptions,
    });
  };
};

/** Initializes the ribbons plugins without creating an animation */
ribbons.init = async (): Promise<void> => {
  await initPlugins(tsParticles);
};

/** The ribbons bundle version */
ribbons.version = __VERSION__;

globalThis.ribbons = ribbons;
