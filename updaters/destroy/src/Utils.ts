import {
  AnimatableColor,
  type Container,
  type IOklcha,
  type IParticlesOptions,
  type IRangeOklch,
  type OptionsColor,
  type Particle,
  PixelMode,
  type PluginManager,
  type RangeValue,
  type RecursivePartial,
  getRangeValue,
  identity,
  isNumber,
  itemFromSingleOrMultiple,
  loadParticlesOptions,
  randomInRangeValue,
  setRangeValue,
} from "@tsparticles/engine";
import type { DestroyParticle } from "./Types.js";

const defaultOffset = 0,
  minDestroySize = 0.5,
  defaultSplitCount = 0,
  increment = 1,
  unbreakableTime = 500,
  minSplitCount = 0,
  hueRange = 360,
  minLightness = 0,
  maxLightness = 100;

type SplitColorData = string | RecursivePartial<OptionsColor>;

/**
 * @param parentColor - The parentColor
 * @returns the parent color as AnimatableColor
 */
function createParentColor(parentColor: IOklcha): AnimatableColor {
  return AnimatableColor.create(undefined, {
    value: {
      oklch: parentColor,
    },
  });
}

/**
 * @param parentColor - The parentColor
 * @param offset - The offset
 * @returns the offset color as AnimatableColor
 */
function createOffsetColor(
  parentColor: IOklcha,
  offset: Partial<IRangeOklch>,
  random: () => number,
): AnimatableColor {
  const offsetH = getRangeValue(offset.h ?? defaultOffset, random),
    offsetC = getRangeValue(offset.c ?? defaultOffset, random),
    offsetL = getRangeValue(offset.l ?? defaultOffset, random),
    h = (((parentColor.h + offsetH) % hueRange) + hueRange) % hueRange,
    c = Math.max(defaultOffset, parentColor.c + offsetC),
    l = Math.max(minLightness, Math.min(maxLightness, parentColor.l + offsetL));

  return AnimatableColor.create(undefined, {
    value: {
      oklch: {
        h,
        c,
        l,
      },
    },
  });
}

/**
 * @param offset - The offset
 * @param splitColor - The splitColor
 * @param splitParticlesColor - The splitParticlesColor
 * @param parentColor - The parentColor
 * @returns the split color resolved using precedence rules
 */
function resolveSplitColor(
  offset: Partial<IRangeOklch> | undefined,
  splitColor: SplitColorData | undefined,
  splitParticlesColor: SplitColorData | undefined,
  parentColor: IOklcha | undefined,
  random: () => number,
): AnimatableColor | undefined {
  if (offset && parentColor) {
    return createOffsetColor(parentColor, offset, random);
  }

  if (splitColor) {
    return AnimatableColor.create(undefined, splitColor);
  }

  if (splitParticlesColor) {
    return AnimatableColor.create(undefined, splitParticlesColor);
  }

  return parentColor ? createParentColor(parentColor) : undefined;
}

/**
 * @param pluginManager - The plugin manager
 * @param container - The container to handle
 * @param parent - The parent
 * @param splitParticlesOptions - The splitParticlesOptions
 * @returns the added particle if any
 */
function addSplitParticle(
  pluginManager: PluginManager,
  container: Container,
  parent: DestroyParticle,
  splitParticlesOptions?: RecursivePartial<IParticlesOptions>,
): Particle | undefined {
  const destroyOptions = parent.options.destroy;

  if (!destroyOptions) {
    return;
  }

  const random = parent.container.engine.getRandomFn(),
    splitOptions = destroyOptions.split,
    splitParticleOptions = loadParticlesOptions(
      pluginManager,
      container,
      parent.options,
    ),
    splitFillColor = itemFromSingleOrMultiple(
      splitOptions.fillColor,
      undefined,
      undefined,
      random,
    ),
    splitStrokeColor = itemFromSingleOrMultiple(
      splitOptions.strokeColor,
      undefined,
      undefined,
      random,
    ),
    parentFillColor = parent.getFillColor(),
    parentStrokeColor = parent.getStrokeColor();

  splitParticleOptions.move.load({
    center: {
      x: parent.position.x,
      y: parent.position.y,
      mode: PixelMode.precise,
    },
  });

  const factor = identity / getRangeValue(splitOptions.factor.value, random),
    sizeOptions = splitParticleOptions["size"] as
      | {
          value: RangeValue;
        }
      | undefined;

  if (sizeOptions) {
    if (isNumber(sizeOptions.value)) {
      sizeOptions.value *= factor;
    } else {
      sizeOptions.value.min *= factor;
      sizeOptions.value.max *= factor;
    }
  }

  splitParticleOptions.load(splitParticlesOptions);

  const splitParticlePaintOptions = itemFromSingleOrMultiple(
      splitParticleOptions.paint,
      undefined,
      undefined,
      random,
    ),
    splitParticleFillOptions = splitParticlePaintOptions?.fill,
    splitParticleStrokeOptions = splitParticlePaintOptions?.stroke,
    fillColor = resolveSplitColor(
      splitOptions.fillColorOffset,
      splitFillColor,
      splitParticleFillOptions?.color,
      parentFillColor,
      random,
    ),
    strokeColor = resolveSplitColor(
      splitOptions.strokeColorOffset,
      splitStrokeColor,
      splitParticleStrokeOptions?.color,
      parentStrokeColor,
      random,
    );

  if (fillColor && splitParticleFillOptions) {
    splitParticleFillOptions.color = fillColor;
  }

  if (strokeColor && splitParticleStrokeOptions) {
    splitParticleStrokeOptions.color = strokeColor;
  }

  const offset = splitOptions.sizeOffset
      ? setRangeValue(-parent.size.value, parent.size.value)
      : defaultOffset,
    position = {
      x: parent.position.x + randomInRangeValue(offset, random),
      y: parent.position.y + randomInRangeValue(offset, random),
    };

  return container.particles.addParticle(
    position,
    splitParticleOptions,
    parent.group,
    (particle: DestroyParticle) => {
      if (particle.size.value < minDestroySize) {
        return false;
      }

      particle.velocity.length = randomInRangeValue(
        setRangeValue(parent.velocity.length, particle.velocity.length),
        random,
      );
      particle.splitCount =
        (parent.splitCount ?? defaultSplitCount) + increment;
      particle.unbreakable = true;
      particle.unbreakableUntil = performance.now() + unbreakableTime;

      return true;
    },
  );
}

/**
 *
 * @param pluginManager - The plugin manager
 * @param container - The container to handle
 * @param particle - The particle to process
 */
export function split(
  pluginManager: PluginManager,
  container: Container,
  particle: DestroyParticle,
): void {
  const destroyOptions = particle.options.destroy;

  if (!destroyOptions) {
    return;
  }

  const splitOptions = destroyOptions.split;

  if (splitOptions.count >= minSplitCount) {
    if (
      particle.splitCount === undefined ||
      particle.splitCount > splitOptions.count
    ) {
      return;
    }

    particle.splitCount++;
  }

  const random = container.engine.getRandomFn(),
    rate = getRangeValue(splitOptions.rate.value, random),
    particlesSplitOptions = itemFromSingleOrMultiple(
      splitOptions.particles,
      undefined,
      undefined,
      random,
    );

  for (let i = 0; i < rate; i++) {
    addSplitParticle(pluginManager, container, particle, particlesSplitOptions);
  }
}
