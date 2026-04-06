import {
  AnimatableColor,
  type Container,
  type IHsl,
  type IParticlesOptions,
  type IRangeHsl,
  type OptionsColor,
  type Particle,
  PixelMode,
  type PluginManager,
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
  minSaturation = 0,
  maxSaturation = 100,
  minLightness = 0,
  maxLightness = 100;

type SplitColorData = string | RecursivePartial<OptionsColor>;

/**
 * @param parentColor -
 * @returns the parent color as AnimatableColor
 */
function createParentColor(parentColor: IHsl): AnimatableColor {
  return AnimatableColor.create(undefined, {
    value: {
      hsl: parentColor,
    },
  });
}

/**
 * @param parentColor -
 * @param offset -
 * @returns the offset color as AnimatableColor
 */
function createOffsetColor(parentColor: IHsl, offset: Partial<IRangeHsl>): AnimatableColor {
  const offsetH = getRangeValue(offset.h ?? defaultOffset),
    offsetS = getRangeValue(offset.s ?? defaultOffset),
    offsetL = getRangeValue(offset.l ?? defaultOffset),
    h = (parentColor.h + offsetH) % hueRange,
    s = Math.max(minSaturation, Math.min(maxSaturation, parentColor.s + offsetS)),
    l = Math.max(minLightness, Math.min(maxLightness, parentColor.l + offsetL));

  return AnimatableColor.create(undefined, {
    value: {
      hsl: {
        h: h < minSaturation ? h + hueRange : h,
        s,
        l,
      },
    },
  });
}

/**
 * @param offset -
 * @param splitColor -
 * @param splitParticlesColor -
 * @param parentColor -
 * @returns the split color resolved using precedence rules
 */
function resolveSplitColor(
  offset: Partial<IRangeHsl> | undefined,
  splitColor: SplitColorData | undefined,
  splitParticlesColor: SplitColorData | undefined,
  parentColor: IHsl | undefined,
): AnimatableColor | undefined {
  if (offset && parentColor) {
    return createOffsetColor(parentColor, offset);
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
 * @param pluginManager -
 * @param container -
 * @param parent -
 * @param splitParticlesOptions -
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

  const splitOptions = destroyOptions.split,
    splitParticleOptions = loadParticlesOptions(pluginManager, container, parent.options),
    splitFillColor = itemFromSingleOrMultiple(splitOptions.fillColor),
    splitStrokeColor = itemFromSingleOrMultiple(splitOptions.strokeColor),
    parentFillColor = parent.getFillColor(),
    parentStrokeColor = parent.getStrokeColor();

  splitParticleOptions.move.load({
    center: {
      x: parent.position.x,
      y: parent.position.y,
      mode: PixelMode.precise,
    },
  });

  const factor = identity / getRangeValue(splitOptions.factor.value);

  if (isNumber(splitParticleOptions.size.value)) {
    splitParticleOptions.size.value *= factor;
  } else {
    splitParticleOptions.size.value.min *= factor;
    splitParticleOptions.size.value.max *= factor;
  }

  splitParticleOptions.load(splitParticlesOptions);

  const splitParticleFillOptions = itemFromSingleOrMultiple(splitParticleOptions.fill),
    splitParticleStrokeOptions = itemFromSingleOrMultiple(splitParticleOptions.stroke),
    fillColor = resolveSplitColor(
      splitOptions.fillColorOffset,
      splitFillColor,
      splitParticleFillOptions?.color,
      parentFillColor,
    ),
    strokeColor = resolveSplitColor(
      splitOptions.strokeColorOffset,
      splitStrokeColor,
      splitParticleStrokeOptions?.color,
      parentStrokeColor,
    );

  if (fillColor && splitParticleFillOptions) {
    splitParticleFillOptions.color = fillColor;
  }

  if (strokeColor && splitParticleStrokeOptions) {
    splitParticleStrokeOptions.color = strokeColor;
  }

  const offset = splitOptions.sizeOffset ? setRangeValue(-parent.size.value, parent.size.value) : defaultOffset,
    position = {
      x: parent.position.x + randomInRangeValue(offset),
      y: parent.position.y + randomInRangeValue(offset),
    };

  return container.particles.addParticle(position, splitParticleOptions, parent.group, (particle: DestroyParticle) => {
    if (particle.size.value < minDestroySize) {
      return false;
    }

    particle.velocity.length = randomInRangeValue(setRangeValue(parent.velocity.length, particle.velocity.length));
    particle.splitCount = (parent.splitCount ?? defaultSplitCount) + increment;
    particle.unbreakable = true;
    particle.unbreakableUntil = performance.now() + unbreakableTime;

    return true;
  });
}

/**
 *
 * @param pluginManager -
 * @param container -
 * @param particle -
 */
export function split(pluginManager: PluginManager, container: Container, particle: DestroyParticle): void {
  const destroyOptions = particle.options.destroy;

  if (!destroyOptions) {
    return;
  }

  const splitOptions = destroyOptions.split;

  if (splitOptions.count >= minSplitCount) {
    if (particle.splitCount === undefined || particle.splitCount > splitOptions.count) {
      return;
    }

    particle.splitCount++;
  }

  const rate = getRangeValue(splitOptions.rate.value),
    particlesSplitOptions = itemFromSingleOrMultiple(splitOptions.particles);

  for (let i = 0; i < rate; i++) {
    addSplitParticle(pluginManager, container, particle, particlesSplitOptions);
  }
}
