import {
  AnimatableColor,
  type Container,
  type IParticlesOptions,
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
  minSplitCount = 0;

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
    parentOptions = loadParticlesOptions(pluginManager, container, parent.options),
    splitParticlesResolvedOptions = loadParticlesOptions(pluginManager, container, splitParticlesOptions),
    splitParticlesFill = itemFromSingleOrMultiple(splitParticlesResolvedOptions.fill),
    splitParticlesStroke = itemFromSingleOrMultiple(splitParticlesResolvedOptions.stroke),
    splitFillColor = itemFromSingleOrMultiple(splitOptions.fillColor),
    splitStrokeColor = itemFromSingleOrMultiple(splitOptions.strokeColor),
    parentFillColor = parent.getFillColor(),
    parentStrokeColor = parent.getStrokeColor();

  let fillColor = splitParticlesFill?.color ? AnimatableColor.create(undefined, splitParticlesFill.color) : undefined;

  if (splitOptions.fillColorOffset && parentFillColor) {
    fillColor = AnimatableColor.create(undefined, {
      value: {
        hsl: {
          h: parentFillColor.h + getRangeValue(splitOptions.fillColorOffset.h ?? defaultOffset),
          s: parentFillColor.s + getRangeValue(splitOptions.fillColorOffset.s ?? defaultOffset),
          l: parentFillColor.l + getRangeValue(splitOptions.fillColorOffset.l ?? defaultOffset),
        },
      },
    });
  } else if (splitFillColor) {
    fillColor = AnimatableColor.create(undefined, splitFillColor);
  } else if (parentFillColor) {
    fillColor = AnimatableColor.create(undefined, {
      value: {
        hsl: parentFillColor,
      },
    });
  }

  let strokeColor = splitParticlesStroke?.color
    ? AnimatableColor.create(undefined, splitParticlesStroke.color)
    : undefined;

  if (splitOptions.strokeColorOffset && parentStrokeColor) {
    strokeColor = AnimatableColor.create(undefined, {
      value: {
        hsl: {
          h: parentStrokeColor.h + getRangeValue(splitOptions.strokeColorOffset.h ?? defaultOffset),
          s: parentStrokeColor.s + getRangeValue(splitOptions.strokeColorOffset.s ?? defaultOffset),
          l: parentStrokeColor.l + getRangeValue(splitOptions.strokeColorOffset.l ?? defaultOffset),
        },
      },
    });
  } else if (splitStrokeColor) {
    strokeColor = AnimatableColor.create(undefined, splitStrokeColor);
  } else if (parentStrokeColor) {
    strokeColor = AnimatableColor.create(undefined, {
      value: {
        hsl: parentStrokeColor,
      },
    });
  }

  parentOptions.move.load({
    center: {
      x: parent.position.x,
      y: parent.position.y,
      mode: PixelMode.precise,
    },
  });

  const factor = identity / getRangeValue(splitOptions.factor.value);

  if (isNumber(parentOptions.size.value)) {
    parentOptions.size.value *= factor;
  } else {
    parentOptions.size.value.min *= factor;
    parentOptions.size.value.max *= factor;
  }

  parentOptions.load(splitParticlesOptions);

  const parentFillOptions = itemFromSingleOrMultiple(parentOptions.fill),
    parentStrokeOptions = itemFromSingleOrMultiple(parentOptions.stroke);

  if (fillColor && parentFillOptions) {
    parentFillOptions.color = fillColor;
  }

  if (strokeColor && parentStrokeOptions) {
    parentStrokeOptions.color = strokeColor;
  }

  const offset = splitOptions.sizeOffset ? setRangeValue(-parent.size.value, parent.size.value) : defaultOffset,
    position = {
      x: parent.position.x + randomInRangeValue(offset),
      y: parent.position.y + randomInRangeValue(offset),
    };

  return container.particles.addParticle(position, parentOptions, parent.group, (particle: DestroyParticle) => {
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
